# Demo — uDOS v3.0.1

## Demo purpose

Show one complete local-first system loop end-to-end.

## Demo scenario

User submits a request such as:

> Research this topic, create a markdown note, extract 3 tasks, and save everything locally.

Accepted input forms:
- pasted URL
- pasted note
- short plain-language request

## Visible system flow

```text
User input
→ Feed item created
→ Hivemind classifies request
→ Hivemind creates tasks
→ Host executes steps
→ markdown note written to vault
→ tasks written to task store
→ event log updated
→ ThinUI shows outputs and status
```

## Required visible outputs

- one created markdown file
- one generated task set
- one event trail
- one provider/budget summary
- one inspectable queue/graph state
- one restricted local page/login path in WordPress

## Demo panels

### 1. Feed / Inbox
Shows:
- incoming item
- source
- summary
- send to planner action

### 2. Task Queue / Graph
Shows:
- ready
- blocked
- running
- done
- manual retry or approve

### 3. Outputs / Events
Shows:
- created files
- execution steps
- errors
- provider used
- budget consumed

## Demo script

1. Start Host and WordPress locally.
2. Open ThinUI.
3. Submit one input item.
4. Watch the feed item appear.
5. Run planning.
6. Watch task creation.
7. Run execution.
8. Inspect generated vault note.
9. Inspect task queue and events.
10. Open linked restricted local page / user record flow.

## Definition of a successful demo

The system is understandable to a new viewer in under three minutes and visibly performs a real local workflow.

