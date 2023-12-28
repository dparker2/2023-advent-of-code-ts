import { sortBy } from "../util/array";

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

function reconcile(bricks: Brick[]) {
  const stable = new Set<Brick>(bricks.filter(([{ z }]) => z === 1));
  const falling = new Set<Brick>(bricks.filter(([{ z }]) => z > 1));
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
  return [stable, falling];
}

function simulate(bricks: Brick[]): Brick[] {
  let [stable, falling] = reconcile(bricks);
  if (falling.size === 0) return bricks; // Already stable
  while (falling.size > 0) {
    for (let i = 0; i < bricks.length; i++) {
      if (falling.has(bricks[i])) {
        bricks[i][0].z -= 1;
        bricks[i][1].z -= 1;
      }
    }
    [stable, falling] = reconcile(bricks);
  }
  return bricks;
}

export function part1(input: string) {
  const bricks = simulate(parseInput(input));

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
  let bricks = simulate(parseInput(input));

  return bricks.reduce((sum, _b, i) => {
    const [_stable, falling] = reconcile(bricks.toSpliced(i, 1));
    return sum + falling.size;
  }, 0);
}
