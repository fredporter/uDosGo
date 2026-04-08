# Style guide — uDOS v3

**Status:** current  
**Updated:** 2026-04-09  
**Spec index:** [specs/README.md](specs/README.md) · **Display router:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

Authoring rules for docs, USXD-flavoured frontmatter, ThinUI theming, and ASCII vs teletext posture. For machine schema details see [usxd_schema.md](usxd_schema.md) and `packages/schemas/usxd-surface.schema.json`.

---

## 0. Core scale model (critical)

uDOS separates **three layers of scale**:

```text
CELL (raster)
  = 16 px × 24 px
  = contains 2 × 3 mosaic blocks (teletext)

GRID (character grid)
  = columns × rows of logical cells
  = uDOS canonical interchange: 80 × 30 (mini: 40 × 15)
  = other sizes allowed in adaptive / legacy surfaces

SPATIAL GRID (layout)
  = abstract layout (tiles, maps, regions)
  = integer (x,y,w,h); not pixel-bound
```

Rules:

- **16×24** is **only** the teletext/HTML raster for one character cell.
- **Spatial layout ≠ character grid ≠ raster pixels.**
- **ASCII** = symbolic layout (characters as drawing symbols).
- **Teletext** = raster layout (mosaic-filled cells).

---

## 1. Philosophy

- Everything is a file.
- Everything is spatial.
- Everything is composable.
- Everything is time-aware.
- Everything is renderable (text → grid → UI).

---

## 1.1 Naming conventions

| Area | Convention |
| --- | --- |
| IDs | `snake_case` |
| Types / enums | `lowercase` |
| Map ids | `earth`, `space`, `system`, `abstract`, … |
| **Doc files** | **`kebab-case.md`** (this file is `style-guide.md`) |
| JSON schema ids | stable URL or `udos.local` path under `packages/schemas/` |

---

## 2. Colour system (ThinUI / dark shell)

Use as **reference tokens** for web surfaces; themes may map these to CSS variables.

```text
Primary        #0A0F1C
Surface        #121826
Elevated       #1B2436
Border         #2A3550

Blue           #4DA3FF
Purple         #8B5CF6
Teal           #2DD4BF
Orange         #FB923C
Red            #EF4444
Green          #22C55E

Text Primary   #E6EDF3
Text Secondary #9AA6B2
Text Muted     #6B7280
```

Canonical layout CSS variables (injected from `@udos/shared` in ThinUI): `--udos-viewport-cols`, `--udos-viewport-rows`, `--udos-tile-px-w`, `--udos-tile-px-h`.

---

## 3. Typography

```text
H1  32px
H2  24px
H3  18px
Body 14px
Mono 13px
```

- Markdown remains a **source** format for prose and tables.
- **Monospace** for ASCII art, logs, and teletext-oriented examples.

---

## 4. Grid concepts

### 4.1 Character grid (canonical)

```text
80 × 30 cells × 16×24 px → 1280 × 720 px canvas
40 × 15 (mini)           → 640 × 360 px
```

### 4.2 Spatial grid

- Variable logical size; **tile** counts are not pixel sizes.
- Used by the Grid Engine and spatial maps; may **project** onto 80×30 for export.

### 4.3 Adaptive surfaces

Other character grids (e.g. 40×25, 120×40) are valid when explicitly declared; they are **not** the default interchange canon.

---

## 5. USXD (Universal Surface XD)

Surface documents use **`schemaVersion: "usxd/0.1"`** for new files. Root shape (human-readable):

```yaml
schemaVersion: "usxd/0.1"
id: surface_main
type: surface
title: Example
kind: panel              # see first-class kinds below
mode: canonical          # or adaptive
```

### 5.1 First-class surface `kind` values

Aligned with [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md):

`launcher`, `panel`, `table`, `list`, `board`, `timeline`, `feed`, `story`, `step-form`, `slide`, `map`, `workflow`, `recovery`, `handoff`

**Story**, **step-form**, and **slide** are one **content family** (three render emphases).

### 5.2 Render binding

```yaml
render:
  mode: grid | ascii | teletext
grid:
  cols: 80
  rows: 30
  tile_px: { w: 16, h: 24 }
```

Full field list: [usxd_schema.md](usxd_schema.md).

### 5.3 Tooling

- Validate example: `npm run validate:usxd` (also runs at start of `npm run build`).
- ThinUI **Teletext lab:** `#/lab/teletext` (mosaic 2×3 preview).

### 5.4 Canonical linking (vault / binders)

```text
udos://vault/binder/file#block
[[file]]
[[file#block]]
```

---

## 6. ASCII system

ASCII = logical text layout on a character grid (box drawing allowed).

```ascii
+----------------+
| STATUS         |
+----------------+
| Tasks: 14      |
+----------------+
```

---

## 7. Teletext system

- **Cell:** 16×24 px.
- **Mosaic:** 2×3 blocks (6 regions); **Acorn-style** composition.
- **Grid:** character grid; canonical **80×30** for interchange.
- **UI:** built from mosaic-filled cells and bands, not ASCII `[ ]` chrome.

Spec detail: [teletext_engine.md](teletext_engine.md).

---

## 8. Tables and columns

Prefer Markdown tables in docs; grid-style ASCII optional for terminal metaphors.

---

## 8.1 Layer model (presentation)

```text
Layer 0 → Base
Layer 1 → Content
Layer 2 → Overlay
Layer 3 → UI
```

Spatial / Grid Engine layers may use a richer stack; see [grid_engine.md](grid_engine.md).

---

## 9. Format modes (markdown frontmatter examples)

**Step-form** (guided input; one primary action per step when multi-step):

```md
---
kind: step-form
---
```

**Slide:**

```md
---
kind: slide
---
```

**Marp** (adapter concern):

```md
---
marp: true
---
```

**Task list:**

```md
- [ ] Task
```

---

## 9.1 Interaction vocabulary

- drag → move  
- snap → align to grid  
- zoom → map / surface scale  
- select → focus entity  

---

## 10. Spatial layout

```yaml
location:
  map: earth
  x: 8
  y: 4
  layer: 2
```

Prefer **LocId** / **PlaceRef** for stable identity across renderers ([GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)).

---

## 11. OK Assist (product copy)

Use **OK Assist** — not “AI Assist”.

```text
> OK ASSIST: VERB TARGET PARAMS
```

Example:

```text
> OK ASSIST: CREATE TASK
> OK ASSIST: MOVE TILE 2,3 → 4,5
```

---

## 12. Summary

```text
Cell   = 16×24 px (teletext raster)
Grid   = character cols×rows (canonical 80×30)
Layout = spatial tiles/maps (abstract integers)
```

---

**End of style guide**
