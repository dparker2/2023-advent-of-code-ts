export function part1(input: string) {
  const games = input.split("\n");
  return games.reduce((idSum, gameLine, index) => {
    if (
      gameLine.match(/(1[3-9]|[2-9][0-9]) red/) ||
      gameLine.match(/(1[4-9]|[2-9][0-9]) green/) ||
      gameLine.match(/(1[5-9]|[2-9][0-9]) blue/)
    ) {
      return idSum;
    }
    return idSum + index + 1;
  }, 0);
}

export function part2(input: string) {
  const games = input.split("\n");
  const getMaxNum = (gameLine: string, color: string) =>
    Math.max(
      ...[...gameLine.matchAll(RegExp(`(\\d+) ${color}`, "g"))].map((match) =>
        parseInt(match[1])
      )
    );

  return games.reduce(
    (powerSum, gameLine) =>
      powerSum +
      getMaxNum(gameLine, "red") *
        getMaxNum(gameLine, "green") *
        getMaxNum(gameLine, "blue"),
    0
  );
}
