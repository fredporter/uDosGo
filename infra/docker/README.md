# Docker — WordPress runtime (uDosGo)

Local **WordPress + MySQL** for the v3 demo: persistent files under the monorepo **`.udos-data/`** tree (aligned with Host’s `wordpress` and sibling dirs).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Compose v2 (`docker compose`).

## First-time setup

No file copy is required: `compose.yml` uses safe **local-dev defaults** (see `.env.example` for the full list).

Optional: copy `infra/docker/.env.example` to `infra/docker/.env` and adjust values, then run Compose with `--env-file infra/docker/.env`.

## Start / stop

From the **repository root** (`uDosGo/`):

```bash
npm run wp:up      # detached
npm run wp:logs    # follow WordPress logs
npm run wp:down    # stop containers (data kept on disk)
```

## One-shot WordPress bootstrap (steps 8–9 prep)

After containers are up, from the repo root:

```bash
npm run demo:wp-bootstrap
```

This uses Compose **`bootstrap`** profile service **`wpcli`** (`wordpress:cli`) to install core (if empty DB), flush permalinks, activate **udos-empire-local**, create Subscriber **`demo`**, and write **`demo/.wp-demo.env`**. Then:

```bash
npm run demo:wp-link
```

See [../../docs/DEMO.md](../../docs/DEMO.md) and [../../demo/README.md](../../demo/README.md).

Or directly:

```bash
docker compose -f infra/docker/compose.yml up -d
```

## URLs and data

| Item | Default |
|------|---------|
| WordPress | `http://127.0.0.1:8080` (see `WP_PORT` in `.env`) |
| MySQL | internal only (`db:3306` from the `wordpress` service) |
| WordPress files | `../../.udos-data/wordpress` → `/var/www/html` |
| MySQL data | `../../.udos-data/mysql` → `/var/lib/mysql` |
| Empire plugin | live mount from `apps/wordpress-plugin-empire-local` → `wp-content/plugins/udos-empire-local` |

After the container first boot, complete the WordPress install wizard in the browser. Activate **uDOS Empire Local** under Plugins.

## Host alignment

The Node Host defaults to **`<repo>/.udos-data`** (typically `uDosGo/.udos-data`, resolved from the Host entrypoint, not `process.cwd()`), so `wordpress/`, `vault/`, and Docker’s WordPress files all share the same tree. Override with `UDOS_DATA_ROOT` if needed.

## Troubleshooting

- **Port in use:** change `WP_PORT` in `infra/docker/.env`.
- **Database will not start:** ensure `../../.udos-data/mysql` is writable; remove the folder only if you intend to reset the DB.
- **Blank site after changing DB password:** passwords are fixed on first MySQL init; reset by removing the MySQL data directory (destructive).
