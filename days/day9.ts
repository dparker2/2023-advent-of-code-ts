/**
 * DP:
 * T(0,j) = sequence[j]
 * T(i,j) = T(i-1,j) - T(i-1,j-1)
 */
function extrapolate(sequence: number[]) {
  const table: number[][] = [sequence];
  for (let i = 1; table[i - 1].some((v) => v !== 0); i++) {
    table.push(Array(sequence.length));
    for (let j = i; j < sequence.length; j++) {
      table[i][j] = table[i - 1][j] - table[i - 1][j - 1];
    }
  }

  return table.reduce((acc, row) => acc + row.at(-1)!, 0);
}

function parseInput(input: string) {
  return input.split("\n").map((line) => line.split(" ").map(Number));
}

export function part1(input: string) {
  const sequences = parseInput(input);
  return sequences.map(extrapolate).reduce((acc, x) => acc + x, 0);
}

export function part2(input: string) {
  const sequences = parseInput(input);
  return sequences
    .map((arr) => extrapolate(arr.toReversed()))
    .reduce((acc, x) => acc + x, 0);
}
