type Part = Record<string, number>;

function acceptedPart(part: Part, workflows: Record<string, string[][]>) {
  let name = "in";
  let i = 0;

  while (true) {
    if (name === "A") return true;
    if (name === "R") return false;

    const [cond, ifTrue] = workflows[name][i];
    if (!ifTrue) {
      name = cond;
      i = 0;
      continue;
    }
    if (eval(cond.replace(/[xmas]/, (k) => part[k].toString()))) {
      name = ifTrue;
      i = 0;
    } else {
      i++;
    }
  }
}

export function part1(input: string) {
  const [upperInput, lowerInput] = input.split("\n\n");
  const workflows = upperInput
    .split("\n")
    .reduce<Record<string, string[][]>>((obj, line) => {
      const [name, ruleStr] = line.split(/[{}]/);
      obj[name] = ruleStr.split(",").map((r) => r.split(":"));
      return obj;
    }, {});
  const parts: Part[] = lowerInput
    .split("\n")
    .map((line) => JSON.parse(line.replaceAll(/[a-z]=/g, (s) => `"${s[0]}":`)));

  return parts
    .filter((p) => acceptedPart(p, workflows))
    .reduce((sum, part) => sum + part.x + part.m + part.a + part.s, 0);
}

export function part2(input: string) {
  return 0;
}
