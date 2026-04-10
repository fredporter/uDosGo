#!/usr/bin/env node
/**
 * Informational scan for legacy path/name hints under docs/ and a few repo roots.
 * Does not fail CI — prints hits for human review. See docs/dev/family-legacy-doc-map-v4.md §3–4.
 *
 * Usage: node scripts/check-doc-drift.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PATTERNS = [
  { name: "uDOS-family", re: /\buDOS-family\b/g },
  { name: "uDOS-v3 (URL or path)", re: /\buDOS-v3\b|github\.com\/[^)\s]*\/uDOS-v3/g },
  { name: "sonic-v1", re: /\bsonic-v1\b/g },
  { name: "lowercase syncdown folder", re: /`~\/Code\/syncdown`|\b\/syncdown\b\/(?!-)/i },
];

/** Files that may legitimately mention patterns (grep tutorial / rename instructions). */
const ALLOWLIST_BASENAMES = new Set([
  "docs-v4-consolidation-plan.md",
  "family-legacy-doc-map-v4.md",
  "repo-identity-and-rename-v4.md",
]);

/** @param {string} dir */
function walkMarkdown(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    if (ent.name === "node_modules") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdown(full, out);
    else if (ent.name.endsWith(".md")) out.push(full);
  }
  return out;
}

const docFiles = walkMarkdown(path.join(ROOT, "docs"));
for (const base of ["README.md", "AGENTS.md", "TASKS.md"]) {
  const p = path.join(ROOT, base);
  if (fs.existsSync(p)) docFiles.push(p);
}

const seen = new Set();
const unique = docFiles.filter((p) => {
  const k = path.relative(ROOT, p);
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

console.log("[udos] Doc drift scan (informational) — repo:", ROOT);
console.log("");

let totalHits = 0;

for (const { name, re } of PATTERNS) {
  console.log(`--- ${name} ---`);
  let n = 0;
  for (const fp of unique) {
    const rel = path.relative(ROOT, fp);
    if (ALLOWLIST_BASENAMES.has(path.basename(fp))) continue;

    const text = fs.readFileSync(fp, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      re.lastIndex = 0;
      if (re.test(line)) {
        n++;
        totalHits++;
        console.log(`  ${rel}:${i + 1}: ${line.trim().slice(0, 120)}`);
      }
    });
  }
  if (n === 0) console.log("  (no matches outside allowlisted meta files)");
  console.log("");
}

console.log(
  `[udos] Total line-hits: ${totalHits}. Allowlisted meta files (rename/consolidation tutorials): ${[...ALLOWLIST_BASENAMES].join(", ")}`
);
console.log("[udos] See docs/dev/family-legacy-doc-map-v4.md §3 for strings that are still valid (e.g. uDOS-host repo).");
