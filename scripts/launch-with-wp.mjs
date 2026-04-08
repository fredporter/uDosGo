#!/usr/bin/env node
/**
 * Start WordPress stack (Docker), then same path as launch-dev.mjs.
 * Usage: node scripts/launch-with-wp.mjs [--no-install] [--open]
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

const composeFile = path.join(ROOT, "infra", "docker", "compose.yml");
if (!fs.existsSync(composeFile)) {
  console.error("[udos] Missing infra/docker/compose.yml");
  process.exit(1);
}

function openDockerDesktop() {
  if (process.platform === "darwin") {
    spawn("open", ["-a", "Docker"], { stdio: "ignore", detached: true });
    return true;
  }
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", "docker-desktop://dashboard"], {
      stdio: "ignore",
      detached: true,
      shell: false,
    });
    return true;
  }
  return false;
}

function canUseDockerCompose() {
  const check = spawnSync("docker", ["compose", "version"], {
    encoding: "utf8",
    cwd: ROOT,
  });
  return check.status === 0;
}

function dockerComposeUp() {
  return spawnSync("docker", ["compose", "-f", composeFile, "up", "-d"], {
    stdio: "inherit",
    cwd: ROOT,
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

async function startWordPressStack() {
  if (!canUseDockerCompose()) {
    console.warn("[udos] Docker Compose is not ready.");
    const openInstall = await askYesNo(
      "Open Docker Desktop install page now?",
      true
    );
    if (openInstall && process.platform === "darwin") {
      spawn("open", ["https://www.docker.com/products/docker-desktop/"], {
        stdio: "ignore",
        detached: true,
      });
    }
    const continueWithoutWp = await askYesNo(
      "Continue without WordPress (Host + ThinUI only)?",
      true
    );
    return continueWithoutWp;
  }

  console.log("[udos] Starting WordPress + MySQL (docker compose)…");
  let up = dockerComposeUp();
  if (up.status === 0) return false;

  const tryStartDocker = await askYesNo(
    "Docker daemon seems down. Try launching Docker Desktop and retry?",
    true
  );
  if (tryStartDocker) {
    const launched = openDockerDesktop();
    if (!launched) {
      console.warn(
        "[udos] Could not auto-launch Docker on this OS. Start Docker manually."
      );
    } else {
      console.log("[udos] Waiting for Docker Desktop to initialize…");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    up = dockerComposeUp();
    if (up.status === 0) return false;
  }

  const continueWithoutWp = await askYesNo(
    "WordPress stack still failed. Continue without WordPress?",
    true
  );
  return continueWithoutWp;
}

const skipWp = await startWordPressStack();
if (skipWp) {
  console.warn("[udos] Continuing without WordPress.");
} else {
  console.log(
    "[udos] WordPress → http://127.0.0.1:8080 (finish install wizard once)"
  );
}

console.log("");

const launcher = path.join(ROOT, "scripts", "launch-dev.mjs");
const extra = process.argv.slice(2);
const child = spawn(process.execPath, [launcher, ...extra], {
  stdio: "inherit",
  cwd: ROOT,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
