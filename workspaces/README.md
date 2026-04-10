# uDOS v4 — Cursor / VS Code workspaces (uDos-Go)

**Location:** this folder lives in the **[uDos-Go](https://github.com/fredporter/uDos-Go)** repo (`workspaces/`).  
**Date:** 2026-04-10  
**Purpose:** Multi-root workspaces for **Linkdown**, **Macdown** (Syncdown-app), **Chatdown**, **UniversalSurfaceXD**, and companion repos under `~/Code/`.

## Open a workspace

**File → Open Workspace from File…** (repo-relative paths below):

| File | Use |
| --- | --- |
| [`uDOS-v4.code-workspace`](./uDOS-v4.code-workspace) | Full v4 ecosystem |
| [`Linkdown-v4.code-workspace`](./Linkdown-v4.code-workspace) | Editor + Chatdown |
| [`Macdown-v4.code-workspace`](./Macdown-v4.code-workspace) | macOS app + Chatdown + USXD lab |

JSON `path` entries are relative to **`workspaces/`** (e.g. `../../Linkdown` → `~/Code/Linkdown`). **`uDos-Go`** is included as **`..`** (repo root).

## Expected sibling clones under `~/Code/`

| Folder | Remote / notes |
| --- | --- |
| `Linkdown` | `fredporter/Linkdown` |
| `Linkdown-premium` | `fredporter/Linkdown-premium` (optional) |
| `Syncdown-app` | **Macdown** implementation today — `fredporter/Syncdown-app` until rename |
| `Chatdown` | `fredporter/chatdown-core` (NextChat lineage) |
| `UniversalSurfaceXD` | `fredporter/UniversalSurfaceXD` |
| `uDosConnect` | `fredporter/uDosConnect` |
| `SonicScrewdriver` | `fredporter/SonicScrewdriver` |
| `Ventoy` | `fredporter/Ventoy` (optional) |

**Stub:** [fredporter/Macdown](https://github.com/fredporter/Macdown) names the product; Swift source stays in **Syncdown-app** until migration.

## Scripts (uDosConnect)

- [`../../uDosConnect/scripts/v4-dev/update-all-repos.sh`](../../uDosConnect/scripts/v4-dev/update-all-repos.sh)  
- [`../../uDosConnect/scripts/v4-dev/check-tasks-md.sh`](../../uDosConnect/scripts/v4-dev/check-tasks-md.sh)  
- [`../../uDosConnect/scripts/v4-dev/family-health-check.sh`](../../uDosConnect/scripts/v4-dev/family-health-check.sh)  
- [`../../uDosConnect/scripts/v4-dev/run-all-tests.sh`](../../uDosConnect/scripts/v4-dev/run-all-tests.sh)  

## Archiving old workspace files

Retired `*.code-workspace` copies under `~/Code/` can move to `~/Code/.compost/workspaces/`. **Source of truth** for these three is **this repo**.
