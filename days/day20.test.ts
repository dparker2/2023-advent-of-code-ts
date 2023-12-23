import { expect, test } from "bun:test";
import { part1, part2 } from "./day20.ts";

const example1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

const example2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

test("part1 example 1", () => {
  expect(part1(example1)).toBe(32000000);
});

test("part1 example 2", () => {
  expect(part1(example2)).toBe(11687500);
});

// test("part2", () => {
//   expect(part2(example)).toBe(952408144115);
// });
