#!/usr/bin/env node
/**
 * Demo: resolve one line of retro BASIC → modern (same helper as ThinUI feed).
 * Usage: node scripts/retro-alias-line.mjs 'PEEK'
 *        node scripts/retro-alias-line.mjs --help
 */
import {
  formatRetroHelpBanner,
  resolveRetroForSingleLineInput,
} from "../packages/shared/dist/retro-command-aliases.js";

const argv = process.argv.slice(2);
if (argv[0] === "--help" || argv[0] === "-h") {
  console.log(formatRetroHelpBanner());
  process.exit(0);
}

const line = argv.join(" ").trim() || "PEEK";
const r = resolveRetroForSingleLineInput(line);
console.log(r.wasRetroAlias ? "Resolved:" : "Passthrough:", r.raw);
if (r.wasRetroAlias) {
  console.log(
    JSON.stringify(
      {
        canonical: r.canonicalRetro,
        original: r.originalLine,
        modern: r.raw,
      },
      null,
      2,
    ),
  );
}
