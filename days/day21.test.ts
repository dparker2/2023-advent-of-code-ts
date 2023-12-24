import { expect, test } from "bun:test";
import { part1, part2 } from "./day21.ts";

const example = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

test("part1", () => {
  expect(part1(example, 6)).toBe(16);
});
