type WeightedAdjList = Record<string, Record<string, number>>;
type Path = { nodes: string[]; weight: number };

function toAdjacencyList(lines: string[]) {
  const graph: WeightedAdjList = {};
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === "#") continue;
      const k = `${i},${j}`;
      graph[k] = {};
      if ([lines[i - 1]?.[j], char].every((ch) => ch === "." || ch === "^"))
        graph[k][`${i - 1},${j}`] = 1;
      if ([lines[i + 1]?.[j], char].every((ch) => ch === "." || ch === "v"))
        graph[k][`${i + 1},${j}`] = 1;
      if ([lines[i]?.[j - 1], char].every((ch) => ch === "." || ch === "<"))
        graph[k][`${i},${j - 1}`] = 1;
      if ([lines[i]?.[j + 1], char].every((ch) => ch === "." || ch === ">"))
        graph[k][`${i},${j + 1}`] = 1;
    }
  }
  return graph;
}

function compress(graph: WeightedAdjList) {
  for (let node in graph) {
    const neighbors = Object.keys(graph[node]);
    if (
      neighbors.length === 2 &&
      graph[neighbors[0]][node] &&
      graph[neighbors[1]][node]
    ) {
      // O<->O<->O
      //     ^ Eliminate this node
      const [n1, n2] = neighbors;
      graph[n1][n2] = graph[n1][node] + graph[node][n2];
      graph[n2][n1] = graph[n2][node] + graph[node][n1];
      delete graph[node];
      delete graph[n1][node];
      delete graph[n2][node];
    }
  }
}

function longestUniquePath(graph: WeightedAdjList, start: string) {
  const queue: Path[] = [{ nodes: [start], weight: 0 }];
  const paths: Record<string, Path> = {};
  for (let node of Object.keys(graph)) paths[node] = { nodes: [], weight: 0 };

  while (queue.length) {
    const path = queue.shift()!;
    const curr = path.nodes.at(-1)!;
    if (path.weight > paths[curr].weight) paths[curr] = path;

    for (let neighbor in graph[curr]) {
      if (path.nodes.includes(neighbor)) continue;
      queue.push({
        nodes: [...path.nodes, neighbor],
        weight: path.weight + graph[curr][neighbor],
      });
    }
  }

  return paths;
}

export function part1(input: string) {
  const lines = input.split("\n");
  const graph = toAdjacencyList(lines);
  compress(graph);
  const start = "0,1";
  const goal = `${lines.length - 1},${lines[lines.length - 1].length - 2}`;
  const paths = longestUniquePath(graph, start);

  return paths[goal].weight;
}

export function part2(input: string) {
  return part1(input.replaceAll(/[\^v><]/g, "."));
}
