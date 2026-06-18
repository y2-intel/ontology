---
name: extend-open-ontology
description: Use this skill when extending an existing ontology with a new workflow, property group, integration, or team capability without destabilizing core models, permissions, or downstream consumers.
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
