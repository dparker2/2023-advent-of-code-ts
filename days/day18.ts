import * as polygon from "../util/polygon";

function toCoords(coords: number[][], line: string) {
  const [dir, nStr] = line.split(" ");
  const n = Number(nStr);
  const prev = coords.at(-1)!;
  if (dir === "U") coords.push([prev[0], prev[1] + n]);
  else if (dir === "D") coords.push([prev[0], prev[1] - n]);
  else if (dir === "R") coords.push([prev[0] + n, prev[1]]);
  else coords.push([prev[0] - n, prev[1]]);
  return coords;
}

function digMeters(coords: number[][]) {
  const area = polygon.area(coords);
  const perimeter = polygon.perimeter(coords);
  return perimeter + polygon.interior(area, perimeter);
}

export function part1(input: string) {
  const coords = input.split("\n").reduce(toCoords, [[0, 0]]);
  return digMeters(coords);
}

export function part2(input: string) {
  const dir = {
    "0": "R",
    "1": "D",
    "2": "L",
    "3": "U",
  };
  const coords = input
    .split("\n")
    .map((line) => {
      const instr = line.split(" ")[2];
      return `${dir[instr.at(-2) as keyof typeof dir]} ${parseInt(
        instr.slice(2, 7),
        16
      )}`;
    })
    .reduce(toCoords, [[0, 0]]);
  return digMeters(coords);
}
