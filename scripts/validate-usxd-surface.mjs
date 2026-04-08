#!/usr/bin/env node
/**
 * Validate examples/usxd-surface-canonical.example.json against
 * packages/schemas/usxd-surface.schema.json (draft 2020-12).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const schemaPath = path.join(ROOT, "packages/schemas/usxd-surface.schema.json");
const examplePath = path.join(ROOT, "examples/usxd-surface-canonical.example.json");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(examplePath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.error("USXD surface validation failed:");
  console.error(validate.errors ? ajv.errorsText(validate.errors, { separator: "\n" }) : "(no error details)");
  process.exit(1);
}

console.log("OK:", path.relative(ROOT, examplePath), "→", path.relative(ROOT, schemaPath));
