# OpenOntology Core Spec Workspace

This directory is the working area for stable OpenOntology core specification text.

The current normative draft is [RFC-OO-0001](../../rfcs/0001-openontology-core.md). Until that RFC is accepted, this workspace should stay light and point to the RFC, context, schema, and examples that exercise the core model.

## Core artifacts

- RFC: `rfcs/0001-openontology-core.md`
- JSON-LD context: `contexts/core-v0.0.1.jsonld`
- JSON Schema: `schemas/openontology-core.schema.json`
- Example fixtures: `examples/customer-360/`

## Stabilization checklist

- Define every required OO-Core object.
- Validate every example with the JSON Schema.
- Add conformance language for required, recommended, and optional fields.
- Keep JSON-LD terms aligned with the JSON Schema.
- Add RDF and SHACL mappings only after the JSON shape is stable enough to avoid churn.
