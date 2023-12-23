import { lcm } from "../util/lcm";

type Module = (highPulse: boolean, input: string) => boolean | null;
type Pulse = { target: string; high: boolean; from: string };

function makeFlipFlop() {
  let on = false;
  return (highPulse: boolean) => {
    if (highPulse) return null;
    on = !on;
    return on;
  };
}

function makeConjunction(inputs: string[]) {
  const memory: Record<string, boolean> = {};
  inputs.forEach((input) => (memory[input] = false));
  return (highPulse: boolean, input: string) => {
    memory[input] = highPulse;
    return Object.values(memory).includes(false);
  };
}

function buildProblem(input: string) {
  const configs = input.split("\n").map((l) => l.split(" -> "));

  const outputs: Record<string, string[]> = {};
  configs.forEach(
    ([left, right]) => (outputs[left.slice(1)] = right.split(", "))
  );

  const modules: Record<string, Module> = {};
  configs.forEach(([left]) => {
    let fn: Module;
    const name = left.slice(1);
    if (left[0] === "%") fn = makeFlipFlop();
    else if (left[0] === "&") {
      fn = makeConjunction(
        Object.keys(outputs).filter((k) => outputs[k].includes(name))
      );
    } else fn = () => false;
    modules[name] = fn;
  });

  return { modules, outputs };
}

function pressButton(
  modules: Record<string, Module>,
  outputs: Record<string, string[]>,
  forEach?: (p: Pulse) => void
) {
  let highPulses = 0;
  let lowPulses = 0;

  const pulses: Pulse[] = outputs.roadcaster.map((target) => ({
    target,
    high: false,
    from: "roadcaster",
  }));
  lowPulses++;

  while (pulses.length > 0) {
    const p = pulses.shift()!;
    if (p.high) highPulses++;
    else lowPulses++;
    if (forEach) forEach(p);

    const newPulse = modules[p.target]?.(p.high, p.from);
    if (newPulse === null || newPulse === undefined) continue;
    pulses.push(
      ...outputs[p.target].map((target) => ({
        target,
        high: newPulse,
        from: p.target,
      }))
    );
  }
  return { lowPulses, highPulses };
}

export function part1(input: string) {
  const { modules, outputs } = buildProblem(input);
  let lowPulses = 0;
  let highPulses = 0;
  for (let i = 0; i < 1000; i++) {
    const counts = pressButton(modules, outputs);
    lowPulses += counts.lowPulses;
    highPulses += counts.highPulses;
  }

  return lowPulses * highPulses;
}

export function part2(input: string) {
  const { modules, outputs } = buildProblem(input);
  let presses = 0;
  let cycles: Record<string, number> = { mk: 0, fp: 0, xt: 0, zc: 0 };
  while (Object.values(cycles).some((v) => v === 0)) {
    presses++;
    pressButton(modules, outputs, (p) => {
      if (cycles.hasOwnProperty(p.from) && p.high) {
        console.log(`${p.from} sent pulse at press ${presses}`);
        cycles[p.from] = presses;
      }
    });
  }

  return Object.values(cycles).reduce((n, x) => lcm(n, x), 1);
}
