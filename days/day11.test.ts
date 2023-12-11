import { expect, test } from "bun:test";
import { part1, part2 } from "./day11.ts";

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

test("part1", () => {
  expect(part1(input)).toBe(374);
});

test("part2 - 10 times larger", () => {
  expect(part2(input, 9)).toBe(1030);
});

test("part2 - 100 times larger", () => {
  expect(part2(input, 99)).toBe(8410);
});
