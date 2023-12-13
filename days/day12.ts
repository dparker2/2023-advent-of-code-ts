type SpringRecord = {
  springs: string;
  validRx: RegExp;
};

function countSolutions({ springs, validRx }: SpringRecord): number {
  if (!springs.match(validRx)) return 0;
  const i = springs.indexOf("?");
  if (i === -1) return 1; // Found one: valid and no more "?"
  const variant1 = springs.slice(0, i) + "." + springs.slice(i + 1);
  const variant2 = springs.slice(0, i) + "#" + springs.slice(i + 1);
  const val =
    countSolutions({ springs: variant1, validRx }) +
    countSolutions({ springs: variant2, validRx });
  return val;
}

function toSpringRecord(line: string) {
  const [springs, counts] = line.split(" ");
  // e.g. 1,1,3 -> /^[.?]*[#?]{1}[.?]+[#?]{1}[.?]+[#?]{3}[.?]*$/
  const rxStr = `^[.?]*${counts
    .split(",")
    .map((n) => `[#?]{${n}}`)
    .join("[.?]+")}[.?]*$`;
  return {
    springs,
    validRx: RegExp(rxStr),
  };
}

export function part1(input: string) {
  return input
    .split("\n")
    .map(toSpringRecord)
    .reduce((a, r) => a + countSolutions(r), 0);
}

export function part2(input: String) {
  const unfold = (line: string) => {
    const [s, c] = line.split(" ");
    return `${[s, s, s, s, s].join("?")} ${[c, c, c, c, c].join()}`;
  };
  return input
    .split("\n")
    .map(unfold)
    .map(toSpringRecord)
    .reduce((a, r, i) => (console.log("Spring", i), a + countSolutions(r)), 0);
}
