# uDOS v3 — Style Guide (Core)

---

# 1. Philosophy

uDOS v3 is a spatial, markdown-native operating system layer.

Principles:

- Everything is a file
- Everything is spatial
- Everything is composable
- Everything is time-aware
- Everything is renderable (text → grid → UI)

---

# 2. Colour System

```
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

Rules:

- Dark-first UI
- High contrast for teletext + ASCII
- Semantic colour mapping required

---

# 3. Typography

```
H1 32px
H2 24px
H3 18px
Body 14px
Mono 13px
```

Rules:

- Markdown = source of truth
- Monospace required for structured surfaces

---

# 4. Grid System (16×24)

Base coordinate system:

```
Cols: 16
Rows: 24
```

Coordinates:

```
x: 0–15
y: 0–23
```

Tile model:

```
{x, y, w, h, layer}
```

---

# 5. USXD (Universal Surface XD)

## Definition

USXD is the universal surface format for uDOS.

## Base Example

```yaml
---
id: surface_main
format: usxd
version: 3
view: tile
layer: 1
map_id: main
grid:
  cols: 16
  rows: 24
render:
  mode: grid
---
```

## Views

- tile
- list
- map
- form
- ascii
- teletext
- table
- slide
- story

---

# 6. ASCII System

Rules:

- Monospace only
- Fixed width
- Alignment required

Example:

```ascii
+----------------+
| uDOS STATUS    |
+----------------+
| Tasks: 14      |
| Feed:  Live    |
+----------------+
```

Primitives:

```
Box     +----+
Line    ----
Node    [ID]
Arrow   --->
Check   [ ] [x]
```

---

# 7. Teletext System

Characteristics:

- Fixed grid
- Block graphics
- High contrast

Six-stack layout (16×24):

```text
+----------------+
| HEADER         |
+----------------+
| NAV            |
+----------------+
| MAIN           |
+----------------+
| DATA           |
+----------------+
| STATUS         |
+----------------+
| FOOTER         |
+----------------+
```

Newsroom example:

```text
############################
# uDOS NEWSROOM           #
############################
# TASKS: 014 OPEN         #
# FEED:  LIVE             #
############################
# NEXT: DEPLOY            #
############################
```

---

# 8. Tables & Columns

Markdown:

| Field | Type |
|------|------|
| id   | str  |

Grid:

```text
+------+------+
| id   | str  |
+------+------+
```

Columns:

```text
+----------+----------+
| Notes    | Tasks    |
+----------+----------+
```

---

# 9. Format Modes

Story:

```md
---
view: form
---
```

Slide:

```md
---
view: slide
---
```

Marp:

```md
---
marp: true
---
```

Task:

```md
- [ ] Task
```

---

# 10. OK Assist

Use ONLY:

- OK Assist

Never use:

- AI Assist

Definition:

OK Assist is the system interaction and command layer.

---

# 11. Summary

- Markdown = truth
- Grid = spatial system
- Time = behavioural layer
- Layers = composition

---

**End of Core Style Guide**

