export function part1(input: string) {
  const extractNumber = (line: string) => {
    const nums = line.replaceAll(/[a-z]/g, "");
    return parseInt(`${nums[0]}${nums[nums.length - 1]}`);
  };
  return input.split("\n").reduce((sum, line) => sum + extractNumber(line), 0);
}

export function part2(input: string) {
  const extactNumber = (line: string, i: number) => {
    if (line[i] === "1" || line.startsWith("one", i)) return 1;
    if (line[i] === "2" || line.startsWith("two", i)) return 2;
    if (line[i] === "3" || line.startsWith("three", i)) return 3;
    if (line[i] === "4" || line.startsWith("four", i)) return 4;
    if (line[i] === "5" || line.startsWith("five", i)) return 5;
    if (line[i] === "6" || line.startsWith("six", i)) return 6;
    if (line[i] === "7" || line.startsWith("seven", i)) return 7;
    if (line[i] === "8" || line.startsWith("eight", i)) return 8;
    if (line[i] === "9" || line.startsWith("nine", i)) return 9;
  };
  const firstNumber = (line: string) => {
    for (let i = 0; i < line.length; i++) {
      const n = extactNumber(line, i);
      if (n) return n;
    }
    return 0;
  };
  const lastNumber = (line: string) => {
    for (let i = line.length - 1; i > -1; i--) {
      const n = extactNumber(line, i);
      if (n) return n;
    }
    return 0;
  };

  return input
    .split("\n")
    .reduce((sum, line) => sum + firstNumber(line) * 10 + lastNumber(line), 0);
}
