import { randomInt } from "crypto";

type AdjList = Record<string, string[]>;

function bfs(
  graph: AdjList,
  start: string,
  goal: string | null,
  parent: Record<string, string>,
  visited: Set<string>
) {
  const q: string[] = [start];
  visited.add(start);

  let curr;
  while ((curr = q.shift())) {
    if (curr === goal) return true;
    for (let n of graph[curr]) {
      if (visited.has(n)) continue;
      visited.add(n);
      parent[n] = curr;
      q.push(n);
    }
  }

  return false;
}

function minCut(graph: AdjList, source: string, sink: string) {
  // Simplified Ford-Fulkerson, just remove edges in found paths
  const residual: AdjList = {};
  for (let n in graph) {
    residual[n] = [...graph[n]];
  }

  let cut = 0;
  let path: Record<string, string> = {};
  while (bfs(residual, source, sink, path, new Set<string>())) {
    cut++;
    for (let curr = sink; path[curr] !== undefined; curr = path[curr]) {
      const n = path[curr];
      residual[curr] = residual[curr].filter((v) => v !== n);
      residual[n] = residual[n].filter((v) => v !== curr);
    }
  }

  return { cut, residual };
}

export function part1(input: string) {
  const graph: AdjList = {};
  input.split("\n").forEach((line) => {
    const [node, right] = line.split(": ");
    const neighbors = right.split(" ");
    if (graph[node] === undefined) graph[node] = [];
    neighbors.forEach((neighbor) => {
      if (graph[neighbor] === undefined) graph[neighbor] = [];
      graph[node].push(neighbor);
      graph[neighbor].push(node);
    });
  });
  const nodes = Object.keys(graph);
  let component;

  while (true) {
    const source = nodes[randomInt(0, nodes.length)];
    const sink = nodes[randomInt(0, nodes.length)];
    if (source === sink) continue; // Invalid sink
    const { cut, residual } = minCut(graph, source, sink);
    if (cut !== 3) continue; // Not the cut we are looking for!
    if (Object.values(residual).some((ns) => ns.length === 0)) continue; // A node got stranded
    const visited = new Set<string>();
    bfs(residual, source, null, {}, visited);
    component = visited;
    break;
  }

  return component.size * (nodes.length - component.size);
}

export function part2(input: string) {
  return 0;
}
