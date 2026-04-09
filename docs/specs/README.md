# Specifications — uDOS v3

**Purpose:** single entry for **display**, **layout**, **USXD**, and **render** specifications.  
**Doc map (full index):** [../README.md](../README.md)  
**Style & authoring:** [../style-guide.md](../style-guide.md)

---

## Canon (read first)

| Document | Role |
| --- | --- |
| [../GRID-GRAPHICS-CANON.md](../GRID-GRAPHICS-CANON.md) | **Locked** rules: 80×30, 16×24, teletext 2×3, LocId/PlaceRef, feed/story family, UniversalSurfaceXD pairing |
| [../DISPLAY_STACK.md](../DISPLAY_STACK.md) | Three-layer model + ordered reading list + pipeline one-liner |

---

## USXD and schema

| Document / artifact | Role |
| --- | --- |
| [../usxd_schema.md](../usxd_schema.md) | Human spec: `usxd/0.1`, `kind`, `grid.tile_px`, regions, validation |
| `packages/schemas/usxd-surface.schema.json` | JSON Schema (subset) |
| `examples/usxd-surface-canonical.example.json` | Canonical example |
| `examples/usxd-surface-minimal.example.json` | Minimal valid surface (schema floor) |
| `npm run validate:usxd` | AJV check for **all** `usxd/0.1` surfaces under `examples/` (first step of `npm run build`); `validate:usxd:verbose` lists skips |

**Sibling repo:** **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** — [cannon](https://github.com/fredporter/UniversalSurfaceXD/blob/main/docs/decisions/UniversalSurfaceXD_v2-cannon.md), [integrated template](https://github.com/fredporter/UniversalSurfaceXD/blob/main/docs/decisions/usxd_udos_integrated_template.md).

---

## Engines and pipeline

| Document | Role |
| --- | --- |
| [../view_engine.md](../view_engine.md) | View kinds × render modes, bindings, fallbacks |
| [../RENDER_PIPELINE.md](../RENDER_PIPELINE.md) | USXD → View → Layout → Raster → output |
| [../grid_engine.md](../grid_engine.md) | Spatial layout: snap, collision, layers (resolution-independent) |
| [../spatial_map_spec.md](../spatial_map_spec.md) | Named maps, regions, markers |
| [../teletext_engine.md](../teletext_engine.md) | 16×24 cell, 2×3 mosaic, canonical 80×30 default |

---

## Code parity

| Location | Role |
| --- | --- |
| `packages/shared/src/grid-canonical.ts` | Viewport, tile px, mosaic, `USXD_SCHEMA_VERSION`, fallback ladder labels |
| ThinUI footer | Live parity string (`usxd/0.1`, 80×30, 16×24, 1280×720) |
| ThinUI `#/lab/teletext` | Interactive teletext mosaic lab |

---

## Related (system docs)

| Document | Role |
| --- | --- |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Host / Hivemind / ThinUI boundaries |
| [../DATA-MODEL.md](../DATA-MODEL.md) | Persistence, feed/task/event schemas |
