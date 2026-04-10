#!/usr/bin/env node
/**
 * When UniversalSurfaceXD is cloned as a sibling (typical ~/Code layout), run its
 * `npm run ux:validate-surfaces` so integration + lab surface examples stay aligned.
 *
 * Resolution order for lab root:
 *   1. UNIVERSAL_SURFACE_XD_ROOT
 *   2. <uDosGo>/../UniversalSurfaceXD
 *
 * If the directory is missing (e.g. CI without the clone), prints a skip line and exits 0.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function resolveLabRoot() {
  if (process.env.UNIVERSAL_SURFACE_XD_ROOT) {
    return path.resolve(process.env.UNIVERSAL_SURFACE_XD_ROOT);
  }
  return path.resolve(ROOT, "..", "UniversalSurfaceXD");
}

const labRoot = resolveLabRoot();
const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";

if (!fs.existsSync(labRoot) || !fs.existsSync(path.join(labRoot, "package.json"))) {
  console.warn(
    `[udos] skip: UniversalSurfaceXD lab not found at ${labRoot} (clone github.com/fredporter/UniversalSurfaceXD next to uDosGo, or set UNIVERSAL_SURFACE_XD_ROOT)`
  );
  process.exit(0);
}

console.log(`[udos] Running sibling lab: ${labRoot} → npm run ux:validate-surfaces`);

const r = spawnSync(npmBin, ["run", "ux:validate-surfaces"], {
  cwd: labRoot,
  stdio: "inherit",
  env: process.env,
});

if (r.status !== 0) {
  process.exit(r.status ?? 1);
}
