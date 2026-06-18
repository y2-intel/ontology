---
name: extend-open-ontology
description: Action skill for data engineers extending an existing ontology without destabilizing core models, security boundaries, or downstream workflows.
type: action
platforms:
  - claude-code
  - codex
  - any
tags:
  - ontology
  - extension
  - interfaces
  - data-engineering
  - open-world
  - palantir-inspired
version: 1.0.0
implements:
  - ontology-workflow
parameters:
  - name: coreModel
    baseType: string
    description: Existing object type, interface, domain, or ontology module to extend.
    required: true
  - name: newCapability
    baseType: string
    description: New workflow, property group, integration, team need, or business capability.
    required: true
  - name: compatibilityConstraints
    baseType: array
    description: Existing consumers, permissions, APIs, actions, reports, or pipelines that must keep working.
    required: false
modifies:
  - ontology-interfaces
  - ontology-extension-types
  - ontology-actions
  - ontology-security-boundaries
commands:
  - name: extend-ontology
    description: Add a new capability to an existing ontology while preserving core invariants and compatibility.
    examples: "extend Customer with credit risk; add inspection workflows to assets"
  - name: design-extension-point
    description: Decide whether a new need belongs on the core type, a linked extension type, an interface, or a namespaced property set.
    examples: "should this field go on the core object; design an extension point for scheduling"
links:
  - forwardName: uses-workflow
    reverseName: implemented-by
    target: ontology-workflow
    cardinality: many-to-many
  - forwardName: validates-with
    reverseName: reviews
    target: review-ontology-antipatterns
    cardinality: many-to-many
  - forwardName: records-decisions-as
    reverseName: documents
    target: ontology-design-decision
    cardinality: many-to-many
---

Use this skill when an existing ontology must absorb new use cases without breaking stable core concepts. The default posture is open for extension and conservative about modifying core object types.

## Extension workflow

1. Identify the invariant core.
   - List properties and links that are fundamental to the entity.
   - Identify consumers that rely on the current shape.
   - Mark security-sensitive paths.

2. Classify the new capability.
   - Core semantic fact: belongs on the object only if most consumers would expect it.
   - Team-specific or workflow-specific fact: consider a linked extension object type.
   - Reusable behavior: create or implement an interface.
   - Relationship detail: use an object-backed link.
   - Derived convenience: derive from linked objects or stable pipeline output.

3. Choose the smallest compatible change.
   - Prefer linked extension types when only a subset of objects need the new capability.
   - Prefer interfaces when actions or functions should work across multiple object types.
   - Prefer namespaced property groups only when the ontology convention already supports them.
   - Modify the core type only when the field is essential, stable, and broadly useful.

4. Check security and ownership.
   - Confirm the extension does not widen access to restricted data.
   - Assign owner and steward for new source mappings, pipelines, and action rules.
   - Document row and column policy impacts.

5. Plan migration.
   - Add new types, links, or interfaces first.
   - Backfill data and provenance.
   - Dual-run old and new paths when needed.
   - Deprecate old fields or actions only after consumers migrate.

## Deliverable

Return:

- Extension classification.
- Proposed object types, interfaces, links, properties, and actions.
- Compatibility impact.
- Security impact.
- Migration and backfill plan.
- Decision record for why core modification was accepted or avoided.

## Guardrails

- Do not turn a stable entity into a god object for one team's workflow.
- Do not add sparse property clusters when a linked extension type would be clearer.
- Do not create deep inheritance chains for combinations of capabilities.
