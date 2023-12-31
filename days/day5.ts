interface Mapping {
  destStart: number;
  destEnd: number;
  srcStart: number;
  srcEnd: number;
}

function parseInput(input: string): {
  seeds: number[];
  mapMatrix: Mapping[][];
} {
  const lines = input.split("\n\n");
  const seeds = lines.shift()!.split(":")[1].trim().split(" ").map(Number);
  const mapMatrix = lines.map((line) =>
    line
      .split("\n")
      .slice(1)
      .map((s) => s.split(" ").map(Number))
      .map(([destStart, srcStart, length]) => ({
        destStart,
        destEnd: destStart + length - 1,
        srcStart,
        srcEnd: srcStart + length - 1,
      }))
  );
  return { seeds, mapMatrix };
}

function lookupLocation(mapMatrix: Mapping[][], val: number) {
  return mapMatrix.reduce((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      if (curr >= m.srcStart && curr <= m.srcEnd) {
        return m.destStart + (curr - m.srcStart);
      }
    }
    return curr; // No mapping, same number
  }, val);
}

function lookupSeed(mapMatrix: Mapping[][], val: number) {
  // Backwards lookup
  return mapMatrix.reduceRight((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      if (curr >= m.destStart && curr <= m.destEnd) {
        return m.srcStart + (curr - m.destStart);
      }
    }
    return curr; // No mapping, same number
  }, val);
}

// For viz...
export function data(input: string) {
  const { mapMatrix } = parseInput(input);
  for (let i = 0; i < mapMatrix.length; i++) {
    for (let j = 0; j < 100; j++) {
      console.log(lookupLocation(mapMatrix.slice(0, i + 1), j));
    }
  }
}

export function part1(input: string) {
  const { seeds, mapMatrix } = parseInput(input);
  return Math.min(...seeds.map((s) => lookupLocation(mapMatrix, s)));
}

export function part2(input: string) {
  const { seeds, mapMatrix } = parseInput(input);
  const validSeed = (seed: number) => {
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
    }
    return false;
  };
  // Lowest location will correspond to some endpoint boundary
  const candidateSeeds = seeds
    .filter((_, i) => i % 2 === 0) // Add seed endpoints
    .concat(
      mapMatrix.flatMap((mappings, i) =>
        mappings.flatMap((m) => [
          // For each [a, b] range in each mapping, map [a, b+1] to their seed values
          lookupSeed(mapMatrix.slice(0, i + 1), m.destStart),
          lookupSeed(mapMatrix.slice(0, i + 1), m.destEnd) + 1,
        ])
      )
    )
    .filter(validSeed);

  return Math.min(...candidateSeeds.map((s) => lookupLocation(mapMatrix, s)));
}
