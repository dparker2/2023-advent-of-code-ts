import { expect, test } from "bun:test";
import { part1, part2 } from "./day17.ts";

const simple = `241343
321545`;

const example = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

test("part1 simple", () => {
  expect(part1(simple)).toBe(20);
});

test("part1 example", () => {
  expect(part1(example)).toBe(102);
});

// test("part2", () => {
//   expect(part2(example)).toBe(145);
// });
