---
name: ontology-design-decision
description: Object skill for recording ontology design decisions, tradeoffs, source precedence, extension choices, and security implications for data engineers.
type: object
platforms:
  - claude-code
  - codex
  - any
tags:
  - ontology
  - decision-record
  - documentation
  - governance
  - data-engineering
version: 1.0.0
properties:
  - name: decisionId
    baseType: string
    description: Stable identifier for the ontology decision.
    primaryKey: true
  - name: domain
    baseType: string
    description: Domain, object type, interface, link, action, or pipeline affected by the decision.
    primaryKey: false
  - name: context
    baseType: string
    description: Business and technical context that forced the decision.
    primaryKey: false
  - name: decision
    baseType: string
    description: Chosen ontology design direction.
    primaryKey: false
  - name: alternatives
    baseType: array
    description: Plausible alternatives that were rejected.
    primaryKey: false
  - name: tradeoffs
    baseType: array
    description: Consequences, risks, performance concerns, and maintenance costs.
    primaryKey: false
  - name: securityImpact
    baseType: string
    description: Row-level, column-level, ownership, or access-control impact.
    primaryKey: false
  - name: sourcePrecedence
    baseType: string
    description: Authoritative source and fallback rules affected by the decision.
    primaryKey: false
  - name: status
    baseType: string
    description: Proposed, accepted, implemented, deprecated, or superseded.
    primaryKey: false
commands:
  - name: record-ontology-decision
    description: Create a compact decision record for an ontology model, data fusion, extension, or refactor choice.
    examples: "record why HR wins job title; document why we used an object-backed link"
links:
  - forwardName: documents
    reverseName: documented-by
    target: design-open-ontology
    cardinality: many-to-many
  - forwardName: documents
    reverseName: documented-by
    target: fuse-siloed-data
    cardinality: many-to-many
  - forwardName: documents
    reverseName: documented-by
    target: extend-open-ontology
    cardinality: many-to-many
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
