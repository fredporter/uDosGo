#!/usr/bin/env node
/**
 * Step 9 helper: POST /wp-json/udos-empire/v1/me/link as the demo Subscriber.
 *
 * Reads demo/.wp-demo.env if present (from demo:wp-bootstrap), else env vars:
 *   UDOS_WP_BASE_URL
 *   WP_LINK_USER (or WP_DEMO_SUBSCRIBER_USER)
 *   WP_LINK_APP_PASSWORD — application password (no spaces); preferred for stock WordPress REST.
 *   WP_LINK_PASSWORD — account password fallback (often blocked for REST unless you add basic-auth tooling).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const envFile = path.join(ROOT, "demo", ".wp-demo.env");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

loadDotEnv(envFile);

const base = (process.env.UDOS_WP_BASE_URL ?? "http://127.0.0.1:8080").replace(
  /\/$/,
  ""
);
const user =
  process.env.WP_LINK_USER ??
  process.env.WP_DEMO_SUBSCRIBER_USER ??
  "demo";
const contactId = process.env.WP_DEMO_CONTACT_ID ?? "demo-contact-001";

const appPass = process.env.WP_LINK_APP_PASSWORD?.replace(/\s+/g, "") ?? "";
const plainPass =
  process.env.WP_LINK_PASSWORD ??
  process.env.WP_DEMO_SUBSCRIBER_PASSWORD ??
  "";

const secret = appPass || plainPass;
if (!secret) {
  console.error(
    "[wp-link] Missing password. Run npm run demo:wp-bootstrap first, or set WP_LINK_APP_PASSWORD / WP_LINK_PASSWORD."
  );
  process.exit(1);
}

const token = Buffer.from(`${user}:${secret}`, "utf8").toString("base64");
const url = `${base}/wp-json/udos-empire/v1/me/link`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${token}`,
  },
  body: JSON.stringify({ contactId }),
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

if (!res.ok) {
  console.error("[wp-link] HTTP", res.status, body);
  process.exit(1);
}

console.log("[wp-link] Linked user to contact:", contactId);
console.log(JSON.stringify(body, null, 2));

const meUrl = `${base}/wp-json/udos-empire/v1/me/contact`;
const me = await fetch(meUrl, {
  headers: { Accept: "application/json", Authorization: `Basic ${token}` },
});
const meText = await me.text();
console.log("[wp-link] GET /me/contact →", me.status, meText.slice(0, 500));
