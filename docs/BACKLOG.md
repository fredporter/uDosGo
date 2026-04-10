# Backlog — uDOS v3

## Closed: v3.0.1 (local demo loop)

**Status:** Milestone **M1–M4 complete** per [MILESTONES.md](MILESTONES.md) (2026-04-08).  
**Scope:** [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md)  
**Gold path:** [DEMO.md](DEMO.md)

Shipped capabilities (summary):

| Area | Delivered |
|------|-----------|
| Host | HTTP API, pipeline, vault tools, events + SSE, storage layout, launch scripts |
| Hivemind | Scout/Planner task graph (4 steps + review), provider stub events |
| ThinUI | Feed, tasks (grouped, rerun), output + provider strip + vault file list |
| WordPress | Docker compose, `udos-empire-local`, restricted page, REST bridge, privacy hooks |
| Ops | `npm run launch`, `doctor`, `storage:init`, double-click launchers |
| Demo steps 8–9 | `demo:wp-bootstrap`, `demo:wp-link`, `demo/.wp-demo.env` (gitignored) |

## Closed: v3.0.2 (reliability + second scenario + split prep)

**Status:** **Complete** per [MILESTONES.md](MILESTONES.md) M5–M6 (through 2026-04-09).

| Track | Outcome |
|-------|---------|
| P0 | Tool timeouts, vault byte cap, structured `tool.failed`, SSE reconnect, JSON persistence decision |
| P1 | Inbox / email-thread scenario, `thread-*.md` vault stem, `demo:seed:inbox`, [DEMO.md](DEMO.md) scenario B |
| P2 prep | [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md) extraction checklist (no in-repo split) |

## Closed: v3.0.3 (backlog closure tranche)

**Status:** **Complete** (2026-04-09). See [MILESTONES.md](MILESTONES.md) M7–M8.

| Item | Outcome |
|------|---------|
| USXD multi-file validation | `npm run validate:usxd` walks `examples/`; `validate:usxd:verbose` |
| SSE follow-up | **No change:** SSE + client reconnect remain default; WebSocket / filtering only if a filed ThinUI blocker appears |
| Persistence follow-up | **Reaffirmed:** JSON through v3.0.3; SQLite deferred ([DATA-MODEL.md](DATA-MODEL.md)) |
| Host `surfaceRef` / layout metadata | `metadata.surfaceRef` on feed POST, `feed.received` payload, ThinUI optional field ([ARCHITECTURE.md](ARCHITECTURE.md)) |
| Optional marketing assets | Drop zone + checklist pointer: [docs/media/README.md](media/README.md) (binaries optional, gitignored by convention) |

## Optional (non-blocking)

- Add PNG/video under `docs/media/` when you capture them ([DEMO.md](DEMO.md) checklist); see [docs/media/README.md](media/README.md).

**Steps 8–9 prep:** `npm run demo:wp-bootstrap` and `npm run demo:wp-link` (see [DEMO.md](DEMO.md) § Steps 8–9).

## Open: v4 family alignment (forward)

**Product tranches (v3.0.x)** are closed through M8 — see [MILESTONES.md](MILESTONES.md). Forward work is **family v4 alignment**, not a new v3.0.x queue:

| Track | Where | Status |
| --- | --- | --- |
| **Spec + schema alignment** | [`[UDGO-R02]`](../TASKS.md) **done** (2026-04-10); [docs/specs/README.md](specs/README.md) · [uDosDev `specs/v4/`](../../uDosConnect/uDosDev/docs/specs/v4/) | **Maintenance** — extend hub when uDosDev README gains entries |
| **Rename / branding sweep** | [TASKS.md](../TASKS.md) **`[UDGO-T001]`**; [repo-identity-and-rename-v4.md](repo-identity-and-rename-v4.md) | Backlog (scheduled) |

**Roadmap snapshot (actual vs still to do):** [ROADMAP.md § v4 journey](ROADMAP.md) — status table + **Active tranche** at bottom of that file.

## Beyond v3.0.x — explicitly deferred

Not scheduled in this backlog; tracked for positioning only:

- Sync engine, beacon networking, MCP registry / marketplace, mobile clients, App Store, full family module parity.
- WordPress multisite / enterprise CRM / full bi-directional Empire sync.
- SQLite / DB-backed spool without a new scope bump.

## Tracking rule

If an item changes the one-loop boundary, update [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) first, then update [ROADMAP.md](ROADMAP.md) and this backlog in the same change set.
