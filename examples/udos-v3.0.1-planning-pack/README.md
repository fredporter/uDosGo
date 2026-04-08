# uDOS v3.0.1 Planning Pack

## Purpose

uDOS v3.0.1 is the first clean planning cut for a working local-first demo.

This version is not trying to prove the entire uDOS family. It is focused on one complete system loop:

```text
User input
→ ThinUI accepts and displays it
→ Hivemind classifies and plans work
→ Host executes safely on the local node
→ WordPress provides identity / privacy / restricted local pages
→ outputs persist to local vault and spool storage
```

## Core modules

- `Host` — persistent local node, storage owner, execution runtime, local API, WordPress runtime manager
- `Hivemind` — orchestration, task planning, provider routing, budget awareness, event writing
- `ThinUI` — visual shell for feed, task graph, outputs, controls
- `WordPress localhost engine` — users, privacy, restricted pages, Empire-linked user records

## v3.0.1 success condition

A user can:

1. start the local system
2. open ThinUI
3. submit one input
4. watch Hivemind create and route tasks
5. watch Host execute them
6. see files written to the vault
7. inspect events and provider usage
8. sign in to a restricted local WordPress page
9. observe a linked Empire contact / WP user flow

## Planning documents

- `docs/ARCHITECTURE.md`
- `docs/SCOPE-v3.0.1.md`
- `docs/DEMO.md`
- `docs/DATA-MODEL.md`
- `docs/WP-BRIDGE.md`
- `docs/MILESTONES.md`
- `docs/REPO-STRUCTURE.md`

