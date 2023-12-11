import { expect, test } from "bun:test";
import { part1, part2 } from "./day10.ts";

const simple = `.....
.S-7.
.|.|.
.L-J.
.....`;

const extras = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const complex = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

test("part1", () => {
  expect(part1(simple)).toBe(4);
  expect(part1(extras)).toBe(4);
  expect(part1(complex)).toBe(8);
});

const p2input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const p2complex = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

test("part2", () => {
  expect(part2(p2input)).toBe(4);
  expect(part2(p2complex)).toBe(10);
});
