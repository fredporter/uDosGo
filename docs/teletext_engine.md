# TELETEXT Engine — uDOS v3

---

# 1. Overview

The uDOS Teletext Engine is a **character-cell rendering system** based on a fixed raster character model, not a freeform text grid.

This spec uses a teletext character cell inspired by classic Acorn / broadcast mosaic graphics logic, adapted for uDOS surfaces.

---

# 2. Core Principles

- Fixed raster character cells
- Deterministic character rendering
- Mosaic graphics as first-class primitives
- Teletext is not ASCII layout with borders; it is a **cell graphics system**
- UI surfaces should respect teletext block geometry

---

# 3. Character Cell Model

## 3.1 Character Size

Each teletext character cell is:

```text
16 pixels wide × 24 pixels tall
```

## 3.2 Internal Mosaic Geometry

Each character cell is subdivided into:

```text
2 columns × 3 rows
```

This produces **6 addressable mosaic blocks per character**.

Visual model:

```text
++
++
++
```

Equivalent indexed form:

```text
[1][2]
[3][4]
[5][6]
```

This is the correct uDOS teletext primitive.

---

# 4. Acorn-Style Mosaic Block Model

uDOS teletext blocks use an **Acorn-style 2×3 mosaic logic**.

Each teletext character may contain any combination of the six block regions.

Example block fills:

```text
[] []    [][]    []..
[] ..    .[].    [][]
.. ..    ..[]    ..[]
```

Meaning:

- left/right halves can be filled independently
- upper/middle/lower thirds are distinct
- compound shapes are built character-by-character

---

# 5. Cell Geometry Rules

## 5.1 Raster Rules

- Character cells are always 16×24 px
- Mosaic subdivision is always 2×3
- Rendering must snap to the cell grid
- Partial pixel rendering is not allowed

## 5.2 Block Rules

- A block is either on or off
- Combined blocks form teletext glyphs and graphic shapes
- Adjacent cells may visually combine into larger shapes

---

# 6. Surface Grid vs Character Grid

There are two different grids in uDOS teletext rendering:

## 6.1 Surface Grid

The uDOS spatial surface may still use higher-level layout regions.

## 6.2 Character Grid

Inside a teletext surface, content is rendered as a matrix of 16×24 pixel cells.

Example:

```text
Surface
 └── Character Grid
      ├── cell 1 = 16×24 px
      ├── cell 2 = 16×24 px
      └── each cell = 2×3 mosaic blocks
```

---

# 7. Mosaic Primitives

## 7.1 Single Cell Primitive

```text
++
++
++
```

## 7.2 Empty Cell

```text
..
..
..
```

## 7.3 Left Column Filled

```text
+.
+.
+.
```

## 7.4 Right Column Filled

```text
.+
.+
.+
```

## 7.5 Top Band Filled

```text
++
..
..
```

## 7.6 Middle Band Filled

```text
..
++
..
```

## 7.7 Bottom Band Filled

```text
..
..
++
```

---

# 8. Composite Shape Examples

## 8.1 Solid Bar

```text
++ ++ ++
++ ++ ++
++ ++ ++
```

## 8.2 Vertical Pillar

```text
++. ..
++. ..
++. ..
```

## 8.3 Frame Corner Concept

```text
++ ++ ..
++. .. ..
++. .. ..
```

## 8.4 Signage Band

```text
++ ++ ++ ++ ++
++ ++ ++ ++ ++
.. .. .. .. ..
```

These examples should be understood as mosaic-cell compositions, not plain text art.

---

# 9. Teletext UI Logic

Teletext UI elements must be built from repeated 2×3 mosaic cells.

## 9.1 Header Band

A header band is created by repeating filled cells horizontally.

## 9.2 Signage Panels

Panels are built from:

- filled top bands
- filled side columns
- repeated mosaic cells

## 9.3 Buttons

Buttons should be defined as block regions rather than ASCII brackets where possible.

Conceptual example:

```text
[OK]  = mosaic-backed label region
[NEXT] = mosaic-backed label region
```

---

# 10. Newsroom / Signage Display

Newsroom and signage layouts should use strong filled mosaic bands.

Example conceptual layout:

```text
++++ ++++ ++++ ++++
++++ ++++ ++++ ++++
.... .... .... ....

HEADLINE REGION

++++ ++++ ++++ ++++
++++ ++++ ++++ ++++
.... .... .... ....
```

This creates a teletext-native banded display rather than an ASCII box layout.

---

# 11. Block Addressing Model

Recommended block numbering within a cell:

```text
[1][2]
[3][4]
[5][6]
```

A cell state may therefore be represented logically as:

```text
cell = {1,2,3,4,5,6}
```

Example:

```text
cell = {1,3,5}
```

This means the full left column is active.

---

# 12. Teletext Encoding Concept

A teletext character may be treated as:

- text glyph, or
- 6-block mosaic glyph

Renderer responsibilities:

1. resolve cell mode
2. resolve active block set
3. draw 16×24 character cell
4. fill active 2×3 mosaic regions

---

# 13. Rendering Constraints

- Do not model teletext as ordinary ASCII box drawing
- Do not assume arbitrary line borders
- Do not use variable-width character logic
- Respect 16×24 pixel cells
- Respect 2×3 Acorn-style block subdivision

---

# 14. USXD Teletext Binding

Suggested schema:

```yaml
render:
  mode: teletext
  cell_width: 16
  cell_height: 24
  mosaic:
    cols: 2
    rows: 3
    style: acorn
```

---

# 15. Summary

The correct uDOS teletext model is:

- **16 px × 24 px per character cell**
- **2 × 3 mosaic subdivision per cell**
- **6 addressable blocks per character**
- **Acorn-style teletext block geometry**
- signage/newsroom surfaces built from repeated mosaic cells

---

**End of Teletext Engine Spec**

