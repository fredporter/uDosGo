# File tree — uDOS v3 monorepo (v3.0.1 target)

Planning artifact: **target layout** for implementation. Empty dirs may contain only `README.md` placeholders until code lands.

## Repository root

```text
uDOS-v3/
  README.md
  package.json                 # workspaces root (when implemented)
  tsconfig.base.json          # optional shared TS config
  .env.example                 # Host base URL, storage root, WP URL — no secrets
  apps/
    host/
      README.md
      src/
        api/                   # HTTP routes, DTOs
        config/                # loader, validation
        storage/               # vault/spool/events paths
        execution/             # runner, tools (small registry)
        wordpress/             # connector client, health
        health/
      config/
        default.paths.json     # illustrative defaults
    thinui/
      README.md
      src/
        panels/
          feed/
          graph/
          output/
        lib/
          api/                 # sdk consumer
      public/
    wordpress-plugin-empire-local/
      README.md
      udos-empire-local.php    # plugin bootstrap
      includes/
        class-rest.php
        class-contact-bridge.php
        class-privacy.php
        class-capabilities.php
      assets/                  # optional admin CSS/JS
  packages/
    hivemind/
      README.md
      src/
        roles/
          scout/
          planner/
          maker/
          reviewer/
        loop/
        router/
        budget/
    schemas/
      README.md
      feed.schema.json
      task.schema.json
      event.schema.json
      contact.schema.json
      user-link.schema.json
      provider-policy.schema.json
    sdk/
      README.md
      src/
        client.ts              # Host HTTP client
    shared/
      README.md
      src/                     # tiny shared constants/helpers
  demo/
    README.md
    sample-inputs/
      gold-path-note.txt       # example prompt (add in M4)
    sample-workspace/
      .gitkeep                 # or README describing expected vault layout after run
    scripts/
      seed.sh                  # optional; may be npm script instead
  infra/
    docker/
      README.md
      compose.yml              # optional: host + wp + db
    scripts/
      init-storage.sh          # mkdir -p /udos-data/...
  docs/
    README.md                 # doc tree index (start here)
    QUICKSTART.md
    SCOPE-v3.0.1.md
    ARCHITECTURE.md
    DATA-MODEL.md
    DEMO.md
    WP-BRIDGE.md
    MILESTONES.md
    BACKLOG.md
    ROADMAP.md
    FILE-TREE.md
    style-guide.md            # canonical style + USXD authoring
    GRID-GRAPHICS-CANON.md
    DISPLAY_STACK.md
    usxd_schema.md
    view_engine.md
    RENDER_PIPELINE.md
    grid_engine.md
    spatial_map_spec.md
    teletext_engine.md
    specs/
      README.md               # specifications hub
    u_dos_v_3_style_guide.md  # legacy redirect → style-guide.md
```

## Scaffold status (this planning pack)

Created in the workspace:

- `uDOS-v3/README.md`
- `uDOS-v3/docs/*` (all planning docs)
- `uDOS-v3/packages/schemas/*.schema.json` (first drafts)
- Placeholder `README.md` files under `apps/`, `packages/`, `demo/`, `infra/` as needed

**M1 implemented:**

- Root `package.json` workspaces, `tsconfig.base.json`, `.gitignore`
- `apps/host/src/index.ts` — HTTP server, `/health`, storage bootstrap
- `apps/thinui/` — Vite + React shell, `@udos/sdk` client for health
- `packages/sdk/src` — `createHostClient`
- `demo/scripts/seed.mjs` — placeholder seed
- `scripts/*.mjs` — `launch-dev`, `launch-with-wp`, `check-prereqs`, `init-storage`
- `demo/scripts/wp-bootstrap.mjs`, `demo/scripts/wp-link-demo.mjs` — WordPress steps 8–9
- `demo/wp-demo.env.example` — documented demo WP credentials / env keys
- `uDOS-Dev.command` / `uDOS-Dev.cmd` — double-click launchers (Host + ThinUI)
- `uDOS-Dev+WP.command` / `uDOS-Dev+WP.cmd` — same + Docker WordPress stack
- `.nvmrc` — Node version hint for first launch

**Not created until later milestones:**

- Packaged installers (DMG/MSI/AppImage); use Node + npm + optional Docker for now.

## Cross-reference

- Milestone checklists: [MILESTONES.md](MILESTONES.md)
- Schema field details: [DATA-MODEL.md](DATA-MODEL.md)
