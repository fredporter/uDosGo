/** Navigation glyphs and simple animated chevron lines. */

export const chevrons = {
  next: "▶",
  prev: "◀",
  up: "▲",
  down: "▼",
  left: "◄",
  right: "►",
  pulseRight: ["▷", "▶", "▶▶", "▶▶▶", "▶▶", "▶", "▷"],
  pulseLeft: ["◁", "◀", "◀◀", "◀◀◀", "◀◀", "◀", "◁"],
};

export function expandChevron(frame: number, max = 5): string {
  const cycle = max * 2;
  const count = Math.min(frame % cycle, max);
  return "»".repeat(count) + "›".repeat(Math.max(0, max - count));
}

export function waveChevron(frame: number, length = 10): string {
  const phase = frame % (length * 2);
  const chars = Array<string>(length).fill("›");
  if (phase < length) {
    chars[phase] = "»";
  } else {
    chars[length * 2 - phase - 1] = "»";
  }
  return chars.join("");
}
