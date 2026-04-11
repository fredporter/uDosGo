/**
 * Formula-driven single-line patterns for feeds, FDX previews, and ThinUI labs.
 * Frame indices advance with animation ticks; output is deterministic (no RNG in confetti).
 */

const CONFETTI_CHARS = ["*", "+", "x", "·", "o", "O", "●", "◇"];

function confettiPick(frame: number, slot: number): string {
  const idx = (frame * 31 + slot * 17) % CONFETTI_CHARS.length;
  return CONFETTI_CHARS[idx] ?? "*";
}

export class PatternGenerator {
  static sine(frame: number, length = 40): string {
    const amplitude = 8;
    const frequency = 0.3;
    const pattern: string[] = [];
    for (let x = 0; x < length; x++) {
      const y = Math.sin(frame * frequency + x * 0.3) * amplitude;
      pattern.push(y > 0 ? "▀" : "▄");
    }
    return pattern.join("");
  }

  static ripple(frame: number, length = 40): string {
    const chars = ["░", "▒", "▓", "█", "▓", "▒", "░"];
    const pattern: string[] = [];
    for (let i = 0; i < length; i++) {
      const distance = Math.abs(i - length / 2);
      const phase = (frame + Math.floor(distance)) % chars.length;
      pattern.push(chars[phase] ?? "░");
    }
    return pattern.join("");
  }

  static scan(frame: number, length = 40): string {
    const pos = ((frame % length) + length) % length;
    const pattern = Array<string>(length).fill("░");
    pattern[pos] = "█";
    return pattern.join("");
  }

  static meteor(frame: number, length = 40): string {
    const tail = 3;
    const pos = ((frame % length) + length) % length;
    const pattern = Array<string>(length).fill(" ");
    const trail = ["·", "o", "O"] as const;
    for (let i = 0; i < tail; i++) {
      const trailPos = (pos - i + length) % length;
      pattern[trailPos] = trail[i] ?? "●";
    }
    pattern[pos] = "*";
    return pattern.join("");
  }

  /** Deterministic “spark” line — suitable for tests and headless CI. */
  static confetti(frame: number, width = 80): string {
    const positions = [10, 25, 40, 55, 70];
    const pattern = Array<string>(width).fill(" ");
    positions.forEach((pos, i) => {
      const offset = (frame + i * 7) % 20;
      if (offset < 10 && pos + offset < width) {
        pattern[pos + offset] = confettiPick(frame, i);
      }
    });
    return pattern.join("");
  }
}

export type PatternName = "sine" | "ripple" | "scan" | "meteor" | "confetti";

export function renderPattern(name: PatternName, frame: number, length: number): string {
  switch (name) {
    case "sine":
      return PatternGenerator.sine(frame, length);
    case "ripple":
      return PatternGenerator.ripple(frame, length);
    case "scan":
      return PatternGenerator.scan(frame, length);
    case "meteor":
      return PatternGenerator.meteor(frame, length);
    case "confetti":
      return PatternGenerator.confetti(frame, length);
    default: {
      const _x: never = name;
      return _x;
    }
  }
}
