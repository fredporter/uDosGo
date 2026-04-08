# Repo Structure — uDOS v3.0.1

## Recommended approach

Use one monorepo first. Split later only after the demo loop is real.

## Proposed structure

```text
uDOS-v3/
  apps/
    host/
    thinui/
    wordpress-plugin-empire-local/
  packages/
    hivemind/
    schemas/
    sdk/
    shared/
  demo/
    sample-inputs/
    sample-workspace/
  infra/
    docker/
    scripts/
  docs/
    README.md
    ARCHITECTURE.md
    DEMO.md
    ROADMAP.md
```

## Module notes

### apps/host
- local API
- runtime manager
- storage owner
- execution adapter
- WordPress connector

### apps/thinui
- visual shell
- feed panel
- task graph / queue panel
- outputs / events panel

### apps/wordpress-plugin-empire-local
- local WP plugin
- contact ↔ user bridge
- restricted page helpers
- privacy hooks

### packages/hivemind
- orchestration logic
- role handlers
- provider routing
- budget policy
- task planner

### packages/schemas
- feed
- task
- event
- contact
- user-link
- provider policy

### packages/sdk
- shared API client
- local type helpers
- host integration helpers

### packages/shared
- constants
- config helpers
- status enums
- shared utility code

