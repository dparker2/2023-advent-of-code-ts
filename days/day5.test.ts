import { expect, test } from "bun:test";
import { part1, part2 } from "./day5.ts";

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

test("part1", () => {
  expect(part1(input)).toBe(35);
});

test("part2", () => {
  expect(part2(input)).toBe(46);
});

test("part2 upper bound is min", () => {
  expect(
    part2(`seeds: 1 100

seed-to-soil map:
0 0 10

soil-to-fertilizer map:
0 0 10

fertilizer-to-water map:
0 0 10

water-to-light map:
0 0 10

light-to-temperature map:
0 0 10

temperature-to-humidity map:
0 0 10

humidity-to-location map:
200 0 100`)
  ).toBe(100);
});

test("part2 lower bound is min", () => {
  expect(
    part2(`seeds: 1 100

seed-to-location map:
10 10 10

soil-to-fertilizer map:
10 10 10

fertilizer-to-water map:
10 10 10

water-to-light map:
10 10 10

light-to-temperature map:
10 10 10

temperature-to-humidity map:
10 10 10

humidity-to-location map:
200 5 95`)
  ).toBe(1);
});
