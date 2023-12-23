export function shortestPath(
  start: string,
  goal: (n: string) => boolean,
  neighbors: (n: string) => string[],
  h: (n: string) => number,
  d: (n1: string, n2: string) => number
) {
  const open = new Set([start]); // TODO replace with priority queue
  const cameFrom: Record<string, string> = {};
  const g: Record<string, number> = {};
  const f: Record<string, number> = {};
  const popMin = () => {
    const nodes = [...open];
    const min = nodes.reduce(
      (minK, k) => (f[k] < f[minK] ? k : minK),
      nodes[0]
    );
    open.delete(min);
    return min;
  };

  g[start] = 0;
  f[start] = h(start);

  while (open.size > 0) {
    const curr = popMin();

    if (goal(curr)) {
      const path = [curr];
      while (cameFrom[path[0]]) path.unshift(cameFrom[path[0]]);
      path.forEach((n) => console.log(n));
      return path;
    }

    neighbors(curr).forEach((neighbor) => {
      const newG = g[curr] + d(curr, neighbor);
      if (g[neighbor] === undefined || newG < g[neighbor]) {
        cameFrom[neighbor] = curr;
        g[neighbor] = newG;
        f[neighbor] = newG + h(neighbor);
        if (!open.has(neighbor)) open.add(neighbor);
      }
    });
  }

  return [];
}
