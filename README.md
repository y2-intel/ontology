# Ontology Skills and OpenOntology

Agent Skills for data engineers and AI coding agents working on open-world ontologies. This repo is also the Y2 incubation home for OpenOntology, a proposed open standard for observing, mapping, fusing, and evolving open-world data meaning across siloed systems.

OpenOntology is not a replacement for RDF, OWL, JSON-LD, SHACL, PROV-O, SKOS, DCAT, OpenLineage, or OpenTelemetry. It defines the operational semantic-fabric layer around them: source-model capture, semantic assertions, mapping evidence, identity links, unknown states, conflicts, drift, design decisions, and agent workflow contracts.

Status: Y2 incubation draft.

## OpenOntology Standard

Start here:

- [RFC-OO-0001: OpenOntology Core Specification](rfcs/0001-openontology-core.md)
- [OpenOntology incubation plan](docs/openontology-incubation-plan.md)
- [Core spec workspace](spec/core/README.md)
- [JSON-LD context 0.0.1](contexts/core-v0.0.1.jsonld)
- [JSON Schema](schemas/openontology-core.schema.json)
- [Customer 360 example fixtures](examples/customer-360)

Use this pack to model real-world objects, fuse siloed source systems, resolve identity, review ontology anti-patterns, extend stable core models, and record design decisions. Skills follow the [Agent Skills](https://agentskills.io/) format.

## Install

```bash
npx skills add y2-intel/ontology
```

Restart your agent after install so the new skills are discovered.

You do not need to clone this repo or run a local validator. Once installed, use the skills inside your AI coding agent.

## Use In Your Agent

Claude Code:

```text
/ontology show available ontology workflows
```

```text
/ontology design an ontology for customers, accounts, invoices, payments, and support tickets
```

Codex:

```text
@ontology show available ontology workflows
```

```text
@ontology fuse Salesforce and Stripe customer records into one ontology Customer object
```

## Skills

| Skill | Type | Use when |
|---|---|---|
| `design-open-ontology` | action | Designing a new ontology from source data, APIs, workflows, and domain language. |
| `fuse-siloed-data` | action | Unifying customers, employees, assets, vendors, facilities, or other entities across systems. |
| `review-ontology-antipatterns` | action | Finding system silos, kitchen-sink fields, god objects, action sprawl, weak naming, or migration risks. |
| `extend-open-ontology` | action | Adding capabilities without destabilizing core models, permissions, or downstream workflows. |
| `openontology-standard` | action | Drafting, reviewing, and extending OpenOntology RFCs, contexts, schemas, examples, semantic conventions, and conformance levels. |
| `use-openontology` | action | Mapping source artifacts, records, fields, and existing terms into OpenOntology 0.0.1 artifacts, or extending and using compliant examples. |
| `ontology` | skill | Discovering this pack's prompt surface or routing a task to the right ontology workflow. |
| `ontology-design-decision` | object | Recording identity, denormalization, object-backed link, extension point, or source-of-truth decisions. |
| `ontology-workflow` | interface | Keeping ontology design, fusion, review, and extension skills aligned to the shared workflow contract. |

## What You Can Ask For

Use `/ontology` in Claude Code or `@ontology` in Codex with requests like:

```text
/ontology review this ontology export for anti-patterns and give data engineers a refactor plan
```

```text
@ontology extend Asset with inspection workflows without turning Asset into a god object
```

```text
/ontology record the design decision for why HR is authoritative for employee job title
```

## What It Covers

- Choose the right ontology workflow for a request.
- Design a new ontology from domain language, source data, and workflows.
- Model source rows as real-world entities, events, observations, links, and interfaces.
- Fuse siloed source systems into shared ontology objects with identity resolution.
- Review ontology artifacts for anti-patterns and migration-safe fixes.
- Extend core models without creating god objects or breaking consumers.
- Record ontology decisions, tradeoffs, source precedence, and security impacts.
- Draft and evolve OpenOntology standard artifacts using RFC-style conformance language.
- Map and package real source systems into OpenOntology 0.0.1 artifacts without relying on an unreserved public namespace.
