#!/usr/bin/env node
/**
 * Create uDOS data directories (same layout as Host). Honors UDOS_DATA_ROOT.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const dataRoot = process.env.UDOS_DATA_ROOT
  ? path.resolve(process.env.UDOS_DATA_ROOT)
  : path.join(ROOT, ".udos-data");

const dirs = [
  "vault",
  "spool",
  "events",
  "exports",
  "wordpress",
  "backups",
];

fs.mkdirSync(dataRoot, { recursive: true });
for (const d of dirs) {
  fs.mkdirSync(path.join(dataRoot, d), { recursive: true });
}

console.log(`[udos] Storage ready: ${dataRoot}`);
