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

## Optional (non-blocking)

- Marketing assets: PNG/video from [DEMO.md](DEMO.md) screenshot checklist.

**Steps 8–9 prep:** `npm run demo:wp-bootstrap` and `npm run demo:wp-link` (see [DEMO.md](DEMO.md) § Steps 8–9).

## Active: v3.0.3 candidates

Small follow-ups after v3.0.2 closure; does **not** include depth roadmap (see below).

- [x] **USXD validation:** `npm run validate:usxd` walks `examples/**/*.json` and validates every document with `schemaVersion: usxd/0.1` + `type: surface` (see [MILESTONES.md](MILESTONES.md) M7).
- [ ] **SSE:** optional event filtering or WebSocket only if a concrete ThinUI blocker appears ([ROADMAP.md](ROADMAP.md)).
- [ ] **Persistence:** SQLite / single-DB consolidation if JSON tail latency or sprawl hurts ([DATA-MODEL.md](DATA-MODEL.md) decision can be revisited).
- [ ] **Host:** optional `surfaceRef` or embedded layout metadata for USXD beyond ThinUI ([ROADMAP.md](ROADMAP.md)).

## Beyond v3.0.x — explicitly deferred

Not scheduled in this backlog; tracked for positioning only:

- Sync engine, beacon networking, MCP registry / marketplace, mobile clients, App Store, full family module parity.
- WordPress multisite / enterprise CRM / full bi-directional Empire sync.

## Tracking rule

If an item changes the one-loop boundary, update [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) first, then update [ROADMAP.md](ROADMAP.md) and this backlog in the same change set.
