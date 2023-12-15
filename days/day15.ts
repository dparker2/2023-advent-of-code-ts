function HASH(str: string) {
  return str
    .split("")
    .reduce((val, ch) => ((val + ch.charCodeAt(0)) * 17) % 256, 0);
}

export function part1(input: string) {
  const sequence = input.split(",");
  return sequence.map(HASH).reduce((sum, v) => sum + v, 0);
}

export function part2(input: string) {
  const boxes = [...Array(256)].map(() => new Map<string, number>());

  input.split(",").forEach((str) => {
    if (str.at(-1) === "-") {
      const label = str.slice(0, -1);
      boxes[HASH(label)].delete(label);
    } else {
      const [label, n] = str.split("=");
      boxes[HASH(label)].set(label, Number(n));
    }
  });

  return boxes
    .flatMap((box, bi) =>
      [...box.values()].map((fl, fli) => (bi + 1) * (fli + 1) * fl)
    )
    .reduce((sum, v) => sum + v, 0);
}
