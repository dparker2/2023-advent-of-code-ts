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

function reflectionLength(list: string[]) {
  let i;
  let j;
  for (i = 0, j = 1; j < list.length; i++, j++) {
    if (list[i] === list[j]) break;
  }
  if (list[j] === undefined) return 0; // Could not mirror

  for (let k = i, l = j; k >= 0 && l < list.length; k--, l++) {
    if (list[k] !== list[l]) return 0; // Not a perfect mirror
  }
  return i + 1;
}

export function part1(input: string) {
  const grids = parseInput(input);
  return grids.reduce(
    (sum, { rows, cols }) =>
      sum + reflectionLength(cols) + 100 * reflectionLength(rows),
    0
  );
}

export function part2(input: string) {
  return 0;
}
