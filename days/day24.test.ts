import { expect, test } from "bun:test";
import { part1, part2 } from "./day24.ts";

const example = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

test("part1", () => {
  expect(part1(example, 7, 27)).toBe(2);
});

// test("part2", () => {
//   expect(part2(example)).toBe(154);
// });
