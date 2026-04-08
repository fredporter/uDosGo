# Data Model — uDOS v3.0.1

## Storage layout

```text
/udos-data
  /vault
  /spool
  /events
  /exports
  /wordpress
  /backups
```

## Truth model

- `vault` = durable human-readable outputs
- `spool` = structured live / rolled-up machine state
- `events` = append-only event history
- `wordpress` = identity, privacy, local pages, linked user records
- `backups` = snapshot and recovery material

## Required schemas

### feed.schema.json
Represents an incoming item.

Suggested fields:
- `id`
- `source`
- `type`
- `title`
- `content`
- `status`
- `created_at`
- `tags`
- `linked_task_ids`

### task.schema.json
Represents an actionable work unit.

Suggested fields:
- `id`
- `feed_id`
- `title`
- `type`
- `status`
- `depends_on`
- `assigned_role`
- `provider_policy`
- `output_paths`
- `created_at`
- `updated_at`

### event.schema.json
Represents system actions and state changes.

Suggested fields:
- `id`
- `type`
- `actor`
- `entity_type`
- `entity_id`
- `message`
- `metadata`
- `timestamp`

### contact.schema.json
Empire-side contact record.

Suggested fields:
- `id`
- `display_name`
- `email`
- `tags`
- `notes`
- `linked_wp_user_id`
- `consent_state`
- `updated_at`

### user-link.schema.json
Maps an Empire contact to a WordPress user.

Suggested fields:
- `id`
- `contact_id`
- `wp_user_id`
- `link_type`
- `created_at`
- `updated_at`

### provider-policy.schema.json
Controls model/provider routing and budget.

Suggested fields:
- `default_provider`
- `cheap_provider`
- `premium_provider`
- `local_provider`
- `daily_budget`
- `per_task_limit`
- `routing_rules`

## Initial system roles

For v3.0.1, keep only:
- `scout`
- `planner`
- `maker`
- `reviewer`

## Initial task states

- `new`
- `ready`
- `blocked`
- `running`
- `done`
- `failed`
- `needs_review`

