---
name: design-open-ontology
description: Use this skill when designing or redesigning an open-world ontology from datasets, APIs, business workflows, and domain language; it helps identify domain objects, links, interfaces, actions, source mappings, and security boundaries.
---

Use this skill to create a first useful ontology that can grow without turning into a source-system mirror. Assume the world is open: new source systems, teams, properties, use cases, and security boundaries will arrive later.

## Design workflow

1. Frame the work around decisions and workflows.
   - Ask what people or agents must decide, monitor, predict, trigger, or improve.
   - Record the minimum viable ontology needed to serve those workflows.

2. Extract real-world concepts before mapping columns.
   - Identify entities such as Customer, Order, Facility, Asset, Shipment, Employee, Contract, Alert, or WorkOrder.
   - Identify events and observations separately from durable entities.
   - Split one source row into multiple object types when the row describes multiple real things.

3. Define identity and source precedence.
   - Pick stable primary keys.
   - Record natural keys, surrogate keys, source keys, and matching rules.
   - Define which source wins for conflicting facts and which facts require human review.

4. Curate properties.
   - Include properties with business value, operational value, or security value.
   - Exclude ingestion metadata, internal source-system fields, and "maybe useful later" clutter unless there is a named workflow.
   - Keep each fact in one semantic home; use derived properties for convenience when the source of truth lives elsewhere.

5. Model relationships.
   - Name links by domain relationship, not by join mechanism.
   - Use direct links for simple relationships.
   - Use object-backed links when the relationship has role, status, allocation, effective dates, source confidence, or other metadata.

6. Compose with interfaces.
   - Create focused interfaces such as Schedulable, Inspectable, Billable, Locatable, Assignable, or RiskBearing.
   - Prefer workflows over interfaces so actions and functions can work across object types.
   - Avoid deep inheritance trees and "combination" object types.

7. Choose the execution primitive.
   - Pipeline: cleanse, join, enrich, deduplicate, precompute stable facts.
   - Action: capture a business decision or bundle related edits.
   - Automation: respond to an object change without user polling.
   - Function: perform real-time traversal, decision support, or logic that needs live ontology context.

8. Design security from the domain.
   - Start restrictive and open deliberately.
   - Align row-level and column-level policy to real access boundaries.
   - Do not duplicate object types just to split access.

## Deliverable

Return:

- A candidate ontology diagram in text form.
- Object type definitions with keys, sources, properties, and purpose.
- Link definitions with names, cardinality, and metadata needs.
- Interface definitions and implementors.
- Pipeline/action/automation/function responsibilities.
- Source mapping with precedence and provenance.
- Anti-pattern checks and tradeoffs.
- A backlog of follow-up ontology decisions.

## Guardrails

- Do not model tables, API responses, or spreadsheet tabs as ontology types unless they are already real domain concepts.
- Do not add properties without a named workflow, analytic need, governance need, or security need.
- Do not change a core model for a niche use case when an extension object type, interface, or namespace can carry the new behavior.
