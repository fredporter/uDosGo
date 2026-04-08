# Roadmap — after v3.0.1

**Baseline:** The v3.0.1 local demo loop is **complete** per [MILESTONES.md](MILESTONES.md) and [BACKLOG.md](BACKLOG.md). Items below are **v3.0.2+** only.

## Immediate post-demo (v3.0.2 candidates)

- Harden job runner (timeouts, resource limits, structured error codes).
- ThinUI live updates: extend SSE (filtering, reconnect UX) or add WebSocket if needed.
- SQLite (or single-DB) consolidation for tasks + events if file sprawl hurts.
- Second demo scenario (import inbox, PDF note, email thread) reusing same schemas.

## Active tranche (resumed)

Backlog execution is resumed and tracked in [BACKLOG.md](BACKLOG.md) under **"Active: v3.0.2 backlog"** with P0/P1/P2 priorities.

Execution order:

1. reliability hardening (job runner + stream resilience + persistence decision),
2. second scenario proof using existing contracts,
3. only then consider repo split preparation.

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
