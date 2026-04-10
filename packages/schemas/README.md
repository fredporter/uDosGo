# `packages/schemas`

Canonical JSON Schema drafts for v3.0.1. Consume from Host, Hivemind, ThinUI, and tooling; evolve with `schemaVersion` on each document.

**Documentation:** [../../docs/specs/README.md](../../docs/specs/README.md) (spec hub), [../../docs/usxd_schema.md](../../docs/usxd_schema.md), [../../docs/style-guide.md](../../docs/style-guide.md).

**Family v4 drift:** Full field-level parity with uDosDev [`CONTACT_SCHEMA_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md) / [`TASK_SPEC_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/TASK_SPEC_v4.md) is tracked under [`[UDGO-R02]`](../../TASKS.md); note intentional subsets in this table until a scope bump.

| File | Purpose |
|------|---------|
| `usxd-surface.schema.json` | **USXD** portable surface subset (`schemaVersion: usxd/0.1`); see `docs/usxd_schema.md`, `docs/DISPLAY_STACK.md` |
| `feed.schema.json` | Incoming inbox/feed item |
| `task.schema.json` | Task graph node |
| `event.schema.json` | Append-only audit/event |
| `contact.schema.json` | Empire canonical contact |
| `user-link.schema.json` | Contact ↔ WP user mapping |
| `provider-policy.schema.json` | Routing + budget rules |

**Example:** `examples/usxd-surface-canonical.example.json` — canonical 80×30 teletext panel.
