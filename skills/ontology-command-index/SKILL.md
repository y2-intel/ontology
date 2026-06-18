---
name: ontology-command-index
description: Skill that indexes ontology commands for data engineers so imported skills can be discovered, selected, and applied to improve data ontologies.
type: skill
platforms:
  - claude-code
  - codex
  - any
tags:
  - ontology
  - command-index
  - data-engineering
  - skill-discovery
  - palantir-inspired
version: 1.0.0
commands:
  - name: ontology-commands
    description: List importable ontology skills and the commands they expose for data-engineering workflows.
    examples: "show ontology commands; what skill should I use to improve this ontology"
  - name: choose-ontology-skill
    description: Select the right ontology skill for design, data fusion, anti-pattern review, extension, or decision recording.
    examples: "which ontology skill handles source silos; route this ontology task"
links:
  - forwardName: indexes
    reverseName: indexed-by
    target: design-open-ontology
    cardinality: one-to-many
  - forwardName: indexes
    reverseName: indexed-by
    target: fuse-siloed-data
    cardinality: one-to-many
  - forwardName: indexes
    reverseName: indexed-by
    target: review-ontology-antipatterns
    cardinality: one-to-many
  - forwardName: indexes
    reverseName: indexed-by
    target: extend-open-ontology
    cardinality: one-to-many
  - forwardName: indexes
    reverseName: indexed-by
    target: ontology-design-decision
    cardinality: one-to-many
---

Use this skill as the routing layer for the ontology skill pack. It helps an agent or data engineer pick the right workflow without reading every skill first.

## Command routing

- `design-ontology`: Use `design-open-ontology` for greenfield or major redesign work.
- `model-domain-entities`: Use `design-open-ontology` when source rows need to become real-world entities, events, observations, links, and interfaces.
- `fuse-silos`: Use `fuse-siloed-data` when several systems represent the same entity.
- `resolve-identity`: Use `fuse-siloed-data` for keys, matching, source precedence, and provenance.
- `review-ontology`: Use `review-ontology-antipatterns` for architecture review.
- `find-antipatterns`: Use `review-ontology-antipatterns` for targeted quality checks.
- `extend-ontology`: Use `extend-open-ontology` for adding a capability without breaking core models.
- `design-extension-point`: Use `extend-open-ontology` to choose between core field, extension object, interface, link, or namespace.
- `record-ontology-decision`: Use `ontology-design-decision` to document tradeoffs for later data engineers.

## Repo command

From the repo root, list the machine-readable command index:

```bash
node .claude/skills/run-skills/driver.mjs commands
```

Search for a domain or workflow:

```bash
node .claude/skills/run-skills/driver.mjs search "identity"
node .claude/skills/run-skills/driver.mjs search "anti-pattern"
node .claude/skills/run-skills/driver.mjs search "extension"
```

## Import guidance

When importing only a subset of skills for a data-engineering project:

1. Always include `ontology-workflow`.
2. Include `ontology-command-index` when users need discoverability.
3. Include one or more action skills for the actual work.
4. Include `ontology-design-decision` when decisions need to survive handoff.
