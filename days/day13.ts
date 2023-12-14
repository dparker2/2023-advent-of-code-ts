function parseInput(input: string) {
  const sections = input.split("\n\n");
  const grids = sections.map((section) => {
    const rows = section.split("\n");
    const cols = [];
    for (let i = 0; i < rows[0].length; i++)
      cols.push(rows.map((r) => r[i]).join(""));
    return { rows, cols };
  });
  return grids;
}

function reflectionLength(list: string[], part2: boolean) {
  findMirror: for (let i = 1; i < list.length; i++) {
    const s1 = list.slice(0, i).join("");
    const s2 = list
      .slice(i, list.length)
      .map((x) => x.split("").toReversed().join(""))
      .join("");

    let smudgeFixed = !part2;
    for (let j = 0; j < Math.min(s1.length, s2.length); j++) {
      if (s1.at(-j - 1) !== s2[j]) {
        if (!smudgeFixed) {
          smudgeFixed = true; // For part 2, allow one unequal
          continue;
        }
        continue findMirror;
      }
    }
    if (smudgeFixed) return i;
  }
  return 0;
}

export function part1(input: string) {
  const grids = parseInput(input);
  return grids.reduce(
    (sum, { rows, cols }) =>
      sum + reflectionLength(cols, false) + 100 * reflectionLength(rows, false),
    0
  );
}

export function part2(input: string) {
  const grids = parseInput(input);
  return grids.reduce(
    (sum, { rows, cols }) =>
      sum + reflectionLength(cols, true) + 100 * reflectionLength(rows, true),
    0
  );
}
