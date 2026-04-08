# Milestones — uDOS v3.0.1

## Milestone 1 — Foundation

Goals:
- monorepo scaffold created
- local storage layout defined
- Host starts locally
- ThinUI shell loads
- WordPress starts locally
- core schemas drafted

Checklist:
- [ ] create monorepo structure
- [ ] define `/udos-data` paths
- [ ] implement Host startup command
- [ ] implement ThinUI shell view
- [ ] boot local WordPress instance
- [ ] draft feed/task/event schemas

## Milestone 2 — Local loop

Goals:
- feed item submission works
- Hivemind creates tasks
- Host runs a simple task
- events are written
- ThinUI shows outputs

Checklist:
- [ ] create feed intake endpoint
- [ ] create planner loop
- [ ] create task state machine
- [ ] implement one execution action
- [ ] persist one markdown output
- [ ] show task/output/event panels in ThinUI

## Milestone 3 — WordPress bridge

Goals:
- local login works
- one restricted page works
- Empire contact links to WP user
- update/privacy path is defined

Checklist:
- [ ] create `udos-empire-local` plugin scaffold
- [ ] define contact ↔ user link model
- [ ] implement restricted page prototype
- [ ] implement basic profile update flow
- [ ] wire privacy/export/erase integration stubs

## Milestone 4 — Demo polish

Goals:
- sample data seeded
- demo script works cleanly
- docs are written
- repo is PR/demo ready

Checklist:
- [ ] add sample input set
- [ ] add sample workspace outputs
- [ ] write README and demo docs
- [ ] capture screenshots
- [ ] validate end-to-end demo flow

## Definition of done

v3.0.1 is complete when someone can start the stack locally, submit one item, observe planning and execution, see outputs persisted, and access one linked restricted local WordPress flow.

