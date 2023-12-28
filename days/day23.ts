function toAdjacencyList(lines: string[]) {
  const graph: Record<string, string[]> = {};
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === "#") continue;
      const k = `${i},${j}`;
      graph[k] = [];
      if ([lines[i - 1]?.[j], char].every((ch) => ch === "." || ch === "^"))
        graph[k].push(`${i - 1},${j}`);
      if ([lines[i + 1]?.[j], char].every((ch) => ch === "." || ch === "v"))
        graph[k].push(`${i + 1},${j}`);
      if ([lines[i]?.[j - 1], char].every((ch) => ch === "." || ch === "<"))
        graph[k].push(`${i},${j - 1}`);
      if ([lines[i]?.[j + 1], char].every((ch) => ch === "." || ch === ">"))
        graph[k].push(`${i},${j + 1}`);
    }
  }
  return graph;
}

function topSort(graph: Record<string, string[]>, start: string) {
  const seen = new Set<string>();
  const keys: string[] = [];
  const dfs = (key: string) => {
    seen.add(key);
    graph[key].forEach((k) => {
      if (!seen.has(k)) dfs(k);
    });
    keys.push(key);
  };
  dfs(start);
  return keys.reverse();
}

export function part1(input: string) {
  const lines = input.split("\n");
  const graph = toAdjacencyList(lines);
  const start = "0,1";
  const goal = `${lines.length - 1},${lines[lines.length - 1].length - 2}`;
  const keys = topSort(graph, start);

  const T: Record<string, number> = {};
  for (let i = 0; i < keys.length; i++) T[keys[i]] = 0;
  for (let i = 0; i < keys.length; i++)
    graph[keys[i]].forEach((k) => {
      if (T[k] === undefined || T[k] < T[keys[i]] + 1) T[k] = T[keys[i]] + 1;
    });

  return T[goal];
}

export function part2(input: string) {
  return part1(input.replaceAll(/[\^v><]/g, "."));
}
