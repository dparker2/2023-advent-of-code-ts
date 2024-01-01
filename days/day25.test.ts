import { expect, test } from "bun:test";
import { part1, part2 } from "./day25.ts";

const example = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

test("part1", () => {
  expect(part1(example)).toBe(54);
});

// test("part2", () => {
//   expect(part2(example)).toBe(154);
// });
