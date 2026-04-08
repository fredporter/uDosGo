# WordPress Bridge — uDOS v3.0.1

## Purpose

Use local WordPress as the identity, privacy, and restricted-page engine for the demo.

## Design rule

Do not turn every contact into a WordPress login account.

Use a two-tier model:

### Tier A — Empire contact
Canonical broader contact record.
- notes
- tags
- relationship context
- activity context
- preferred canonical record

### Tier B — WordPress user
Only used when the person needs:
- login
- profile update rights
- privacy/export/erase subject handling
- restricted page access
- self-service actions

## Bridge pattern

```text
Empire contact
    ↓ optional link
WordPress user
```

## v3.0.1 plugin target

`udos-empire-local`

## Plugin responsibilities

- create and maintain optional link between contact and WP user
- expose local integration helpers
- support profile/self-update fields
- support restricted local pages
- support privacy/export/erase bridge hooks
- provide basic local REST or action hooks for Host/Hivemind integration

## Required flows

### 1. Login flow
A local user signs in to WordPress and accesses a restricted page.

### 2. Profile update flow
A linked user updates selected fields and the bridge keeps the mapping intact.

### 3. Privacy flow
The local system can identify which records belong to a linked person for export/erase support.

### 4. Restricted page flow
ThinUI can link to a local page that is protected by WordPress login/capability rules.

## What stays out of v3.0.1

- full CRM UI inside WordPress
- campaign automation
- public site concerns
- multisite complexity
- broad third-party sync

