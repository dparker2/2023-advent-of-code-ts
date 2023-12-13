import { expect, test } from "bun:test";
import { part1, part2 } from "./day12.ts";

const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

test("part1", () => {
  expect(part1(input)).toBe(21);
});

test("part2", () => {
  expect(part2(input)).toBe(525152);
});
