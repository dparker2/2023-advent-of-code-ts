export function part1(
  input: string,
  min: number = 200000000000000,
  max: number = 400000000000000
) {
  const equations = input.split("\n").map((str) => {
    const [pos, vel] = str.split(" @ ");
    const [px, py] = pos.split(", ").map(Number);
    const [vx, vy] = vel.split(", ").map(Number);
    const m = vy / vx; // slope
    // y - y1 = m(x - x1) -> y = mx - mx1 + y1 -> b = -mx1 + y1
    return { m, b: -m * px + py, px, py, vx, vy };
  });
  const combinations = equations.flatMap((eq0, i) =>
    equations.slice(i + 1).map((eq1) => [eq0, eq1])
  );
  const crossing = combinations.filter(([eq0, eq1]) => {
    // m0*x + b0 = m1*x + b1 -> x = (b0 - b1) / (m1 - m0)
    const x = (eq0.b - eq1.b) / (eq1.m - eq0.m);
    if (x < min || x > max) return false;
    // y = mx + b
    const y = eq0.m * x + eq0.b;
    if (y < min || y > max) return false;
    // x(t) = x0 + dx*t -> t = (x - x0) / dx
    const t0 = (x - eq0.px) / eq0.vx;
    if (t0 < 0) return false;
    const t1 = (x - eq1.px) / eq1.vx;
    return t1 >= 0;
  });

  return crossing.length;
}

export function part2(input: string) {
  return 0;
}
