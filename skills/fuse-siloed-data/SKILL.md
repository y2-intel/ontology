---
name: fuse-siloed-data
description: Action skill for data engineers fusing siloed source systems into shared ontology object types with identity, provenance, and precedence rules.
type: action
platforms:
  - claude-code
  - codex
  - any
tags:
  - ontology
  - data-fusion
  - identity-resolution
  - data-engineering
  - source-systems
  - palantir-inspired
version: 1.0.0
implements:
  - ontology-workflow
parameters:
  - name: targetEntity
    baseType: string
    description: Real-world entity to unify, such as Customer, Employee, Asset, Vendor, or Facility.
    required: true
  - name: sourceSystems
    baseType: array
    description: Source systems, datasets, APIs, or tables that contain representations of the entity.
    required: true
  - name: candidateKeys
    baseType: array
    description: Candidate identifiers, matching keys, natural keys, or crosswalk tables.
    required: false
  - name: conflictPolicy
    baseType: string
    description: Known precedence, survivorship, or stewardship policy for conflicting values.
    required: false
modifies:
  - ontology-object-types
  - ontology-backing-datasets
  - ontology-source-mappings
commands:
  - name: fuse-silos
    description: Merge multiple source-system representations into one shared ontology entity.
    examples: "fuse HR badge and project employee data; unify customer records across CRM and billing"
  - name: resolve-identity
    description: Design identity resolution, source precedence, provenance, and exception handling for ontology objects.
    examples: "create matching rules for vendors; define source of truth for employee job title"
links:
  - forwardName: uses-workflow
    reverseName: implemented-by
    target: ontology-workflow
    cardinality: many-to-many
  - forwardName: feeds
    reverseName: receives
    target: design-open-ontology
    cardinality: many-to-many
  - forwardName: records-decisions-as
    reverseName: documents
    target: ontology-design-decision
    cardinality: many-to-many
---

Use this skill when the main problem is data silos: several systems describe the same real-world entity, but users need one operational object with trusted facts and linked provenance.

## Fusion workflow

1. Name the shared entity in domain language.
   - Prefer `Employee`, `Customer`, `Asset`, or `Facility` over `SalesforceAccount`, `HRPerson`, or `ERPVendor`.

2. Inventory source representations.
   - For each source, capture owner, update cadence, keys, required fields, freshness, quality issues, and governance constraints.
   - Classify each field as identity, business fact, operational state, source metadata, audit metadata, or relationship evidence.

3. Design identity resolution.
   - Use durable enterprise IDs when available.
   - Use crosswalks when source keys are stable but local.
   - Use deterministic matching for stable attributes.
   - Use probabilistic or stewarded matching for ambiguous entities.
   - Preserve source identifiers as provenance, not as separate object types.

4. Define survivorship and precedence.
   - Pick the authoritative source per property or property group.
   - Document fallback order, null handling, conflict detection, and manual-review paths.
   - Keep the raw source facts available for audit when needed, but expose the curated value as the ontology property.

5. Build the backing dataset shape.
   - One row per real-world entity.
   - Stable primary key.
   - Curated properties only.
   - Provenance fields or linked source-record objects for traceability.
   - Error or review queues for unresolved matches and conflicts.

6. Preserve meaningful source-specific detail.
   - Add linked extension object types when a source contains domain-specific detail that is not core to the shared entity.
   - Add interfaces when a subset of objects gains a reusable capability.
   - Do not fork the core entity by department or system.

7. Validate operations.
   - Confirm search, filtering, actions, security policies, and downstream datasets can use the fused object.
   - Confirm data engineers can trace each curated fact to source logic.

## Deliverable

Return:

- Unified object type proposal.
- Source inventory and field classification.
- Identity resolution strategy.
- Property-level source precedence table.
- Backing pipeline outline with match, merge, conflict, and publish stages.
- Provenance and audit approach.
- Exception handling queue or stewardship workflow.
- Anti-pattern risks: system silos, department silos, kitchen sink fields, and duplicated security types.

## Guardrails

- Do not create one object type per source system for the same real-world entity.
- Do not expose every source column as an ontology property.
- Do not hide conflict policy inside pipeline code only; document it as an ontology design decision.
