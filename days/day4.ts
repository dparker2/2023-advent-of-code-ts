function getWins(card: string) {
  const extractNums = (str: string) =>
    [...str.matchAll(/\d+/g)].map((r) => r[0]);
  const [left, right] = card.split("|");
  const winning = extractNums(left.slice(left.indexOf(":")));
  return extractNums(right).filter((n) => winning.includes(n));
}

export function part1(input: string) {
  const allWins = input.split("\n").map(getWins);
  return allWins.reduce((sumTotal, wins) => {
    if (wins.length) return sumTotal + 2 ** (wins.length - 1);
    else return sumTotal;
  }, 0);
}

export function part2(input: string) {
  const lines = input.split("\n");
  const copies = Array(lines.length).fill(1);
  return lines.map(getWins).reduce((total, wins, i) => {
    for (let j = 0; j < wins.length; j++) copies[j + i + 1] += copies[i];
    return total + copies[i];
  }, 0);
}
