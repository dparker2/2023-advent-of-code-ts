export function area(vs: number[][]) {
  let sum = 0;
  for (let i = 1; i < vs.length; i++) {
    sum += vs[i - 1][0] * vs[i][1] - vs[i - 1][1] * vs[i][0];
  }
  return Math.abs(sum / 2);
}

export function perimeter(vs: number[][]) {
  // ASSUMES STRAIGHT LINES
  let sum = 0;
  for (let i = 1; i < vs.length; i++) {
    sum +=
      Math.abs(vs[i - 1][0] - vs[i][0]) + Math.abs(vs[i - 1][1] - vs[i][1]);
  }
  return sum;
}

export function interior(area: number, perimeter: number) {
  return area + 1 - perimeter / 2;
}
