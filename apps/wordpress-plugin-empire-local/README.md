# `udos-empire-local` (WordPress plugin)

Install into `wp-content/plugins/udos-empire-local/` (symlink, copy, or volume from this directory).

See [../../docs/WP-BRIDGE.md](../../docs/WP-BRIDGE.md).

## Layout

- `udos-empire-local.php` — bootstrap
- `includes/` — REST, contact bridge, privacy hooks, capabilities, shortcodes, Host notify

## REST (`/wp-json/udos-empire/v1/`)

| Route | Auth | Purpose |
|-------|------|---------|
| `GET /health` | public | Plugin liveness + version |
| `GET /contacts` | admin | List stored contacts |
| `GET /me/contact` | logged-in | Linked contact + link for current user |
| `POST /me/link` | logged-in | Body `{"contactId":"demo-contact-001"}` — link WP user |
| `PATCH /contacts/{id}` | admin or linked user | Update `displayName`, `consent.*` |
| `GET /links` | admin | List user-link rows |

On **activate**, the plugin seeds `demo-contact-001`, grants `udos_empire_access` to **subscriber** and **administrator**, and creates a published page slug **`empire-local-restricted`** using `[udos_empire_restricted]…[/udos_empire_restricted]`.

**Automated demo prep (monorepo):** from repo root, with Docker WordPress up (`npm run wp:up`), run **`npm run demo:wp-bootstrap`** then **`npm run demo:wp-link`** — see [../../docs/DEMO.md](../../docs/DEMO.md) § Steps 8–9.

**Privacy:** exporters/erasers register under Tools → Export/Erase personal data (eraser clears user meta contact id as a demo).

### Host event push (optional)

To append **`wp.contact_linked`** / **`wp.profile_updated`** to the uDOS Host event log, add to **`wp-config.php`** (above “That’s all, stop editing!”):

```php
define( 'UDOS_EMPIRE_HOST_URL', 'http://127.0.0.1:8787' );
// Same value as Host env UDOS_BRIDGE_SECRET:
define( 'UDOS_EMPIRE_BRIDGE_TOKEN', 'replace-with-a-long-random-secret' );
```

From **WordPress in Docker** to Host on the host machine, use `http://host.docker.internal:8787` for `UDOS_EMPIRE_HOST_URL`. If these constants are omitted, the plugin skips outbound calls (REST still works).
