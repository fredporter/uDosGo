# WordPress bridge — Empire ↔ `udos-empire-local` (v3.0.1)

## Role of WordPress in the demo

WordPress is the **local identity, privacy, and restricted-content engine**, not “just a blog.”

Host **owns** provisioning paths and lifecycle; WordPress **owns** auth sessions, capabilities, and WP-native content.

---

## Plugin: `udos-empire-local`

Single plugin target for v3.0.1.

### Responsibilities

- **Contact record bridge** — store/link Empire contact identifiers with WP data where needed.
- **Optional WP_User link** — only when login, privacy subject, or self-service is required.
- **Profile / self-service fields** — e.g. preferences, consent flags, contact detail updates (minimal set).
- **Restricted page helpers** — shortcodes/blocks or templates for “local network” views; gate by capability.
- **Privacy export / erase** — register exporters and erasers for plugin-held personal data (stub or full).
- **REST endpoints** — small, versioned namespace, e.g. `/wp-json/udos-empire/v1/...` for Host/ThinUI.

### Non-responsibilities

- Owning the task graph, spool files, or vault layout (Host remains SoR for those).
- Replacing Empire CRM depth (no full campaign engine in v3.0.1).

---

## Two-tier model (locked)

### Tier A — `WP_User` (participants who need identity)

Use when the person needs:

- Login and session
- Profile updates
- Privacy export/erasure as a **data subject**
- Access to **restricted** local pages
- Self-service flows

### Tier B — `EmpireContact` (canonical broader record)

- Canonical contact record for CRM-style data: tags, notes, relationships, activity references (as needed for demo).
- **Not** every contact becomes a WP user on day one.

### Link

`user-link.schema.json` expresses optional linkage:

- `contactId` → Empire contact id
- `wpUserId` → numeric WP user id (or login slug + id in payload)
- `status` — `linked` | `pending` | `revoked`
- `reason` — optional audit string

---

## Auth patterns

- **Browser:** cookie session via WP login for restricted pages.
- **Machine clients:** [Application Passwords](https://wordpress.org/documentation/article/application-passwords/) or equivalent for Host → WP REST (document in Host config; never commit secrets).

---

## Restricted pages (v3.0.1)

Minimum demo:

- One **private page** (or logged-in-only) e.g. “Local Empire — self-service” or “Demo restricted dashboard.”
- Capability e.g. `read` for `subscriber` or custom capability `udos_empire_access` granted to demo role.

ThinUI may deep-link to this page for “open in WP” actions.

---

## Privacy (v3.0.1)

Minimum expectations:

- Register **personal data exporters** for plugin fields that contain PII.
- Register **erasers** or document anonymization strategy for those fields.
- Align privacy policy text placeholder with plugin data (copy can live in demo docs).

Full legal compliance is out of scope; **hooks and design** are in scope.

---

## Sync direction

- **Host / Hivemind** may push/pull **minimal** contact state via REST (e.g. link user, update consent flag).
- Avoid bi-directional full CRM sync in v3.0.1; prove **one** clear link + **one** self-service update path.

---

## Source layout

Plugin source lives in monorepo at:

`apps/wordpress-plugin-empire-local/`

Deployment: symlink, copy, or volume mount into `wp-content/plugins/udos-empire-local/` under the Host-managed WordPress tree.
