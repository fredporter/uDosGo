# Scope — uDOS v3.0.1

## In scope

### Host
- persistent local node
- mounted local storage
- local API
- job/execution runner
- event logger
- WordPress runtime support
- configuration/bootstrap scripts

### Hivemind
- feed intake
- classification
- task planning
- simple task state machine
- provider routing
- budget awareness
- event writing
- execution requests via Host

### ThinUI
- feed/inbox panel
- task queue / graph panel
- output/event panel
- manual action buttons
- local API connection

### WordPress localhost engine
- local user login
- restricted pages
- Empire contact ↔ WP user bridge
- profile/self-update pattern
- privacy/export/erase integration hooks

### Storage
- persistent vault/workspace path
- spool path
- event/log path
- wordpress path
- backups path

## Out of scope

- App Store packaging
- mobile apps
- full Apple sync engine
- public cloud deployment
- beacon/public Wi-Fi modes
- multisite WordPress
- full CRM campaign engine
- full MCP registry/browser
- plugin marketplace
- many-repo family split
- advanced autonomous swarm logic
- complete provider parity
- full publishing stack

## Scope discipline

If a feature does not directly improve the v3.0.1 demo loop, it should be deferred.

