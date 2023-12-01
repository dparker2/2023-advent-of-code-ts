import { expect, test } from "bun:test";
import { part1, part2 } from "./day1.ts";

const p1input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const p2input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

test("part1", () => {
  expect(part1(p1input)).toBe(142);
});

test("part2", () => {
  expect(part2(p2input)).toBe(281);
});
