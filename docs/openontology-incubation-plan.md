# OpenOntology Incubation Plan

This plan turns the current ontology skill pack into an incubator for a public OpenOntology standard.

## Positioning

OpenOntology should standardize the operational semantic-fabric layer around existing standards. It should not compete with RDF, OWL, JSON-LD, SHACL, PROV-O, SKOS, DCAT, OpenLineage, or OpenTelemetry.

The OpenTelemetry pattern to borrow is the combination of:

- Portable specification.
- RFC-style conformance language.
- Semantic conventions.
- Conformance levels.
- Reference examples and validators.
- Governance that lets the ecosystem grow beyond one vendor or repo.

## Repository tracks

| Track | Purpose | First artifacts |
|---|---|---|
| RFCs | Human-readable normative proposals. | `rfcs/0001-openontology-core.md`, then RFC-OO-0002 and RFC-OO-0003. |
| Spec | Stable edited specification text after RFC iteration. | `spec/core/README.md`, then conformance and semantic-convention pages. |
| Contexts | JSON-LD contexts for interoperability. | `contexts/core-v0.0.1.jsonld`. |
| Schemas | Machine-readable validation for JSON implementations. | `schemas/openontology-core.schema.json`. |
| Shapes | RDF/SHACL validation profile. | Add after core terms stabilize. |
| Examples | Concrete interoperable assertions. | `examples/customer-360/mapping-assertion.jsonld`. |
| Skills | Agent workflows that apply and extend the standard. | Add `openontology-standard` and align existing skills to conformance outputs. |
| Governance | Charter, contribution rules, release process, and compatibility policy. | Add after RFC-OO-0001 review starts. |
| Reference tooling | CLI, validator, collector, and exporters. | Add after schema and context stabilize. |

## First three RFCs

1. RFC-OO-0001: OpenOntology Core Specification.
   Defines the object model, assertion envelope, evidence, provenance, unknown states, lifecycle, security, versioning, and conformance levels.

2. RFC-OO-0002: OpenOntology Semantic Conventions.
   Defines standard names for ontology fabric attributes, source artifacts, mappings, evidence, identity links, conflicts, drift, lifecycle metrics, and agent review events.

3. RFC-OO-0003: OpenOntology Agent Workflow Contract.
   Defines how AI coding agents propose mappings, record design decisions, extend ontologies, review anti-patterns, and separate proposed assertions from human-approved assertions.

## Skill scaling plan

| Skill | Current job | OpenOntology alignment |
|---|---|---|
| `ontology` | Route ontology requests to the right workflow. | Route standard, RFC, schema, context, and conformance work to `openontology-standard`. |
| `openontology-standard` | Draft and review standard artifacts. | Own RFC-style language, standard boundaries, conformance impact, examples, and machine-readable artifact updates. |
| `design-open-ontology` | Design new open-world ontologies. | Return OO-Core objects: SourceArtifact, OntologyTerm, MappingAssertion, EvidenceRecord, ProvenanceRecord, UnknownState. |
| `fuse-siloed-data` | Resolve identity and source precedence. | Return OO-Fusion identity assertions, survivorship rules, conflict handling, and scoped equivalence. |
| `review-ontology-antipatterns` | Find ontology design risks. | Report risks against OpenOntology conformance and semantic-fabric anti-patterns. |
| `extend-open-ontology` | Add capabilities without destabilizing core models. | Record extension decisions as SemanticDecision objects and preserve compatibility. |
| `ontology-design-decision` | Document design choices. | Become the practical authoring surface for SemanticDecision records. |
| `ontology-workflow` | Shared workflow contract. | Keep output artifacts aligned to OpenOntology conformance levels. |

## Phases

### Phase 0: Seed

- Commit RFC-OO-0001.
- Add the first JSON-LD context, JSON Schema, and example assertion.
- Add the `openontology-standard` skill.
- Update README so OpenOntology and the skill pack reinforce each other.

### Phase 1: Make the core testable

- Expand schema coverage for all OO-Core objects.
- Add fixture examples for customer 360, HR and IT asset, and data product catalog.
- Add a local validator script that checks schema validity and required conformance fields.
- Add CI or a repo-local validation script for examples.

### Phase 2: Define conventions and agent contracts

- Draft RFC-OO-0002 semantic conventions.
- Draft RFC-OO-0003 agent workflow contract.
- Update each skill to emit standard-shaped outputs when requested.
- Add anti-pattern checks that detect violations of OpenOntology norms.

### Phase 3: Interoperate

- Add RDF export notes and SHACL shapes for OO-RDF.
- Add mappings to PROV-O, SKOS, DCAT, OpenLineage, and OpenTelemetry attributes.
- Add reference collector or CLI prototypes.
- Publish governance, release, and compatibility policies.

## Near-term backlog

- Decide when to reserve a public namespace and who controls it.
- Draft RFC-OO-0002 with metric and attribute names.
- Draft RFC-OO-0003 with exact agent proposal and review gates.
- Add a validator script for JSON examples.
- Add `governance/charter.md` before inviting external contributors.
- Add `shapes/openontology-core.shacl.ttl` once the JSON Schema stops moving quickly.
