import { sortBy, bisectLeft } from "../util/array";

type Brick = { x: number; y: number; z: number }[];

function parseInput(input: string): Brick[] {
  return input.split("\n").map((line) => {
    const [left, right] = line.split("~");
    const side1 = left.split(",").map(Number);
    const side2 = right.split(",").map(Number);
    return [
      { x: side1[0], y: side1[1], z: side1[2] },
      { x: side2[0], y: side2[1], z: side2[2] },
    ];
  });
}

function supporting(b1: Brick, b2: Brick) {
  // Is b1 supporting b2?
  if (b2[0].z - b1[1].z !== 1) return false; // Must be 1 above
  return (
    ((b1[0].x >= b2[0].x && b1[0].x <= b2[1].x) ||
      (b2[0].x >= b1[0].x && b2[0].x <= b1[1].x)) &&
    ((b1[0].y >= b2[0].y && b1[0].y <= b2[1].y) ||
      (b2[0].y >= b1[0].y && b2[0].y <= b1[1].y))
  );
}

function reconcile(bricks: Brick[], stable: Set<Brick>, falling: Set<Brick>) {
  sortBy(bricks, ([{ z }]) => z);
  for (let i = 0; i < bricks.length; i++) {
    if (falling.has(bricks[i])) {
      if (bricks[i][0].z === 1) {
        falling.delete(bricks[i]);
        stable.add(bricks[i]);
      }
      for (let sB of stable) {
        if (supporting(sB, bricks[i])) {
          // console.log(`Freezing brick ${i}`);
          falling.delete(bricks[i]);
          stable.add(bricks[i]);
        }
      }
    }
  }
}

function simulate(bricks: Brick[]): [Brick[], boolean] {
  const stable = new Set<Brick>(bricks.filter(([{ z }]) => z === 1));
  const falling = new Set<Brick>(bricks.filter(([{ z }]) => z > 1));
  reconcile(bricks, stable, falling);
  if (falling.size === 0) return [bricks, false]; // Already stable
  while (falling.size > 0) {
    for (let i = 0; i < bricks.length; i++) {
      if (falling.has(bricks[i])) {
        bricks[i][0].z -= 1;
        bricks[i][1].z -= 1;
      }
    }
    reconcile(bricks, stable, falling);
  }
  return [bricks, true];
}

export function part1(input: string) {
  const [bricks, _] = simulate(parseInput(input));

  const singleSupports = new Set<Brick>();
  for (let i = 0; i < bricks.length; i++) {
    const supportedBy = bricks.filter((b) => supporting(b, bricks[i]));
    if (supportedBy.length === 1) {
      singleSupports.add(supportedBy[0]);
    }
  }

  return bricks.length - singleSupports.size;
}

export function part2(input: string) {
  let [bricks, _] = simulate(parseInput(input));
  let fell = 0;
  let loop = true;

  do {
    const stackEdges: number[][] = [];
    for (let i = 0; i < bricks.length; i++) {
      stackEdges[i] = [];
      for (let j = 0; j < bricks.length; j++) {
        if (supporting(bricks[i], bricks[j])) stackEdges[i].push(j);
      }
    }

    const above = stackEdges.map(() => new Set<number>());
    const dfs = (p: number[], post: (a: number[]) => void) => {
      stackEdges[p[0]].forEach((j) => dfs([j, ...p], post));
      post(p);
    };
    dfs(
      bricks.filter(([{ z }]) => z === 1).map((_, i) => i),
      (parents) => {
        for (let i = 0; i < parents.length; i++)
          parents.slice(0, i).forEach((p) => above[parents[i]].add(p));
      }
    );
    const wouldFall = above.filter((_, i) => {
      const otherEdges = stackEdges.toSpliced(i, 1).flatMap((l) => l);
      // console.log(stackEdges[i], otherEdges);
      return !stackEdges[i].every((p) => otherEdges.includes(p));
    });
    // console.log(wouldFall);
    if (!wouldFall.length) break;
    const maxSet = wouldFall.reduce(
      (m, s) => (s.size > m.size ? s : m),
      wouldFall[0]
    );
    if (!maxSet.size) break;
    const maxSeti = above.indexOf(maxSet);
    bricks.splice(maxSeti, 1);
    fell += maxSet.size;
    console.log(bricks.length, fell);
    [bricks, loop] = simulate(bricks);
  } while (true);
  return fell;
}
