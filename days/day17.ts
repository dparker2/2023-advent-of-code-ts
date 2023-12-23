import { shortestPath } from "../util/graph";

type Point = { i: number; j: number };
type Node = [Point, Point, Point, Point];

function h({ i: destI, j: destJ }: Point) {
  return (n: string) => {
    const point: Point = JSON.parse(n)[0];
    return Math.abs(point.i - destI) + Math.abs(point.j - destJ);
  };
}

function d(grid: number[][]) {
  return (n: string) => {
    const point: Point = JSON.parse(n)[0];
    return grid[point.i][point.j];
  };
}

export function part1(input: string) {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  const goal = { i: grid.length - 1, j: grid.at(-1)!.length - 1 };
  const neighbors = (n: string) => {
    const [p1, p2, p3, p4]: Node = JSON.parse(n);
    const ns: Node[] = [];
    if (p1.i !== p2?.i || p1.i !== p3?.i || p1.i !== p4?.i) {
      if (p2?.j !== p1.j - 1) ns.push([{ i: p1.i, j: p1.j - 1 }, p1, p2, p3]);
      if (p2?.j !== p1.j + 1) ns.push([{ i: p1.i, j: p1.j + 1 }, p1, p2, p3]);
    }
    if (p1.j !== p2?.j || p1.j !== p3?.j || p1.j !== p4?.j) {
      if (p2?.i !== p1.i - 1) ns.push([{ i: p1.i - 1, j: p1.j }, p1, p2, p3]);
      if (p2?.i !== p1.i + 1) ns.push([{ i: p1.i + 1, j: p1.j }, p1, p2, p3]);
    }
    return ns.filter(([p]) => grid[p.i]?.[p.j]).map((n) => JSON.stringify(n));
  };

  const heatloss = d(grid);
  const path = shortestPath(
    JSON.stringify([{ i: 0, j: 0 }]),
    (n) => {
      const point = JSON.parse(n)[0];
      return point.i === goal.i && point.j === goal.j;
    },
    neighbors,
    h(goal),
    heatloss
  );

  return path.slice(1).reduce((sum, node) => sum + heatloss(node), 0);
}

export function part2(input: string) {
  return 0;
}
