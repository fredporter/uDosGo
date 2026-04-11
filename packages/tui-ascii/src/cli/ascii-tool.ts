#!/usr/bin/env node
/**
 * Minimal CLI for demos and CI smoke tests.
 * Usage: udos-ascii-tool <spinner|splash|pattern|load|help> [args]
 */

import { spinners } from "../spinners.js";
import { loaders } from "../loaders.js";
import { splashTemplates } from "../splash.js";
import { renderPattern, type PatternName } from "../patterns.js";
import { expandChevron, waveChevron } from "../chevrons.js";

const args = process.argv.slice(2);
const cmd = args[0] ?? "help";

function help(): void {
  console.log(`
udos-ascii-tool — uDos TUI ASCII toolkit (v1.0.0)
  spinner [name]     Animate default spinner for ~3s (default name: dots)
  splash <name>      Print splash: udos | sonic | classicModern | teletext
  pattern <name>     Animate pattern: sine | ripple | scan | meteor | confetti
  load               Animate a gradient progress bar
  chevron <wave|expand>  One line demo
`);
}

const PATTERNS = new Set<PatternName>([
  "sine",
  "ripple",
  "scan",
  "meteor",
  "confetti",
]);

async function main(): Promise<void> {
  if (cmd === "help" || cmd === "--help" || cmd === "-h") {
    help();
    return;
  }

  if (cmd === "spinner") {
    const name = (args[1] ?? "dots") as keyof typeof spinners;
    const frames = spinners[name] ?? spinners.dots;
    let i = 0;
    const t = setInterval(() => {
      process.stdout.write(`\r${frames[i++ % frames.length]} Loading…`);
    }, 100);
    await new Promise((r) => setTimeout(r, 3000));
    clearInterval(t);
    console.log("\r✓ done          ");
    return;
  }

  if (cmd === "splash") {
    const key = (args[1] ?? "udos") as keyof typeof splashTemplates;
    const art = splashTemplates[key] ?? splashTemplates.udos;
    console.log(art);
    return;
  }

  if (cmd === "pattern") {
    const pname = (args[1] ?? "sine") as PatternName;
    if (!PATTERNS.has(pname)) {
      console.error(`Unknown pattern ${pname}`);
      process.exitCode = 1;
      return;
    }
    const len = Number.parseInt(args[2] ?? "40", 10) || 40;
    let frame = 0;
    const t = setInterval(() => {
      const line = renderPattern(pname, frame++, len);
      process.stdout.write(`\r${line}`);
    }, 80);
    await new Promise((r) => setTimeout(r, 4000));
    clearInterval(t);
    console.log("\r" + " ".repeat(len));
    return;
  }

  if (cmd === "load") {
    let pct = 0;
    const t = setInterval(() => {
      pct += 1;
      process.stdout.write(`\r${loaders.gradientBar(pct / 100, 50)}`);
      if (pct >= 100) {
        clearInterval(t);
        console.log("\n✓ complete");
      }
    }, 40);
    return;
  }

  if (cmd === "chevron") {
    const mode = args[1] ?? "wave";
    const line =
      mode === "expand"
        ? expandChevron(3, 5)
        : waveChevron(4, 14);
    console.log(line);
    return;
  }

  help();
}

void main();
