import { expect, test } from "bun:test";
import { part1, part2 } from "./day13.ts";

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const input2 = `.#..
##..
##..
..#.
..#.
##..
##..
.#..`;

test("part1", () => {
  expect(part1(input)).toBe(405);
});

test("part1 additional", () => {
  expect(part1(input2)).toBe(400);
});

test("part2", () => {
  expect(part2(input)).toBe(400);
});
