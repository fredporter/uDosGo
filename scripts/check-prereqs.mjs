#!/usr/bin/env node
/**
 * Verify toolchain before first launch. Exits 0 on success, 1 on hard failures.
 * Usage: node scripts/check-prereqs.mjs [--strict] [--docker]
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const strict = process.argv.includes("--strict");
const wantDocker = process.argv.includes("--docker");
let softFailures = 0;

function softFail(msg) {
  console.error(`[udos-doctor] ${msg}`);
  softFailures += 1;
  if (strict) process.exit(1);
}

function hardFail(msg) {
  console.error(`[udos-doctor] ${msg}`);
  process.exit(1);
}

function ok(msg) {
  console.log(`[udos-doctor] ${msg}`);
}

function parseNodeMajor(v) {
  const m = /^v?(\d+)/.exec(String(v).trim());
  return m ? Number(m[1]) : NaN;
}

let minNode = 20;
try {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, "package.json"), "utf8")
  );
  const eng = pkg.engines?.node;
  if (typeof eng === "string") {
    const m = />=?\s*(\d+)/.exec(eng);
    if (m) minNode = Number(m[1]);
  }
} catch {
  /* ignore */
}

const major = parseNodeMajor(process.version);
if (!Number.isFinite(major) || major < minNode) {
  hardFail(
    `Node.js ${process.version} — need >= ${minNode} (see package.json "engines").`
  );
} else {
  ok(`Node.js ${process.version}`);
}

const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
const npmWhich = spawnSync(npmBin, ["-v"], {
  encoding: "utf8",
  cwd: ROOT,
});
if (npmWhich.status !== 0) {
  softFail("npm not found on PATH. Install Node.js LTS from https://nodejs.org/.");
} else {
  ok(`npm ${(npmWhich.stdout ?? "").trim()}`);
}

if (!fs.existsSync(path.join(ROOT, "node_modules"))) {
  softFail('Run "npm install" from the repository root (no node_modules yet).');
}

const dc = spawnSync("docker", ["compose", "version"], {
  encoding: "utf8",
});
if (dc.status === 0) {
  ok(`docker compose: ${(dc.stdout ?? "").trim().split("\n")[0]}`);
} else if (wantDocker || strict) {
  softFail(
    "Docker Compose v2 not found — required for WordPress (`npm run launch:wp` / `npm run wp:up`)."
  );
} else {
  console.log(
    "[udos-doctor] Docker Compose not detected — optional; install Docker for WordPress (`npm run launch:wp`)."
  );
}

console.log("[udos-doctor] Done.");
if (strict && softFailures > 0) process.exit(1);
