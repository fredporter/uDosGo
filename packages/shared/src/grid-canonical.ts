/**
 * Locked grid–graphics constants for uDOS v3.
 * @see docs/GRID-GRAPHICS-CANON.md
 * @see sibling UniversalSurfaceXD/docs/decisions/UniversalSurfaceXD_v2-cannon.md
 */
export const CANONICAL_VIEWPORT_COLS = 80;
export const CANONICAL_VIEWPORT_ROWS = 30;

/** Half-scale viewport (mini grid) where used. */
export const CANONICAL_MINI_COLS = 40;
export const CANONICAL_MINI_ROWS = 15;

/** Pixel raster inside one grid cell (non-square tile). */
export const CANONICAL_TILE_PX_W = 16;
export const CANONICAL_TILE_PX_H = 24;

/** Teletext 2×3 subcell size inside a 16×24 tile (8 px per subcell). */
export const TELETEXT_SUBCELL_PX = 8;

/** Wide glyphs / emoji footprint in cells (2×1). */
export const WIDE_GLYPH_CELL_W = 2;
export const WIDE_GLYPH_CELL_H = 1;

export function canonicalCanvasPx(): { width: number; height: number } {
  return {
    width: CANONICAL_VIEWPORT_COLS * CANONICAL_TILE_PX_W,
    height: CANONICAL_VIEWPORT_ROWS * CANONICAL_TILE_PX_H,
  };
}
