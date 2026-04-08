# Scope — uDOS v3.0.1

**Version:** v3.0.1  
**Type:** Public-facing planning cut for a **working local demo**  
**Non-goal:** Rebuild the full uDOS family or full “dream” surface area.

---

## In scope

### Host

- Persistent **local node** (known host/port or LAN bind).
- **Mounted storage** for vault, spool, events, exports, backups, WordPress data paths.
- **Local HTTP API** for ThinUI, Hivemind, and WordPress bridge consumers.
- **Process / execution runner** (single adapter acceptable for v3.0.1).
- **Local WordPress runtime** ownership (startup order, data path, health).
- **Config and bootstrap scripts** (env, paths, provider keys via local config — not committed secrets).

### Hivemind

- **Feed intake** (read from Host-backed spool/API).
- **Task planning** (graph from classified input).
- **Simple role-based orchestration** — exactly **four** roles: Scout, Planner, Maker, Reviewer.
- **Provider routing** (primary, fallback, optional secondary).
- **Budget awareness** (thresholds, summaries, intentional fallback).
- **Event writing** (append-only trail via Host).
- **Execution requests** only through Host (no direct vault writes from Hivemind).

### ThinUI

- **Feed / Inbox** panel: items, source, summary, send-to-planner.
- **Task graph / queue** panel: states, dependencies, manual rerun/approve.
- **Output / event** panel: files, tool runs, errors, provider + budget line.
- **Manual triggers** (submit, retry, approve reviewer outcome where applicable).
- **Links** to WordPress restricted pages where the demo needs human identity/consent UI.

### WordPress (localhost engine)

- Runs **locally** with **persistent** database/uploads under Host-owned layout.
- **User login** (local accounts).
- **Restricted pages** (capability/role gated).
- **Privacy** — export / erase hooks (stubbed or integrated; must be **designed in**).
- **Empire contact ↔ WP user** bridge (two-tier model; see [WP-BRIDGE.md](WP-BRIDGE.md)).
- **REST or plugin hooks** for Host/Hivemind/ThinUI integration.

### Storage

- Persistent **mounted drive** or documented **local path** (e.g. `/udos-data` or configurable equivalent).
- **Workspace / vault** — durable human-readable outputs.
- **Spool** — structured feed / rollups.
- **Events / logs** — machine-readable append stream.
- **WordPress** data under dedicated subtree.
- **Backups** — at least documented location + optional script placeholder.

---

## Out of scope (v3.0.1)

- App Store packaging and distribution storefronts.
- Mobile apps (iOS/Android).
- Full Apple sync / Continuity-class automation.
- Full MCP registry, browser, or “universe” of tools.
- Public cloud deployment as the default demo path.
- WordPress **multisite**.
- Beacon / public Wi-Fi / captive portal modes.
- Advanced CRM campaign engine, marketing automation at scale.
- Polished public plugin marketplace.
- Many-repo family split **before** the demo loop is proven.
- Large autonomous swarms, agent debate, self-modifying skills, broad “always on” autonomy.

---

## Scope lock rule

If a change does not improve the **nine-step definition of done** in [MILESTONES.md](MILESTONES.md), defer it to v3.0.2+ / [ROADMAP.md](ROADMAP.md).
