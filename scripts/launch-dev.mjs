#!/usr/bin/env node
/**
 * First-launch friendly dev runner: optional npm install, doctor, then Host + ThinUI.
 * Usage: node scripts/launch-dev.mjs [--no-install] [--open]
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

process.chdir(ROOT);

const noInstall = process.argv.includes("--no-install");
const openBrowser = process.argv.includes("--open");

const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";

function run(cmd, args, opts = {}) {
  const bin = cmd === "npm" ? npmBin : cmd;
  const r = spawnSync(bin, args, {
    stdio: "inherit",
    cwd: ROOT,
    ...opts,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function commandWorks(cmd, args = ["--version"]) {
  const bin = cmd === "npm" ? npmBin : cmd;
  const r = spawnSync(bin, args, {
    encoding: "utf8",
    cwd: ROOT,
  });
  return r.status === 0;
}

function openUrl(url) {
  if (process.platform === "darwin") {
    spawn("open", [url], { stdio: "ignore", detached: true });
    return;
  }
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", url], {
      stdio: "ignore",
      detached: true,
      shell: false,
    });
    return;
  }
  spawn("xdg-open", [url], { stdio: "ignore", detached: true });
}

function waitForPort(host, port, timeoutMs = 60000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const attempt = () => {
      const sock = net.createConnection({ host, port });
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        sock.destroy();
        resolve(ok);
      };
      sock.once("connect", () => finish(true));
      sock.once("error", () => {
        sock.destroy();
        if (Date.now() - start >= timeoutMs) {
          resolve(false);
          return;
        }
        setTimeout(attempt, 400);
      });
      sock.setTimeout(1500, () => {
        sock.destroy();
        if (Date.now() - start >= timeoutMs) {
          resolve(false);
          return;
        }
        setTimeout(attempt, 400);
      });
    };
    attempt();
  });
}

async function askYesNo(question, defaultYes = true) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return defaultYes;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const suffix = defaultYes ? " [Y/n] " : " [y/N] ";
  const ans = (await rl.question(`${question}${suffix}`)).trim().toLowerCase();
  rl.close();
  if (!ans) return defaultYes;
  if (["y", "yes"].includes(ans)) return true;
  if (["n", "no"].includes(ans)) return false;
  return defaultYes;
}

async function main() {
  if (!commandWorks("npm", ["-v"])) {
    console.error("[udos] npm is not available on PATH.");
    const openInstall = await askYesNo(
      "Open Node.js download page to install npm now?",
      true
    );
    if (openInstall) openUrl("https://nodejs.org/");
    console.error("[udos] Install Node.js (includes npm), then rerun launcher.");
    process.exit(1);
  }

  if (!noInstall && !fs.existsSync(path.join(ROOT, "node_modules"))) {
    const installNow = await askYesNo(
      "Dependencies are missing. Run `npm install` now?",
      true
    );
    if (installNow) {
      console.log("[udos] Installing dependencies…");
      run("npm", ["install"]);
    } else {
      console.warn("[udos] Skipping install. Dev server may fail if deps are missing.");
    }
  }

  const doctor = spawnSync(process.execPath, [path.join(ROOT, "scripts", "check-prereqs.mjs")], {
    stdio: "inherit",
    cwd: ROOT,
  });
  if (doctor.status !== 0) {
    const continueAnyway = await askYesNo(
      "Prereq check reported issues. Continue anyway?",
      false
    );
    if (!continueAnyway) process.exit(doctor.status ?? 1);
  }

  console.log("");
  console.log("[udos] Starting Host + ThinUI (Ctrl+C to stop)");
  console.log("[udos]   Host   → http://127.0.0.1:8787");
  console.log("[udos]   ThinUI → http://127.0.0.1:5173 (alt: http://localhost:5173)");
  console.log("");

  const child = spawn(npmBin, ["run", "dev"], {
    stdio: "inherit",
    cwd: ROOT,
    env: process.env,
  });

  if (openBrowser) {
    // Open only after ThinUI is actually listening to avoid stale "can't connect" tabs.
    const openWhenReady = async () => {
      const via127 = await waitForPort("127.0.0.1", 5173, 60000);
      if (via127) {
        openUrl("http://127.0.0.1:5173");
        return;
      }
      const viaLocalhost = await waitForPort("localhost", 5173, 10000);
      if (viaLocalhost) {
        openUrl("http://localhost:5173");
        return;
      }
      console.warn(
        "[udos] ThinUI did not become reachable within timeout. Try http://localhost:5173 manually."
      );
    };
    openWhenReady().catch(() => {});
  }

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error("[udos] launcher error:", err?.message ?? err);
  process.exit(1);
});
