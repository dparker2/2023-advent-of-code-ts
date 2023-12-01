import * as fs from "fs/promises";

async function execute(day: string, part: string): Promise<void> {
  const dayModulePath = `./days/${day}.ts`;

  if (!(await fs.exists(dayModulePath))) {
    console.error(`Error: Module for day ${day} not found.`);
    return;
  }

  try {
    const { [part]: partFunction } = await import(dayModulePath);
    if (!partFunction || typeof partFunction !== "function") {
      console.error(
        `Error: Function ${part} not found in module ${dayModulePath}.`
      );
      return;
    }

    console.log(
      partFunction(
        await fs.readFile(`inputs/${day}.txt`, { encoding: "utf-8" })
      )
    );
  } catch (error) {
    console.error(`Error while executing ${day}/${part}:`, error);
  }
}

async function main() {
  const [day, part] = process.argv.slice(2);

  if (!day || !part) {
    console.error("Usage: index.ts <day> <part>");
    return;
  }

  await execute(day, part);
}

main();
