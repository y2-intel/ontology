---
name: ontology
description: Use this skill when a user invokes /ontology or @ontology, asks to design, review, fuse, extend, or document an ontology, or needs help choosing the right ontology workflow.
---

Use this skill as the routing layer for the ontology skill pack. It helps an agent or data engineer pick the right workflow without reading every specialized skill first.

## Prompt intent routing

- `design-ontology`: Use `design-open-ontology` for greenfield or major redesign work.
- `model-domain-entities`: Use `design-open-ontology` when source rows need to become real-world entities, events, observations, links, and interfaces.
- `fuse-silos`: Use `fuse-siloed-data` when several systems represent the same entity.
- `resolve-identity`: Use `fuse-siloed-data` for keys, matching, source precedence, and provenance.
- `review-ontology`: Use `review-ontology-antipatterns` for architecture review.
- `find-antipatterns`: Use `review-ontology-antipatterns` for targeted quality checks.
- `extend-ontology`: Use `extend-open-ontology` for adding a capability without breaking core models.
- `design-extension-point`: Use `extend-open-ontology` to choose between core field, extension object, interface, link, or namespace.
- `record-ontology-decision`: Use `ontology-design-decision` to document tradeoffs for later data engineers.

## Response guidance

When the user asks a broad ontology question, choose the nearest workflow and say which one you are using. If the request spans multiple workflows, start with `ontology-workflow`, then call out the specialized workflow sections that matter.

When the user asks to list available ontology capabilities, summarize the prompt intents above and show one short example for Claude Code (`/ontology ...`) and Codex (`@ontology ...`).
