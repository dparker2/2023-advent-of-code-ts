import { expect, test } from "bun:test";
import { part1, part2 } from "./day22.ts";

const example = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

test("part1", () => {
  expect(part1(example)).toBe(5);
});

test("part2", () => {
  expect(part2(example)).toBe(7);
});
