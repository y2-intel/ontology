---
name: ontology
description: Use this skill when a user invokes /ontology or @ontology, asks to design, review, fuse, extend, or document an ontology, or needs help choosing the right ontology workflow.
---

Use this skill as the routing layer for the ontology skill pack. It helps an agent or data engineer pick the right workflow without reading every specialized skill first.

## Prompt intent routing

- `design-ontology`: Use `design-open-ontology` for greenfield or major redesign work.
- `model-domain-entities`: Use `design-open-ontology` when source rows need to become real-world entities, events, observations, links, and interfaces.
- `fuse-silos`: Use `fuse-siloed-data` when several systems represent the same entity.
- `resolve-identity`: Use `fuse-siloed-data` for keys, matching, source precedence, and provenance.
- `review-ontology`: Use `review-ontology-antipatterns` for architecture review.
- `find-antipatterns`: Use `review-ontology-antipatterns` for targeted quality checks.
- `extend-ontology`: Use `extend-open-ontology` for adding a capability without breaking core models.
- `design-extension-point`: Use `extend-open-ontology` to choose between core field, extension object, interface, link, or namespace.
- `record-ontology-decision`: Use `ontology-design-decision` to document tradeoffs for later data engineers.
- `draft-openontology-standard`: Use `openontology-standard` for OpenOntology RFCs, semantic conventions, conformance, JSON-LD contexts, schemas, examples, governance, validators, and agent workflow contracts.
- `review-openontology-standard`: Use `openontology-standard` when checking whether standard artifacts preserve the OpenOntology boundary around RDF, OWL, JSON-LD, SHACL, PROV-O, SKOS, DCAT, OpenLineage, and OpenTelemetry.
- `use-openontology`: Use `use-openontology` when mapping source schemas, fields, records, source artifacts, existing terms, or catalogs into OpenOntology 0.0.1 JSON-LD, assertions, identity links, evidence, provenance, examples, or compatible extensions.

## Response guidance

When the user asks a broad ontology question, choose the nearest workflow and say which one you are using. If the request spans multiple workflows, start with `ontology-workflow`, then call out the specialized workflow sections that matter.

When the user asks about OpenOntology as a public standard, choose `openontology-standard` before ontology modeling skills. If the request includes both standard work and domain modeling, use `openontology-standard` for conformance and artifact shape, then use the domain workflow for the model.

When the user asks to map real systems into OpenOntology, generate OpenOntology fixtures, or use the current draft in an implementation, choose `use-openontology` before standard-editing skills.

When the user asks to list available ontology capabilities, summarize the prompt intents above and show one short example for Claude Code (`/ontology ...`) and Codex (`@ontology ...`).
