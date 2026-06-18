---
name: review-ontology-antipatterns
description: Use this skill when reviewing ontology artifacts for system silos, kitchen-sink fields, god objects, action sprawl, naming problems, security risks, or migration-safe remediation paths.
---

Use this skill in review mode. Lead with findings, risks, and concrete fixes that a data engineer can execute. Prefer small safe refactors that improve the model while preserving current users.

## Review rubric

Check for these anti-patterns:

- System silos: the same real entity exists once per source system.
- Department silos: each team has its own version of a shared entity.
- Kitchen sink objects: technical, audit, and unused source fields clutter the ontology.
- God objects: one object type represents several different entities or workflows.
- Golden hammer: actions, pipelines, functions, or automations are used for jobs better handled by another primitive.
- Action sprawl: many single-field update actions instead of cohesive business operations.
- Time machine modeling: versions, years, snapshots, or history are modeled as duplicate current-state objects.
- Misnomers: vague object, property, action, or link names that obscure domain meaning.

Check structural quality:

- Facts are stored in one semantic home.
- Derived properties are used for linked or dynamic values when appropriate.
- Denormalization is explicit, justified, and has a sync strategy.
- Structs group multi-field concepts such as address, geocoordinates, AI output with confidence, or source evidence.
- Links express domain relationships rather than foreign-key accidents.
- Object-backed links capture relationship metadata when needed.
- Interfaces capture reusable capabilities and prevent deep inheritance or combination types.
- Security boundaries follow the domain and use row and column controls instead of duplicated types.

## Finding format

For each finding, return:

- Severity: critical, high, medium, or low.
- Location: object type, property, link, action, interface, pipeline, or security policy.
- Symptom: what is visible in the current model.
- Risk: why it matters for users, agents, scale, security, or maintenance.
- Fix: concrete remediation.
- Migration path: how to change without breaking dependent workflows.

## Remediation approach

Prefer:

1. Rename unclear elements before they spread.
2. Merge duplicate source-specific object types into shared entities.
3. Move source clutter out of ontology properties and into backing data, provenance, or diagnostics.
4. Split god objects into durable entities, events, observations, and relationship objects.
5. Consolidate single-field actions into business operations.
6. Replace duplicated security object types with semantic row and column policy.
7. Add interfaces before adding combination object types.

## Guardrails

- Do not recommend a big-bang rewrite unless the current model is unusable and migration is cheaper than incremental repair.
- Do not remove provenance just because it should not be a first-class business property.
- Do not prioritize abstract purity over a working path to better data products.
