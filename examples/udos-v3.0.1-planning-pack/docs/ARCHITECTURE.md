# uDOS v3.0.1 Architecture

## One-line definition

uDOS v3.0.1 is a local-first orchestration demo where ThinUI submits and inspects work, Hivemind plans it, Host executes it, WordPress handles identity/privacy/restricted local pages, and all outputs persist to a mounted vault/workspace.

## System shape

```text
[ ThinUI ]
  visual control + graph + logs

      ↓

[ Hivemind ]
  classify + plan + route + review

      ↓

[ Host ]
  local API + execution + storage + WordPress runtime

      ↓

[ WordPress ]
  users + privacy + restricted pages + empire bridge

      ↓

[ Persistent Storage ]
  vault + spool + events + wordpress + backups
```

## Design rules

1. Keep the system local-first.
2. Keep the demo mechanical and inspectable.
3. Separate orchestration from execution.
4. Use WordPress as the local identity/privacy engine, not as the whole platform.
5. Treat the vault and event log as durable system truth.
6. Keep the scope narrow enough to ship a real working demo.

## Module boundaries

### ThinUI
Responsibilities:
- render feed/inbox items
- show task queue / graph
- show outputs and event log
- provide manual controls
- link to selected local WordPress pages where needed

Non-responsibilities:
- core execution
- provider routing logic
- direct filesystem ownership

### Hivemind
Responsibilities:
- intake and classify feed items
- create and update tasks
- manage simple role-based orchestration
- choose provider/model by policy
- emit events
- request execution from Host

Non-responsibilities:
- direct execution of system tools
- direct ownership of persistent storage
- frontend rendering

### Host
Responsibilities:
- run the local API
- own storage paths
- run execution jobs safely
- manage background services for the demo
- launch and connect to local WordPress
- write logs/events
- expose health/status info

Non-responsibilities:
- long-term product-level UI
- assistant planning logic

### WordPress localhost engine
Responsibilities:
- local login and sessions
- restricted local pages
- privacy and account update flows
- linked Empire contact / WP user data bridge

Non-responsibilities:
- orchestration runtime
- vault ownership
- general-purpose workflow planner

## Gold-path request flow

```text
1. User submits item in ThinUI
2. ThinUI sends item to Host API
3. Host stores feed item and forwards orchestration request
4. Hivemind classifies the item
5. Hivemind creates tasks
6. Host executes task steps requested by Hivemind
7. Outputs are written to vault / spool / events
8. ThinUI refreshes task and output state
9. WordPress-linked records update if needed
```

## Working demo focus

The architecture must support exactly one clear loop:
- intake
- classify
- plan
- execute
- persist
- inspect

Everything else is future work.

