interface SchematicNumber {
  val: number;
  line: number;
  start: number;
  end: number;
}

function appendNumbers(
  numbers: Array<SchematicNumber>,
  line: string,
  lineIndex: number
) {
  const digitRegex = /\d+/g;
  let match;
  while ((match = digitRegex.exec(line))) {
    numbers.push({
      val: Number(match[0]),
      line: lineIndex,
      start: match.index,
      end: digitRegex.lastIndex,
    });
  }
  return numbers;
}

export function part1(input: string) {
  const lines = input.split("\n");
  const numbers = lines.reduce<Array<SchematicNumber>>(appendNumbers, []);
  const adjSymbol = (number: SchematicNumber, lineOffset: number) =>
    !!lines[number.line + lineOffset]
      ?.slice(Math.max(0, number.start - 1), number.end + 1)
      .match(/[^0-9.]/);
  return numbers.reduce(
    (partSum, n) =>
      adjSymbol(n, -1) || adjSymbol(n, 0) || adjSymbol(n, 1)
        ? partSum + n.val
        : partSum,
    0
  );
}

export function part2(input: string) {
  const lines = input.split("\n");
  const numbers = lines.reduce<Array<SchematicNumber>>(appendNumbers, []);
  const adjNumbers = (lineIdx: number, charIdx: number) =>
    numbers.filter(
      (number) =>
        Math.abs(number.line - lineIdx) < 2 &&
        charIdx >= number.start - 1 &&
        charIdx <= number.end
    );
  return lines.reduce((gearRatioSum, line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "*") {
        const partNumbers = adjNumbers(lineIndex, i);
        if (partNumbers.length === 2)
          gearRatioSum += partNumbers[0].val * partNumbers[1].val;
      }
    }
    return gearRatioSum;
  }, 0);
}
