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

const i2 = `...
..#
...

...
...
.#.

...
#..
...

.#.
...
...

...
.#.
...`;

test("part1", () => {
  expect(part1(input)).toBe(405);
  expect(part1(i2)).toBe(303);
});

// test("part2", () => {
//   expect(part2(input)).toBe(525152);
// });
