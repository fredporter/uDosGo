#!/usr/bin/env node
/**
 * Validate USXD surface JSON under examples/ against
 * packages/schemas/usxd-surface.schema.json (draft 2020-12).
 *
 * Discovers any *.json under examples/ (except package.json); validates files
 * where root.schemaVersion === "usxd/0.1" and root.type === "surface".
 *
 * Flags:
 *   --verbose — log skipped JSON files (not USXD surfaces)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const schemaPath = path.join(ROOT, "packages/schemas/usxd-surface.schema.json");
const USXD_VERSION = "usxd/0.1";

const verbose = process.argv.includes("--verbose");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

function isUsxdSurfaceDoc(data) {
  return (
    data !== null &&
    typeof data === "object" &&
    data.schemaVersion === USXD_VERSION &&
    data.type === "surface"
  );
}

/** @returns {string[]} */
function listJsonUnderExamples() {
  const examplesDir = path.join(ROOT, "examples");
  if (!fs.existsSync(examplesDir)) return [];

  const out = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.name.endsWith(".json") && ent.name !== "package.json") {
        out.push(full);
      }
    }
  }
  walk(examplesDir);
  return out.sort();
}

const files = listJsonUnderExamples();
const toValidate = [];

for (const fp of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(fp, "utf8"));
  } catch (e) {
    console.error("Invalid JSON:", path.relative(ROOT, fp), e);
    process.exit(1);
  }
  if (isUsxdSurfaceDoc(data)) {
    toValidate.push({ fp, data });
  } else if (verbose) {
    console.log(
      "skip:",
      path.relative(ROOT, fp),
      "(not a USXD surface document)"
    );
  }
}

if (toValidate.length === 0) {
  console.error(
    "No USXD surface documents found under examples/ (expected schemaVersion",
    JSON.stringify(USXD_VERSION),
    "and type \"surface\")."
  );
  process.exit(1);
}

let failed = false;
for (const { fp, data } of toValidate) {
  if (!validate(data)) {
    failed = true;
    console.error("USXD surface validation failed:", path.relative(ROOT, fp));
    console.error(
      validate.errors ? ajv.errorsText(validate.errors, { separator: "\n" }) : "(no details)"
    );
  } else {
    console.log(
      "OK:",
      path.relative(ROOT, fp),
      "→",
      path.relative(ROOT, schemaPath)
    );
  }
}

if (failed) process.exit(1);
