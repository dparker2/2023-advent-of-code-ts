import { expect, test } from "bun:test";
import { part1, part2 } from "./day16.ts";

const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

test("part1", () => {
  expect(part1(input)).toBe(46);
});

test("part2", () => {
  expect(part2(input)).toBe(51);
});
