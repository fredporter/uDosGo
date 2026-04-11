/** Progress bars, marquee, and spinner+label helpers. */

import type { readonlyStringArray } from "./types.js";

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

export const loaders = {
  bar(percent: number, width = 40): string {
    const p = clamp01(percent);
    const filled = Math.floor(p * width);
    const empty = width - filled;
    return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${Math.round(p * 100)}%`;
  },

  gradientBar(percent: number, width = 40): string {
    const p = clamp01(percent);
    const chars = ["░", "▒", "▓", "█"] as const;
    const filled = p * width;
    const fullBlocks = Math.floor(filled);
    const remainder = filled - fullBlocks;
    const gradientChar =
      chars[Math.min(chars.length - 1, Math.floor(remainder * chars.length))] ?? "█";
    const tail = Math.max(0, width - fullBlocks - 1);
    return `[${"█".repeat(fullBlocks)}${gradientChar}${"░".repeat(tail)}]`;
  },

  withText(spinner: readonlyStringArray, frame: number, text: string): string {
    const ch = spinner[frame % spinner.length] ?? " ";
    return `${ch} ${text}`;
  },

  marquee(text: string, width: number, position: number): string {
    const padded = text.padEnd(width, " ");
    const pos = ((position % width) + width) % width;
    const rotated = padded.slice(pos) + padded.slice(0, pos);
    return rotated.slice(0, width);
  },

  pulsingDots(frame: number, count = 3): string {
    const mod = frame % (count + 1);
    const dots = ".".repeat(mod);
    const spaces = " ".repeat(Math.max(0, count - mod));
    return `${dots}${spaces}`;
  },
};
