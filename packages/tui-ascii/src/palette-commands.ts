/**
 * Shell v4–style command ids for the shared `:` / `/` palette (category `ascii`).
 * Sonic `sonic palette` and uDos host `GET /api/v1/meta/shell-palette` stay aligned.
 */

export interface ShellPaletteRow {
  name: string;
  description: string;
  category: string;
}

export const asciiPaletteCommands: ShellPaletteRow[] = [
  {
    name: "ascii:spinner",
    description: "Show spinner preset (dots, teletext, retro, …)",
    category: "ascii",
  },
  {
    name: "ascii:load",
    description: "Gradient / block progress bar (percent-driven)",
    category: "ascii",
  },
  {
    name: "ascii:splash",
    description: "Render a named splash template (udos, sonic, teletext, …)",
    category: "ascii",
  },
  {
    name: "ascii:pattern",
    description: "Formula line — sine | ripple | scan | meteor | confetti",
    category: "ascii",
  },
  {
    name: "ascii:marquee",
    description: "Horizontal marquee slice for status / feed crawl",
    category: "ascii",
  },
  {
    name: "ascii:chevron",
    description: "Animated chevron wave / expand (navigation hints)",
    category: "ascii",
  },
  {
    name: "ascii:sequence",
    description: "Compose timed frames (boot / FDX animation steps)",
    category: "ascii",
  },
  {
    name: "dev:vibe-udos",
    description: "Open uDos-Dev Vibe plugin docs (workflow / budget / TASKS.md)",
    category: "dev",
  },
];

export function listAsciiPaletteCommands(
  filterTerm?: string
): ShellPaletteRow[] {
  if (!filterTerm?.trim()) return [...asciiPaletteCommands];
  const ft = filterTerm.toLowerCase();
  return asciiPaletteCommands.filter((r) => {
    const hay = `${r.name} ${r.description} ${r.category}`.toLowerCase();
    return hay.includes(ft);
  });
}
