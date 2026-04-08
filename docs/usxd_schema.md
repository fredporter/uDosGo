# USXD Schema — uDOS v3

---

# 1. Overview

USXD (Universal Surface XD) is the canonical **surface + layout schema** for uDOS v3.

It defines:

- surface structure
- grid + spatial layout
- tiles and blocks
- rendering modes (grid / ascii / teletext / etc.)
- view types (tile / list / map / story / slide)

USXD is:

- markdown-native
- human-readable
- Git-friendly
- renderer-agnostic

---

# 2. Root Document Schema

```yaml
---
id: string
format: usxd
version: 3
title: string
view: enum
layer: int
map_id: string
created: timestamp
updated: timestamp
---
```

---

# 3. View Types

```text
tile
list
map
form
ascii
teletext
table
slide
story
task
```

Rules:

- `view` determines primary renderer
- multiple views may be derived from same file

---

# 4. Grid Schema

```yaml
grid:
  cols: 16
  rows: 24
  snap: true
  unit: tile
```

Constraints:

- cols: fixed (16 default)
- rows: fixed (24 default)
- coordinates are integer-based

---

# 5. Tile Schema

```yaml
tiles:
  - id: string
    type: enum
    x: int
    y: int
    w: int
    h: int
    layer: int
    ref: string
```

## Tile Types

```text
note
task
media
map
table
ascii
teletext
form
```

Rules:

- tiles must remain within grid bounds
- tiles may not overlap unless layered
- higher layer overrides lower

---

# 6. Block Schema

Blocks are non-spatial or inline elements.

```yaml
blocks:
  - id: string
    type: enum
    content: string
```

Block Types:

```text
paragraph
heading
list
table
ascii_block
teletext_block
code
```

---

# 7. Render Schema

```yaml
render:
  mode: enum
  mono: bool
  ascii: bool
  teletext: bool
  density: enum
```

Modes:

```text
grid
ascii
teletext
list
slide
form
```

Density:

```text
low
medium
high
```

---

# 8. Location Schema

```yaml
location:
  map: string
  x: int
  y: int
  layer: int
```

Canonical reference:

```text
udos://vault/binder/file#block
```

---

# 9. Layer Schema

```yaml
layers:
  - id: int
    name: string
    opacity: float
    visible: bool
```

Standard Layers:

```text
0 → Grid
1 → Base
2 → Content
3 → Overlay
4 → UI
```

---

# 10. Table Schema

```yaml
table:
  columns:
    - name: string
      type: string
  rows:
    - [value1, value2]
```

Rules:

- columns must be defined first
- rows must align to column count

---

# 11. Column Layout Schema

```yaml
columns:
  count: int
  widths: [int]
  gutter: int
```

Example:

```yaml
columns:
  count: 2
  widths: [8,8]
  gutter: 1
```

---

# 12. ASCII Block Schema

```yaml
ascii:
  content: string
  width: int
  height: int
```

Rules:

- must be monospace aligned
- width must match grid container

---

# 13. Teletext Block Schema

```yaml
teletext:
  content: string
  region: enum
```

Regions:

```text
header
nav
main
data
status
footer
```

---

# 14. Time Binding Schema

```yaml
time:
  created: timestamp
  updated: timestamp
  due: timestamp
  event: string
```

---

# 15. Task Binding

```yaml
task:
  status: enum
  priority: enum
  due: timestamp
```

Status:

```text
todo
active
blocked
done
archived
```

---

# 16. Validation Rules

- id must be unique
- grid must be defined for spatial views
- tiles must not exceed bounds
- layers must be ordered
- view must match render mode

---

# 17. Minimal Example

```md
---
id: dashboard_main
format: usxd
version: 3
view: tile
layer: 1
grid:
  cols: 16
  rows: 24
---

# Dashboard
```

---

**End of USXD Schema**

