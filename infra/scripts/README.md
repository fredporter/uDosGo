# Infra scripts

Storage layout is created automatically by the Host on startup. To initialize a **custom** data root (for example a mounted volume) before first run:

```bash
export UDOS_DATA_ROOT=/path/to/udos-data
npm run storage:init
```

Implementation: repository root [`scripts/init-storage.mjs`](../../scripts/init-storage.mjs).

**Launchers** (Host + ThinUI, optional WordPress) live at the repo root: `uDOS-Dev.command` / `uDOS-Dev.cmd` and `scripts/launch-dev.mjs`.
