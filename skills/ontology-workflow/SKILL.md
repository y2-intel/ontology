---
name: ontology-workflow
description: Use this skill as the shared workflow contract for ontology design, data fusion, anti-pattern review, extension planning, and decision documentation.
---

This interface defines the reusable contract for data-engineering skills that improve ontologies. Treat an ontology as a production data product: real-world entities, stable identities, meaningful links, curated properties, clear source precedence, and operational actions.

## Required workflow

Any skill implementing this interface must:

1. Start from the domain and use case, not from source table names.
2. Identify real-world entities, observations, events, and relationship objects.
3. Separate identity, source facts, derived facts, and workflow state.
4. Model semantic links, using object-backed link types when the relationship has metadata such as role, status, allocation, start date, or confidence.
5. Use interfaces for reusable capabilities and roles.
6. Choose the right execution primitive:
   - Pipelines for ingestion, cleansing, enrichment, joining, and aggregation.
   - Actions for human or agentic business decisions.
   - Automations for event-triggered reactions.
   - Functions for real-time traversal or logic that cannot be precomputed cleanly.
7. Document tradeoffs, especially denormalization, latency, source precedence, and security boundaries.
8. Validate the result against common anti-patterns before returning it.

## Output contract

Return artifacts that a data engineer can implement:

- Object types with purpose, primary key, backing source, and owner.
- Properties with source, semantic meaning, base type, and whether they are source, derived, or edit-backed.
- Links with forward and reverse names, cardinality, and whether they need a linking object.
- Interfaces and which object types implement them.
- Actions, automations, functions, or pipelines with clear responsibility boundaries.
- Security model aligned to domain boundaries.
- Open questions and irreversible decisions.

## Source inspiration

Use this as a general ontology/data-engineering workflow inspired by Palantir Foundry ontology guidance. It does not require Foundry-specific tooling.
