/**
 * npm run build:content
 *
 * Compiles workshops authored as folders of small files into typed data.
 *
 *   src/content/<track>/<topic>/workshops/<workshop>/
 *     workshop.json              id, title, summary, minutes, mode, intro, (files, readOnly, canvas)
 *     step-001/
 *       instructions.md          explanation, then "## Task", then "## Hints" (a bullet list)
 *       solution.html            (+ solution.css, optional)
 *       tests.ts                 export default Check[]
 *       seed.html / seed.css     step 1 only. Later steps start from the previous step's solution.
 *     step-002/ ...
 *
 * Output (next to the sources): workshop.generated.ts, which the topic file imports.
 * Because a step's seed IS the previous solution, the "step N solution = step N+1 seed" rule
 * can't be broken. Runs automatically before `dev`, `build` and the tests.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { toBlocks } from "../src/lib/stepText";

const ROOT = "src/content";

function findWorkshops(dir: string, found: string[] = []): string[] {
  if (existsSync(join(dir, "workshop.json"))) {
    found.push(dir);
    return found;
  }
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) findWorkshops(path, found);
  }
  return found;
}

const read = (path: string, required: boolean): string => {
  if (!existsSync(path)) {
    if (required) throw new Error(`Missing required file: ${path}`);
    return "";
  }
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n").replace(/\n+$/, "");
};

function parseInstructions(markdown: string, where: string) {
  const bucket: Record<"explanation" | "task" | "hints", string[]> = { explanation: [], task: [], hints: [] };
  let section: keyof typeof bucket = "explanation";
  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(task|hints)\s*$/i);
    if (heading) {
      section = heading[1].toLowerCase() as keyof typeof bucket;
      continue;
    }
    bucket[section].push(line);
  }
  // Paragraphs and fenced code blocks, in order. A fenced block stays in one piece, even with blank lines inside.
  const explanation = toBlocks(bucket.explanation.join("\n"));
  const task = toBlocks(bucket.task.join("\n")).join("\n\n");
  const hints = bucket.hints
    .map((line) => line.match(/^\s*[-*]\s+(.*)$/)?.[1]?.trim())
    .filter((hint): hint is string => Boolean(hint));

  if (explanation.length === 0) throw new Error(`${where}: instructions.md has no explanation before "## Task"`);
  if (!task) throw new Error(`${where}: instructions.md needs a "## Task" section`);
  if (hints.length === 0) throw new Error(`${where}: instructions.md needs a "## Hints" list with at least one "- " item`);
  return { explanation, task, hints };
}

async function buildWorkshop(dir: string) {
  const meta = JSON.parse(read(join(dir, "workshop.json"), true));
  for (const field of ["id", "title", "summary", "mode", "intro"]) {
    if (!meta[field]) throw new Error(`${dir}/workshop.json: missing "${field}"`);
  }

  const stepDirs = readdirSync(dir)
    .filter((name) => /^step-\d+$/.test(name) && statSync(join(dir, name)).isDirectory())
    .sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)));
  if (stepDirs.length === 0) throw new Error(`${dir}: no step-NNN folders`);

  const steps = [];
  let previous: { html: string; css: string } | undefined;

  for (const [i, name] of stepDirs.entries()) {
    const where = `${dir}/${name}`;
    if (Number(name.slice(5)) !== i + 1) throw new Error(`${where}: steps must be numbered 001, 002, 003... with no gaps`);

    const { explanation, task, hints } = parseInstructions(read(join(where, "instructions.md"), true), where);
    const solution = { html: read(join(where, "solution.html"), true), css: read(join(where, "solution.css"), false) };

    let seed: { html: string; css: string };
    if (i === 0) {
      seed = { html: read(join(where, "seed.html"), true), css: read(join(where, "seed.css"), false) };
    } else {
      if (existsSync(join(where, "seed.html")) || existsSync(join(where, "seed.css"))) {
        throw new Error(`${where}: remove seed.html/seed.css. Steps after the first start from the previous solution.`);
      }
      seed = { ...previous! };
    }

    const testsModule = await import(pathToFileURL(resolve(where, "tests.ts")).href);
    const checks = testsModule.default;
    if (!Array.isArray(checks) || checks.length === 0) throw new Error(`${where}/tests.ts: must export default a non-empty array of checks`);

    steps.push({ id: name, explanation, task, seed, solution, checks, hints });
    previous = solution;
  }

  const lesson = {
    id: meta.id,
    kind: "workshop",
    title: meta.title,
    summary: meta.summary,
    ...(meta.minutes ? { minutes: meta.minutes } : {}),
    mode: meta.mode,
    intro: meta.intro,
    ...(meta.files ? { files: meta.files } : {}),
    ...(meta.readOnly ? { readOnly: meta.readOnly } : {}),
    ...(meta.canvas ? { canvas: meta.canvas } : {}),
    steps,
  };

  const output =
    `// AUTO-GENERATED by scripts/build-content.ts from the step files in this folder.\n` +
    `// Do not edit this file. Edit the step files, then run: npm run build:content\n\n` +
    `import type { WorkshopLesson } from "@/engine/types";\n\n` +
    `const workshop: WorkshopLesson = ${JSON.stringify(lesson, null, 2)};\n\n` +
    `export default workshop;\n`;

  const target = join(dir, "workshop.generated.ts");
  if (!existsSync(target) || readFileSync(target, "utf8") !== output) writeFileSync(target, output);
  console.log(`  ${meta.id}: ${steps.length} steps -> ${target}`);
}

const workshops = findWorkshops(ROOT);
console.log(`Building ${workshops.length} workshop(s)`);
for (const dir of workshops) {
  try {
    await buildWorkshop(dir);
  } catch (error) {
    console.error(`\nBuild failed: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}
