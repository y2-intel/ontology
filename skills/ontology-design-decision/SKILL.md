---
name: ontology-design-decision
description: Use this skill when recording ontology design decisions, tradeoffs, identity or source-precedence choices, extension choices, denormalization decisions, or security implications.
---

Use this object skill to keep ontology design choices inspectable. Data engineers should be able to understand not just what model exists, but why it exists and how to change it safely.

## Decision template

```markdown
# Ontology Decision: <short title>

Decision ID:
Status:
Domain:
Owner:
Date:

## Context
What business workflow, source-system constraint, data quality issue, or security boundary forced the decision?

## Decision
What will the ontology do?

## Alternatives Considered
- Alternative:
  - Why rejected:

## Tradeoffs
- Benefit:
- Cost:
- Revisit trigger:

## Source Precedence
Which source wins for each affected fact? What is the fallback and conflict path?

## Security Impact
What row-level, column-level, or ownership policy changes are required?

## Migration
How will data, actions, functions, reports, and downstream users move safely?
```

## Use for

- Choosing a primary key or identity resolution strategy.
- Explaining why a source-specific type was merged into a shared object type.
- Justifying denormalization for scale or latency.
- Choosing object-backed links over direct links.
- Choosing an extension type or interface instead of modifying a core object.
- Recording security-boundary decisions before implementation.
