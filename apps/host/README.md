# Host (`apps/host`)

Always-on local node: **storage root**, **HTTP API**, **job runner**, **event/task persistence**, **WordPress lifecycle wiring**, **health**.

## M1

- `npm run dev` — `tsx watch` on port `8787` (override `PORT`).
- `UDOS_DATA_ROOT` — defaults to **`<repo>/.udos-data`** (resolved from the Host package location, not `process.cwd()`). Override for an external disk.

See [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) and [../../docs/FILE-TREE.md](../../docs/FILE-TREE.md).
