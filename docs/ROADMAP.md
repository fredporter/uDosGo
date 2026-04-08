# Roadmap — after v3.0.1

**Baseline:** The v3.0.1 local demo loop is **complete** per [MILESTONES.md](MILESTONES.md) and [BACKLOG.md](BACKLOG.md). Items below are **v3.0.2+** only.

## Immediate post-demo (v3.0.2 candidates)

- **Done (P0):** Job runner timeouts + vault write size cap + structured `tool.failed` / task `errorCode`; ThinUI SSE reconnect with backoff + status line; persistence decision (JSON for now) in [DATA-MODEL.md](DATA-MODEL.md).
- **Done (P1):** Second demo scenario (inbox / email-thread intake) + [DEMO.md](DEMO.md) + `demo:seed:inbox`.
- **Done (P2 prep):** [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md) (checklist only; no repo split in-tree).
- **Done (v3.0.3):** `validate:usxd` validates **all** USXD surface JSON files under `examples/` (not only the canonical file); use `npm run validate:usxd:verbose` to list skipped JSON.
- **Done (v3.0.3 closure):** Feed `metadata.surfaceRef` + `feed.received`; SSE and JSON persistence decisions recorded; optional demo media folder [docs/media/README.md](docs/media/README.md); [BACKLOG.md](BACKLOG.md) active tranche cleared.
- ThinUI live updates: optional SSE filtering or WebSocket if a hard blocker appears.
- SQLite (or single-DB) consolidation for tasks + events if file sprawl hurts (deferred past v3.0.2 P0).

## Display stack (confirmed specs → code)

**Docs:** [DISPLAY_STACK.md](DISPLAY_STACK.md) — router for GRID-GRAPHICS-CANON, USXD, View/Render/Grid/Teletext/Spatial/Style guides.

**Done in repo (baseline):**

- `packages/shared` — `USXD_SCHEMA_VERSION`, mosaic + fallback ladder constants beside viewport/tile px.
- `packages/schemas/usxd-surface.schema.json` — JSON Schema subset for `usxd/0.1` surface documents.
- `examples/usxd-surface-canonical.example.json` — canonical 80×30 teletext example.

**Done (implementation):**

- `npm run validate:usxd` — AJV (draft 2020-12) validates every `usxd/0.1` surface JSON under `examples/` against `usxd-surface.schema.json`; runs at the start of `npm run build`.
- ThinUI footer — shows `USXD_SCHEMA_VERSION`, canonical viewport, cell px, canvas px, link to **Teletext lab**.
- **Teletext lab** — hash route `#/lab/teletext`; interactive 2×3 mosaic toggles (scaled view of one 16×24 logical cell).

**Next:**

- Add more `examples/**/*.json` surface fixtures; `npm run validate:usxd` picks them up automatically.
- Host: optional `surfaceRef` or embedded layout metadata beyond ThinUI.

## Active tranche

Backlog: [BACKLOG.md](BACKLOG.md). **v3.0.3** is **closed** (M7–M8). New execution work should open a **v3.0.4+** or family plan line in the backlog feed.

Historical execution order for v3.0.2:

1. Reliability hardening (job runner + stream resilience + persistence decision).
2. Second scenario (inbox thread) using existing contracts.
3. Repo split preparation ([REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md)).

## Repo split (only after demo acceptance)

- Extract `apps/host` → `uDOS-host` repo with semver.
- Extract `packages/hivemind` → `uDOS-hivemind` (or keep package private).
- Extract `apps/thinui` → `uDOS-thinui`.
- Keep `packages/schemas` published or git-subtree shared.

## Depth features (explicitly not v3.0.1)

- Full family module parity, sync engine, beacon networking, MCP registry, marketplace, mobile, App Store.

## WordPress depth

- Multisite, enterprise CRM, full bi-directional Empire sync.

Track decisions that affect scope in [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) and bump version when scope changes.
