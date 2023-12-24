export function part1(input: string, steps: number = 64) {
  const lines = input.split("\n");
  const N = lines.length;
  const M = lines[0].length;
  let positions = new Set<string>();
  for (let i = 0; i < N; i++)
    for (let j = 0; j < M; j++)
      if (lines[i][j] === "S") positions.add(JSON.stringify([i, j]));

  const step = (positions: Set<string>) => {
    const newPositions = new Set<string>();
    [...positions].forEach((position) => {
      const [i, j] = JSON.parse(position);
      [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ]
        .filter(
          ([k, l]) => k >= 0 && l >= 0 && k < N && l < M && lines[k][l] !== "#"
        )
        .forEach((p) => newPositions.add(JSON.stringify(p)));
    });
    return newPositions;
  };

  for (let i = 0; i < steps; i++) positions = step(positions);
  return positions.size;
}

export function part2(input: string) {
  return 0;
}
