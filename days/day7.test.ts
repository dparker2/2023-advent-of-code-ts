import { expect, test } from "bun:test";
import { part1, part2 } from "./day7.ts";

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test("part1", () => {
  expect(part1(input)).toBe(6440);
});

test("part2", () => {
  expect(part2(input)).toBe(5905);
});
