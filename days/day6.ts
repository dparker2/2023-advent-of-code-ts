/**
 * f(x) = ((TIME - x) * x) - DISTANCE, where x is the time spent holding the button.
 * Rewritten: f(x) = -x^2 + TIME * x - DISTANCE
 * Number of integers between where f(x) equals 0 is number of winning times.
 * Quadratic forumula ->
 * First root:  (TIME + sqrt(TIME^2 - 4*DISTANCE)) / 2
 * Second root: (TIME - sqrt(TIME^2 - 4*DISTANCE)) / 2
 */
function intsBetweenRoots(time: number, distance: number) {
  const sqrt = Math.sqrt(time ** 2 - 4 * distance);
  return Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
}

export function part1(input: string) {
  const [time, distance] = input
    .split("\n")
    .map((l) => l.split(/\s+/).slice(1).map(Number));
  return time.reduce(
    (acc, time, i) => acc * intsBetweenRoots(time, distance[i]),
    1
  );
}

export function part2(input: string) {
  const [time, distance] = input
    .split("\n")
    .map((l) => Number(l.replaceAll(" ", "").split(":")[1]));
  return intsBetweenRoots(time, distance);
}
