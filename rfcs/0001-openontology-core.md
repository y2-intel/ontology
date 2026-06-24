# RFC-OO-0001: OpenOntology Core Specification

**Status:** Draft v0.0.1
**Date:** 2026-06-23
**Sponsor / Incubator:** Y2 Intelligence, proposed
**Editors:** OpenOntology contributors
**Intended audience:** data platform builders, ontology engineers, AI-agent builders, knowledge graph teams, data catalog vendors, lineage vendors, semantic web practitioners, enterprise architects
**License recommendation:** CC-BY-4.0 for specifications and examples; Apache-2.0 for reference code and schemas

---

## 0. Abstract

OpenOntology is a proposed open specification for building, exchanging, observing, and evolving **open-world ontology fabrics** across siloed data systems.

Modern organizations rarely operate with one clean canonical schema. They operate with many overlapping source systems, partially duplicated entities, inconsistent naming, vendor-specific fields, implicit business rules, and models that drift as the business changes. OpenOntology standardizes the operational layer required to map, fuse, validate, enrich, and govern these fragmented models without forcing all systems into one rigid master schema.

OpenOntology does **not** replace RDF, OWL, JSON-LD, SHACL, PROV-O, SKOS, DCAT, OpenLineage, OpenTelemetry, data catalogs, graph databases, lakehouses, warehouses, or application schemas. It defines a practical interoperability standard above and around them:

1. A common envelope for semantic assertions, mappings, identity links, provenance, conflicts, unknowns, and ontology-change events.
2. A required set of semantic conventions for source models, ontology terms, mappings, evidence, confidence, lineage, drift, and decisions.
3. A conformance model for tools that design, ingest, validate, fuse, enrich, publish, or consume ontology fabrics.
4. A reference operating model for AI coding agents that participate in ontology design and data-fusion workflows.

OpenTelemetry made observability portable for distributed software systems. OpenOntology aims to make meaning portable for distributed data systems.

---

## 1. Motivation

Organizations need a standard way to answer questions such as:

- What does this column, API field, event attribute, dashboard metric, or document concept mean?
- Which source systems use different names for the same real-world concept?
- Which concepts are only partially equivalent?
- Which source is authoritative for a property in a given scope and time range?
- Which identity links are accepted, rejected, candidate, or disputed?
- Which mappings are backed by evidence, and which were guessed by a model or agent?
- Which ontology terms changed, who approved the change, and what downstream systems may be affected?
- What is unknown, unmapped, withheld, not applicable, or contradictory?

Current tooling handles pieces of this problem:

- RDF and OWL provide graph-based representation and formal ontology semantics.
- JSON-LD provides a JSON-compatible linked-data serialization.
- SHACL validates RDF data graphs against shape graphs.
- PROV-O represents provenance across systems and contexts.
- SKOS represents thesauri, taxonomies, classification schemes, and similar knowledge organization systems.
- DCAT describes datasets and catalogs.
- OpenLineage captures operational lineage around datasets, jobs, and runs.
- OpenTelemetry standardizes telemetry signals and semantic conventions for distributed systems.

OpenOntology's gap is the **operational semantic fabric**: a standard way for humans, tools, and agents to record, exchange, observe, compare, and evolve semantic meaning across source systems over time.

---

## 2. Design Principles

### 2.1 Open-world by default

OpenOntology assumes that source models and ontology fabrics are incomplete. Absence of a statement MUST NOT be interpreted as proof of falsehood unless a closed-world profile explicitly says so.

### 2.2 Preserve source meaning

OpenOntology MUST preserve source artifacts and source labels. It MUST NOT require destructive harmonization into a single master schema.

### 2.3 Mappings are claims, not magic

A mapping, equivalence, identity link, transformation, or source-of-truth decision is an assertion. Assertions MUST be inspectable, versioned, scoped, and supported by provenance.

### 2.4 Evidence before confidence

A confidence score without evidence is not interoperable. Confidence MAY be included, but mapping and fusion assertions SHOULD include evidence records and MUST identify the method that produced confidence when confidence is present.

### 2.5 Scoped truth

Source authority, equivalence, identity, and constraints are often true only for a domain, tenant, jurisdiction, time range, source, workflow, or purpose. OpenOntology MUST support scoped assertions.

### 2.6 Stable core, extensible edges

OpenOntology SHOULD encourage stable core concepts and domain-specific extensions. Extensions MUST NOT break existing consumers when introduced correctly.

### 2.7 Agent-readable and human-reviewable

Ontology design decisions MUST be serializable for machines and readable by humans. AI agents MAY propose ontology changes, mappings, or fusions, but agent-originated assertions SHOULD remain distinguishable from human-approved assertions.

### 2.8 Standards-first reuse

OpenOntology SHOULD reuse existing standards wherever possible. It standardizes the operational glue: source capture, semantic conventions, evidence, assertions, unknowns, conflicts, drift, and agent workflow contracts.

---

## 3. Normative Language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in BCP 14, RFC 2119, and RFC 8174 when, and only when, they appear in all capitals.

---

## 4. Scope

### 4.1 In scope

OpenOntology specifies:

- A core data model for ontology-fabric artifacts.
- JSON-LD-compatible interchange envelopes.
- Semantic conventions for common ontology and data-fusion concepts.
- Provenance and evidence requirements for semantic assertions.
- Mapping, equivalence, identity, transformation, conflict, and source-authority assertions.
- Unknown and incomplete-state representation.
- Versioning, status, lifecycle, and deprecation semantics.
- Semantic drift and semantic observability events.
- Conformance levels for implementations.
- Agent workflow contracts for ontology design and review.
- Registry and governance recommendations.

### 4.2 Out of scope

OpenOntology does not specify:

- A required graph database.
- A required reasoning engine.
- A universal top-level ontology.
- A universal enterprise data model.
- A required data warehouse, lakehouse, catalog, or messaging system.
- A replacement for RDF, OWL, SHACL, PROV-O, SKOS, DCAT, OpenLineage, or OpenTelemetry.
- A mandated confidence algorithm.
- A mandated identity-resolution algorithm.

---

## 5. Relationship to Adjacent Standards

| Standard | OpenOntology relationship |
|---|---|
| RDF | RDF is a graph data model. OpenOntology objects SHOULD be convertible to RDF graphs. |
| OWL | OWL provides formal ontology semantics. OpenOntology MAY use OWL for classes, properties, restrictions, and reasoning profiles. |
| JSON-LD | OpenOntology's primary interchange envelope SHOULD be JSON-LD-compatible. |
| SHACL | OpenOntology SHOULD publish SHACL shapes for validating OpenOntology RDF graphs and profiles. |
| PROV-O | OpenOntology SHOULD use or map to PROV-O for provenance records. |
| SKOS | OpenOntology SHOULD use SKOS-style matching concepts where appropriate for taxonomies, controlled vocabularies, broader/narrower concepts, and related matches. |
| DCAT | OpenOntology SHOULD reference DCAT concepts when describing datasets, catalogs, and distributions. |
| OpenLineage | OpenOntology SHOULD interoperate with OpenLineage for dataset/job/run lineage and may attach semantic assertions to OpenLineage entities. |
| OpenTelemetry | OpenOntology borrows the idea of semantic conventions and operational signals, but it is not telemetry for services. It is a semantic-fabric standard. OpenOntology operations MAY emit OpenTelemetry logs, traces, or metrics. |
| Schema.org | OpenOntology MAY map public-facing concepts to Schema.org terms where appropriate. |

---

## 6. Conceptual Architecture

OpenOntology defines five layers.

### 6.1 Source Model Capture Layer

Captures original schemas and artifacts from systems such as databases, APIs, event streams, files, data catalogs, ERDs, dashboards, notebooks, documents, and code.

Examples:

- SQL table: `salesforce.account`
- Column: `salesforce.account.industry`
- API field: `stripe.Customer.email`
- Event attribute: `order.created.customer_id`
- Dashboard metric: `monthly_active_accounts`
- Code symbol: `CustomerBillingProfile`

### 6.2 Semantic Assertion Layer

Records claims about meaning.

Examples:

- `salesforce.account` maps to `oo:OrganizationAccount`
- `stripe.Customer.email` maps to `oo:ContactPoint.emailAddress`
- `crm.Customer` is broader than `billing.Customer`
- `employee.manager_id` represents an organizational reporting relation
- `sourceA.customer_id` and `sourceB.external_customer_ref` are candidate identity keys

### 6.3 Evidence and Provenance Layer

Records why a claim exists, who or what produced it, when it was produced, what sources were used, and what confidence or review status applies.

Examples of evidence:

- source schema names
- data profiles
- example values
- foreign-key relationships
- constraints
- code references
- lineage paths
- human approvals
- steward comments
- LLM-generated suggestions
- benchmark or evaluation outputs

### 6.4 Semantic Operations Layer

Records operational events and metrics about ontology evolution.

Examples:

- source schema discovered
- source field added
- mapping proposed
- mapping accepted
- mapping rejected
- identity link created
- identity conflict detected
- ontology term deprecated
- mapping coverage changed
- source model drift detected

### 6.5 Agent Context Layer

Packages ontology instructions, stable concepts, extension rules, anti-pattern checks, source-authority policies, and design decisions for AI agents and coding agents.

---

## 7. Core Data Model

### 7.1 OntologyFabric

An `OntologyFabric` is a versioned collection of source models, ontology terms, assertions, constraints, provenance records, semantic events, and decision records.

Required fields:

- `@id`
- `@type = oo:OntologyFabric`
- `oo.fabric.id`
- `oo.fabric.name`
- `oo.fabric.version`
- `oo.created_at`
- `oo.updated_at`

Recommended fields:

- `oo.description`
- `oo.owner`
- `oo.license`
- `oo.namespaces`
- `oo.default_open_world_policy`
- `oo.conformance_level`

### 7.2 Namespace

A `Namespace` defines a controlled prefix and IRI base for terms.

Required fields:

- `oo.namespace.prefix`
- `oo.namespace.iri_base`
- `oo.namespace.owner`
- `oo.namespace.status`

Namespace status values:

- `experimental`
- `active`
- `stable`
- `deprecated`
- `retired`

### 7.3 SourceArtifact

A `SourceArtifact` represents an original model artifact from a source system.

Source artifact types:

- `database`
- `schema`
- `table`
- `column`
- `api`
- `endpoint`
- `field`
- `event_stream`
- `event_type`
- `event_attribute`
- `file`
- `document`
- `metric`
- `dashboard`
- `code_symbol`
- `lineage_dataset`
- `lineage_job`
- `lineage_run`

Required fields:

- `@id`
- `@type = oo:SourceArtifact`
- `oo.source.system`
- `oo.source.artifact.type`
- `oo.source.artifact.name`
- `oo.source.artifact.path`

Recommended fields:

- `oo.source.owner`
- `oo.source.environment`
- `oo.source.version`
- `oo.source.extracted_at`
- `oo.source.native_type`
- `oo.source.sample_values_redacted`
- `oo.source.constraints`
- `oo.source.lineage_ref`

### 7.4 OntologyTerm

An `OntologyTerm` is a named concept, property, relationship, event, observation, role, trait, interface, constraint profile, or policy.

Term kinds:

- `class`
- `property`
- `relationship`
- `event`
- `observation`
- `role`
- `trait`
- `interface`
- `constraint_profile`
- `policy`
- `unit`
- `enumeration`
- `enumeration_value`

Required fields:

- `@id`
- `@type = oo:OntologyTerm`
- `oo.term.kind`
- `oo.term.label`
- `oo.term.definition`
- `oo.term.status`

Recommended fields:

- `oo.term.namespace`
- `oo.term.aliases`
- `oo.term.examples`
- `oo.term.related_terms`
- `oo.term.parent_terms`
- `oo.term.replaced_by`
- `oo.term.security_classification`
- `oo.term.domain_owner`

Term status values:

- `proposed`
- `experimental`
- `accepted`
- `stable`
- `deprecated`
- `rejected`
- `superseded`
- `retired`

### 7.5 SemanticAssertion

A `SemanticAssertion` is a claim about a source artifact, ontology term, entity, mapping, equivalence, identity, constraint, policy, source authority, or transformation.

Assertion kinds:

- `maps_to`
- `exact_match`
- `broad_match`
- `narrow_match`
- `related_match`
- `same_as`
- `candidate_same_as`
- `not_same_as`
- `derived_from`
- `transforms_to`
- `source_of_truth_for`
- `conflicts_with`
- `constrains`
- `observes`
- `part_of`
- `depends_on`
- `deprecated_by`
- `supersedes`

Required fields:

- `@id`
- `@type = oo:SemanticAssertion`
- `oo.assertion.kind`
- `oo.assertion.subject`
- `oo.assertion.object`
- `oo.assertion.status`
- `oo.provenance`

Recommended fields:

- `oo.assertion.scope`
- `oo.assertion.valid_time`
- `oo.assertion.transaction_time`
- `oo.assertion.confidence`
- `oo.evidence`
- `oo.review`
- `oo.supersedes`
- `oo.superseded_by`

### 7.6 MappingAssertion

A `MappingAssertion` is a semantic assertion that relates a source artifact or source term to an ontology term or another source artifact.

Mapping kinds:

- `exact_match`
- `broad_match`
- `narrow_match`
- `related_match`
- `derived_from`
- `transformed_from`
- `aggregates`
- `splits_into`
- `composes_from`
- `not_equivalent`
- `unknown`
- `unmapped`

Rules:

- A mapping assertion MUST NOT imply global equivalence unless `oo.assertion.scope` explicitly declares global scope.
- A mapping assertion MUST preserve the source artifact reference.
- A mapping assertion SHOULD include evidence.
- A mapping assertion produced by an AI agent SHOULD include `oo.provenance.agent.type = ai_agent` and model/tool metadata when allowed by policy.

### 7.7 IdentityAssertion

An `IdentityAssertion` states that two or more records, entities, identifiers, or references may refer to the same real-world thing.

Identity assertion kinds:

- `same_as`
- `candidate_same_as`
- `not_same_as`
- `merged_into`
- `split_from`
- `canonical_for_scope`
- `alias_of`
- `identifier_for`

Rules:

- Identity assertions MUST be scoped unless they are explicitly global.
- Identity assertions MUST include the matching method or review method.
- Identity assertions MUST distinguish deterministic, probabilistic, heuristic, human-reviewed, and AI-suggested links.
- Identity assertions SHOULD support negative evidence and rejected candidates.

### 7.8 EvidenceRecord

An `EvidenceRecord` supports or contests an assertion.

Evidence kinds:

- `label_similarity`
- `description_similarity`
- `data_profile`
- `sample_values`
- `constraint_match`
- `foreign_key`
- `lineage_path`
- `code_usage`
- `documentation_reference`
- `human_review`
- `steward_decision`
- `ai_agent_suggestion`
- `benchmark_result`
- `policy_rule`
- `negative_evidence`

Required fields:

- `oo.evidence.kind`
- `oo.evidence.produced_at`
- `oo.evidence.produced_by`

Recommended fields:

- `oo.evidence.summary`
- `oo.evidence.source_refs`
- `oo.evidence.redaction_policy`
- `oo.evidence.confidence_contribution`

### 7.9 ProvenanceRecord

A `ProvenanceRecord` records origin, activity, agent, time, and source references.

Required fields:

- `oo.provenance.activity`
- `oo.provenance.generated_at`
- `oo.provenance.generated_by`

Recommended fields:

- `oo.provenance.used`
- `oo.provenance.was_derived_from`
- `oo.provenance.was_informed_by`
- `oo.provenance.reviewed_by`
- `oo.provenance.approved_by`
- `oo.provenance.tool`
- `oo.provenance.run_id`
- `oo.provenance.lineage_ref`

### 7.10 UnknownState

OpenOntology MUST distinguish unknown states.

Unknown-state values:

- `unknown`: the value or mapping is not known.
- `unmapped`: no accepted mapping currently exists.
- `not_applicable`: the concept does not apply in this scope.
- `withheld`: the information exists but is not available due to policy.
- `conflicted`: two or more assertions conflict.
- `not_observed`: no observation exists yet.
- `closed_world_false`: explicitly false under a declared closed-world profile.

Rules:

- Missing data MUST NOT be treated as false by default.
- A closed-world false value MUST declare the closed-world profile that authorizes that interpretation.

### 7.11 SemanticDecision

A `SemanticDecision` records a human- or agent-reviewable design decision.

Decision categories:

- `source_of_truth`
- `identity_policy`
- `denormalization`
- `extension_point`
- `deprecation`
- `naming`
- `security`
- `privacy`
- `modeling_tradeoff`
- `constraint_policy`
- `agent_instruction`

Required fields:

- `@id`
- `@type = oo:SemanticDecision`
- `oo.decision.title`
- `oo.decision.status`
- `oo.decision.context`
- `oo.decision.decision`
- `oo.decision.consequences`
- `oo.provenance`

---

## 8. Interchange Format

### 8.1 JSON-LD envelope

OpenOntology implementations SHOULD support a JSON-LD-compatible interchange envelope.

Minimum envelope:

```json
{
  "@context": [
    "urn:openontology:context:core:0.0.1"
  ],
  "@id": "urn:oo:assertion:example:001",
  "@type": "oo:MappingAssertion",
  "openontology_version": "0.0.1",
  "created_at": "2026-06-23T00:00:00Z",
  "assertion": {
    "kind": "exact_match",
    "status": "proposed",
    "subject": "urn:src:salesforce:Account:Email__c",
    "object": "urn:openontology:core:ContactPoint:emailAddress",
    "scope": {
      "tenant": "example-co",
      "domain": "customer_360"
    },
    "confidence": {
      "score": 0.84,
      "method": "label+profile+human_review_v1",
      "calibrated": false
    }
  },
  "evidence": [
    {
      "kind": "label_similarity",
      "summary": "Source label 'Email__c' is similar to emailAddress.",
      "confidence_contribution": 0.35,
      "produced_at": "2026-06-23T00:00:00Z",
      "produced_by": "urn:agent:ontology-mapper"
    },
    {
      "kind": "data_profile",
      "summary": "Values conform to email-like pattern in sampled rows. Samples redacted.",
      "confidence_contribution": 0.49,
      "produced_at": "2026-06-23T00:00:00Z",
      "produced_by": "urn:tool:profiler"
    }
  ],
  "provenance": {
    "activity": "mapping_proposal",
    "generated_at": "2026-06-23T00:00:00Z",
    "generated_by": "urn:agent:ontology-mapper",
    "used": [
      "urn:src:salesforce:Account:Email__c",
      "urn:profile:salesforce:Account:Email__c:2026-06-23"
    ]
  }
}
```

### 8.2 RDF and Turtle

Implementations MAY publish equivalent RDF/Turtle representations. A conforming RDF export SHOULD preserve identifiers, assertion kinds, evidence, provenance, status, scope, and versioning.

### 8.3 JSON Schema

Implementations SHOULD publish JSON Schema definitions for non-RDF systems.

### 8.4 SHACL shapes

Implementations SHOULD publish SHACL shapes for validation of RDF representations.

---

## 9. Semantic Conventions

OpenOntology semantic convention keys use the `oo.` prefix.

### 9.1 Fabric attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.fabric.id` | MUST | Stable fabric identifier. |
| `oo.fabric.name` | MUST | Human-readable name. |
| `oo.fabric.version` | MUST | Fabric semantic version. |
| `oo.fabric.owner` | SHOULD | Owning team or organization. |
| `oo.fabric.status` | SHOULD | Fabric lifecycle state. |

### 9.2 Namespace attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.namespace.prefix` | MUST | Prefix used in compact IDs. |
| `oo.namespace.iri_base` | MUST | Base IRI. |
| `oo.namespace.owner` | SHOULD | Owner or steward. |
| `oo.namespace.status` | SHOULD | Lifecycle status. |

### 9.3 Source attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.source.system` | MUST | Source system name. |
| `oo.source.artifact.type` | MUST | Source artifact type. |
| `oo.source.artifact.name` | MUST | Source artifact name. |
| `oo.source.artifact.path` | MUST | Stable path within source system. |
| `oo.source.native_type` | SHOULD | Native source type. |
| `oo.source.owner` | SHOULD | Source owner. |
| `oo.source.environment` | SHOULD | prod, staging, dev, etc. |
| `oo.source.extracted_at` | SHOULD | Extraction timestamp. |

### 9.4 Term attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.term.id` | MUST | Stable term identifier. |
| `oo.term.kind` | MUST | class, property, relationship, event, etc. |
| `oo.term.label` | MUST | Human-readable label. |
| `oo.term.definition` | MUST | Definition. |
| `oo.term.status` | MUST | Lifecycle status. |
| `oo.term.namespace` | SHOULD | Namespace. |
| `oo.term.aliases` | SHOULD | Alternate labels. |
| `oo.term.examples` | SHOULD | Usage examples. |

### 9.5 Assertion attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.assertion.id` | MUST | Stable assertion identifier. |
| `oo.assertion.kind` | MUST | Assertion kind. |
| `oo.assertion.subject` | MUST | Subject reference. |
| `oo.assertion.object` | MUST | Object reference. |
| `oo.assertion.status` | MUST | proposed, accepted, rejected, etc. |
| `oo.assertion.scope` | SHOULD | Domain, tenant, time, purpose, or policy scope. |
| `oo.assertion.confidence.score` | MAY | Numeric confidence score. |
| `oo.assertion.confidence.method` | REQUIRED if score present | Method used to produce confidence. |

### 9.6 Evidence attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.evidence.kind` | MUST | Evidence kind. |
| `oo.evidence.produced_by` | MUST | Agent, tool, or human. |
| `oo.evidence.produced_at` | MUST | Timestamp. |
| `oo.evidence.summary` | SHOULD | Human-readable explanation. |
| `oo.evidence.source_refs` | SHOULD | Source references. |
| `oo.evidence.redaction_policy` | SHOULD | Redaction policy for sensitive evidence. |

### 9.7 Provenance attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.provenance.activity` | MUST | Activity that generated the artifact. |
| `oo.provenance.generated_by` | MUST | Generating agent/tool/person. |
| `oo.provenance.generated_at` | MUST | Timestamp. |
| `oo.provenance.used` | SHOULD | Inputs used. |
| `oo.provenance.was_derived_from` | SHOULD | Derived sources. |
| `oo.provenance.reviewed_by` | SHOULD | Reviewer. |
| `oo.provenance.approved_by` | SHOULD | Approver. |

### 9.8 Identity attributes

| Attribute | Requirement | Description |
|---|---:|---|
| `oo.identity.kind` | MUST | same_as, candidate_same_as, not_same_as, etc. |
| `oo.identity.subject` | MUST | First entity/reference. |
| `oo.identity.object` | MUST | Second entity/reference. |
| `oo.identity.method` | MUST | Match method. |
| `oo.identity.scope` | SHOULD | Scope of identity. |
| `oo.identity.confidence.score` | MAY | Confidence. |
| `oo.identity.review.status` | SHOULD | Review status. |

---

## 10. Semantic Operations and Signals

OpenOntology systems MAY emit semantic operations as logs, events, traces, metrics, or records. When emitted, signals SHOULD use OpenOntology semantic conventions.

### 10.1 Event names

Recommended event names:

- `oo.source.discovered`
- `oo.source.changed`
- `oo.source.removed`
- `oo.term.proposed`
- `oo.term.accepted`
- `oo.term.deprecated`
- `oo.mapping.proposed`
- `oo.mapping.accepted`
- `oo.mapping.rejected`
- `oo.identity.candidate_created`
- `oo.identity.accepted`
- `oo.identity.rejected`
- `oo.conflict.detected`
- `oo.unknown.recorded`
- `oo.drift.detected`
- `oo.decision.recorded`
- `oo.fabric.published`

### 10.2 Metrics

Recommended metrics:

| Metric | Description |
|---|---|
| `oo.mapping.coverage` | Ratio of source artifacts with accepted mappings. |
| `oo.mapping.proposed.count` | Number of proposed mappings. |
| `oo.mapping.rejected.count` | Number of rejected mappings. |
| `oo.mapping.ambiguous.count` | Number of source artifacts with multiple candidate mappings. |
| `oo.identity.candidate.count` | Candidate identity links. |
| `oo.identity.accepted.count` | Accepted identity links. |
| `oo.conflict.count` | Active conflicts. |
| `oo.unknown.count` | Unknown/unmapped/not-applicable/withheld/conflicted states. |
| `oo.drift.count` | Source or ontology drift events. |
| `oo.deprecated_term.usage.count` | References to deprecated terms. |
| `oo.agent.proposal.acceptance_rate` | Acceptance ratio of agent-generated proposals. |

### 10.3 Semantic traces

A semantic trace is a sequence of semantic activities that produced or changed an ontology artifact.

Example activities:

- source extraction
- source profiling
- term proposal
- mapping proposal
- evidence generation
- human review
- publication
- downstream export

---

## 11. Mapping and Fusion Semantics

### 11.1 Mapping is scoped

A mapping that is correct in one context may be incorrect in another. Implementations SHOULD require scope for mappings between enterprise source systems and shared ontology terms.

### 11.2 Same label is insufficient

Implementations MUST NOT treat identical or similar labels as sufficient evidence for exact equivalence.

### 11.3 Exact match is rare

`exact_match` SHOULD be used only when the subject and object have the same intended meaning in the declared scope.

### 11.4 Broad and narrow matches are first-class

Partial semantic overlap MUST be representable without forcing equality. Implementations SHOULD support broad, narrow, and related matches.

### 11.5 Transformations are mappings with executable or declarative logic

When a target concept is derived by transformation, aggregation, splitting, normalization, or composition, the mapping SHOULD include transformation metadata.

Recommended transformation fields:

- `oo.transform.language`
- `oo.transform.expression`
- `oo.transform.source_refs`
- `oo.transform.output_type`
- `oo.transform.test_cases`
- `oo.transform.owner`

### 11.6 Identity is not equivalence

Two source fields may map to the same ontology term without the records they identify being the same entity. Conversely, two records may be linked as the same real-world entity while retaining source-specific attributes and provenance.

---

## 12. Versioning and Lifecycle

### 12.1 Fabric versioning

Ontology fabrics SHOULD use semantic versioning:

- Major: breaking changes to stable terms, mappings, or constraints.
- Minor: backward-compatible additions.
- Patch: documentation, metadata, or non-breaking corrections.

### 12.2 Term lifecycle

Terms SHOULD move through:

1. `proposed`
2. `experimental`
3. `accepted`
4. `stable`
5. `deprecated`
6. `retired`

Rejected terms SHOULD remain addressable as rejected records to prevent repeated rediscovery.

### 12.3 Assertion lifecycle

Assertions SHOULD support:

- `proposed`
- `accepted`
- `rejected`
- `disputed`
- `superseded`
- `deprecated`

### 12.4 Deprecation

A deprecated term SHOULD include:

- replacement term, if available
- deprecation reason
- deprecation date
- expected removal date, if any
- migration guidance
- affected mappings

---

## 13. Constraints and Profiles

OpenOntology is open-world by default, but operational systems often require closed-world validation at boundaries.

A `ConstraintProfile` declares a validation context.

Examples:

- `customer_360_export_required_fields`
- `finance_reporting_closed_world_profile`
- `public_api_contract_profile`
- `privacy_redaction_profile`

Rules:

- Constraint profiles MUST declare their scope.
- Constraint profiles MUST NOT redefine open-world absence as false outside their declared scope.
- SHACL SHOULD be used for RDF graph validation where appropriate.
- JSON Schema MAY be used for JSON-only implementations.

---

## 14. Security, Privacy, and Governance

### 14.1 Sensitive data

Source samples, evidence, labels, lineage, and provenance may contain sensitive information. Implementations MUST provide a way to redact, hash, tokenize, omit, or access-control sensitive evidence.

### 14.2 PII and regulated data

Implementations SHOULD tag ontology terms, source artifacts, and evidence records with security and privacy classifications when applicable.

Recommended fields:

- `oo.security.classification`
- `oo.privacy.category`
- `oo.privacy.redaction_policy`
- `oo.access.policy_ref`

### 14.3 Agent accountability

Agent-originated assertions SHOULD be distinguishable from human-originated assertions. Implementations SHOULD record the agent, tool, prompt or task reference, source inputs, and review status where policy allows.

### 14.4 Governance roles

Recommended roles:

- `reader`
- `contributor`
- `reviewer`
- `domain_steward`
- `security_reviewer`
- `maintainer`
- `release_manager`

---

## 15. Conformance

### 15.1 OO-Core

An OO-Core implementation MUST support:

- OntologyFabric
- Namespace
- SourceArtifact
- OntologyTerm
- SemanticAssertion
- MappingAssertion
- EvidenceRecord
- ProvenanceRecord
- UnknownState
- JSON-LD-compatible envelope
- stable identifiers
- lifecycle status

### 15.2 OO-Fusion

An OO-Fusion implementation MUST support all OO-Core requirements and:

- IdentityAssertion
- scoped identity
- candidate and rejected identity links
- conflict representation
- source-of-truth assertions
- broad/narrow/related mappings
- transformation mappings

### 15.3 OO-Operations

An OO-Operations implementation MUST support all OO-Core requirements and:

- semantic events
- drift events
- coverage metrics
- lifecycle metrics
- version diffing
- exportable change history

### 15.4 OO-Agent

An OO-Agent implementation MUST support all OO-Core requirements and:

- agent-originated assertion metadata
- agent workflow input/output manifests
- human review status
- decision records
- anti-pattern review outputs

### 15.5 OO-RDF

An OO-RDF implementation MUST support all OO-Core requirements and:

- RDF export
- JSON-LD context expansion
- SHACL validation shapes
- PROV-O mapping for provenance

---

## 16. Reference API Surface

OpenOntology does not require a network protocol in v0.0.1, but reference servers SHOULD expose APIs similar to the following.

```http
POST /v1/fabrics
POST /v1/source-artifacts
POST /v1/terms
POST /v1/assertions
POST /v1/evidence
POST /v1/events
GET  /v1/fabrics/{fabric_id}
GET  /v1/terms/{term_id}
GET  /v1/source-artifacts/{source_artifact_id}
GET  /v1/assertions?subject={id}
GET  /v1/assertions?object={id}
GET  /v1/diff?from={version}&to={version}
POST /v1/validate
POST /v1/export
```

---

## 17. Reference CLI

A reference CLI SHOULD support:

```bash
openontology init
openontology ingest ./schemas
openontology profile ./data
openontology propose-mappings
openontology validate
openontology diff --from 0.0.1 --to 0.0.2
openontology export --format jsonld
openontology export --format turtle
openontology report coverage
openontology review anti-patterns
```

---

## 18. Agent Workflow Contract

An OpenOntology-compatible agent workflow SHOULD define:

- task name
- input artifacts
- output artifacts
- allowed assertion kinds
- review requirement
- source authority policy
- security policy
- anti-pattern checks
- expected confidence/evidence behavior

### 18.1 Required workflows for Y2 incubation

The Y2 incubation SHOULD define these first workflows:

1. `design-open-ontology`
2. `fuse-siloed-data`
3. `review-ontology-antipatterns`
4. `extend-open-ontology`
5. `record-ontology-design-decision`

### 18.2 Anti-pattern checks

Recommended anti-patterns:

- god object
- kitchen-sink property
- unscoped `same_as`
- implicit source of truth
- destructive source harmonization
- label-only equivalence
- action/event confusion
- conflating entity, role, and relationship
- unversioned mapping
- confidence without evidence
- privacy-blind evidence
- closed-world assumption leakage
- extension that mutates stable core semantics

---

## 19. Example: Customer Fusion

### 19.1 Source artifacts

```json
{
  "@context": "urn:openontology:context:core:0.0.1",
  "@id": "urn:src:salesforce:Account",
  "@type": "oo:SourceArtifact",
  "oo.source.system": "salesforce",
  "oo.source.artifact.type": "table",
  "oo.source.artifact.name": "Account",
  "oo.source.artifact.path": "salesforce.public.Account"
}
```

```json
{
  "@context": "urn:openontology:context:core:0.0.1",
  "@id": "urn:src:stripe:Customer",
  "@type": "oo:SourceArtifact",
  "oo.source.system": "stripe",
  "oo.source.artifact.type": "api_object",
  "oo.source.artifact.name": "Customer",
  "oo.source.artifact.path": "stripe.Customer"
}
```

### 19.2 Ontology term

```json
{
  "@context": "urn:openontology:context:core:0.0.1",
  "@id": "urn:openontology:core:CustomerAccount",
  "@type": "oo:OntologyTerm",
  "oo.term.kind": "class",
  "oo.term.label": "Customer Account",
  "oo.term.definition": "A party account representing an ongoing commercial relationship with the organization.",
  "oo.term.status": "experimental"
}
```

### 19.3 Mapping assertion

```json
{
  "@context": "urn:openontology:context:core:0.0.1",
  "@id": "urn:oo:mapping:salesforce-account-to-customer-account:v1",
  "@type": "oo:MappingAssertion",
  "openontology_version": "0.0.1",
  "assertion": {
    "kind": "broad_match",
    "status": "proposed",
    "subject": "urn:src:salesforce:Account",
    "object": "urn:openontology:core:CustomerAccount",
    "scope": {
      "domain": "customer_360"
    },
    "confidence": {
      "score": 0.72,
      "method": "source_label+steward_review",
      "calibrated": false
    }
  },
  "evidence": [
    {
      "kind": "human_review",
      "summary": "Domain steward confirmed Salesforce Account includes customers and prospects; broad match selected instead of exact match.",
      "produced_at": "2026-06-23T00:00:00Z",
      "produced_by": "urn:person:domain-steward"
    }
  ],
  "provenance": {
    "activity": "mapping_review",
    "generated_at": "2026-06-23T00:00:00Z",
    "generated_by": "urn:person:domain-steward"
  }
}
```

### 19.4 Identity assertion

```json
{
  "@context": "urn:openontology:context:core:0.0.1",
  "@id": "urn:oo:identity:sf001-stripecus123:v1",
  "@type": "oo:IdentityAssertion",
  "openontology_version": "0.0.1",
  "identity": {
    "kind": "candidate_same_as",
    "subject": "urn:record:salesforce:Account:001xx000003DGbY",
    "object": "urn:record:stripe:Customer:cus_123",
    "method": "email_domain+billing_address+manual_review_pending",
    "scope": {
      "domain": "customer_360"
    },
    "confidence": {
      "score": 0.81,
      "method": "identity_model_v0",
      "calibrated": false
    }
  },
  "evidence": [
    {
      "kind": "data_profile",
      "summary": "Billing address and email domain match; legal name differs slightly. Values redacted.",
      "produced_at": "2026-06-23T00:00:00Z",
      "produced_by": "urn:tool:entity-resolution-profiler"
    }
  ],
  "provenance": {
    "activity": "identity_candidate_generation",
    "generated_at": "2026-06-23T00:00:00Z",
    "generated_by": "urn:agent:identity-resolver"
  }
}
```

---

## 20. Y2 Incubation Plan

### 20.1 Goal

Y2 should incubate OpenOntology as a neutral, implementation-oriented standard for AI-assisted ontology design and data-model fusion.

### 20.2 Initial repo structure

```text
/rfcs
  0001-openontology-core.md
  0002-semantic-conventions.md
  0003-agent-workflows.md
/spec
  /core
  /semantic-conventions
  /agent-workflows
  /conformance
/contexts
  core-v0.0.1.jsonld
/schemas
  openontology-core.schema.json
/shapes
  openontology-core.shacl.ttl
/examples
  /customer-360
  /hr-it-asset
  /data-product-catalog
/reference
  /cli
  /collector
  /validator
/skills
  design-open-ontology
  fuse-siloed-data
  review-ontology-antipatterns
  extend-open-ontology
  ontology-design-decision
/governance
  charter.md
  contributing.md
  code-of-conduct.md
  release-process.md
```

### 20.3 Working groups

Recommended working groups:

1. **Core Model WG**: data model, envelope, lifecycle, unknowns.
2. **Semantic Conventions WG**: required attribute names and event/metric conventions.
3. **Fusion WG**: mapping, equivalence, identity, conflict, source authority.
4. **Agent WG**: coding-agent workflows, skill contracts, review gates.
5. **Interop WG**: RDF/OWL/SHACL/PROV-O/SKOS/DCAT/OpenLineage/OpenTelemetry integrations.
6. **Security and Governance WG**: privacy, redaction, access control, stewardship, licensing.

### 20.4 90-day milestones

#### Days 0-30

- Publish RFC-OO-0001 draft.
- Publish JSON-LD context v0.0.1.
- Publish JSON Schema v0.0.1.
- Publish three examples.
- Add issue templates for term proposal, mapping proposal, identity policy, and semantic convention proposal.
- Add contribution and governance docs.

#### Days 31-60

- Build reference validator.
- Build reference CLI.
- Add SHACL shapes.
- Add OpenLineage reference mapping.
- Add OpenTelemetry event/log mapping for semantic operations.
- Publish conformance test fixtures.

#### Days 61-90

- Publish RFC-OO-0002 Semantic Conventions.
- Publish RFC-OO-0003 Agent Workflow Contract.
- Recruit early implementers.
- Create public examples for customer fusion, asset fusion, and data product cataloging.
- Start compatibility reports across graph stores, catalogs, and agent frameworks.

---

## 21. Open Questions

1. When should OpenOntology reserve a public namespace, and what governance body should control it?
2. Should conformance require JSON-LD, or should JSON-only be a separate conformance level?
3. Should confidence be standardized beyond basic numeric score and method metadata?
4. Should OpenOntology include canonical upper ontology terms, or remain strictly operational?
5. How should privacy-preserving evidence be represented for regulated environments?
6. Should OpenOntology define a collector protocol or remain transport-neutral in v1?
7. How should agent prompts, model names, and tool metadata be recorded without leaking sensitive context?
8. What is the correct trademark posture around the phrase "OpenTelemetry but for open-world ontologies"?

---

## 22. References

- OpenTelemetry Specification: https://opentelemetry.io/docs/specs/otel/
- OpenTelemetry Semantic Conventions: https://opentelemetry.io/docs/concepts/semantic-conventions/
- RDF 1.1 Concepts and Abstract Syntax: https://www.w3.org/TR/rdf11-concepts/
- OWL 2 Web Ontology Language Primer: https://www.w3.org/TR/owl2-primer/
- JSON-LD 1.1: https://www.w3.org/TR/json-ld11/
- PROV-O: The PROV Ontology: https://www.w3.org/TR/prov-o/
- SHACL: Shapes Constraint Language: https://www.w3.org/TR/shacl/
- SKOS Reference: https://www.w3.org/TR/skos-reference/
- DCAT Version 3: https://www.w3.org/TR/vocab-dcat-3/
- OpenLineage: https://openlineage.io/
- RFC 2119: https://datatracker.ietf.org/doc/html/rfc2119
- RFC 8174: https://datatracker.ietf.org/doc/html/rfc8174
- Y2 ontology skills repository: https://github.com/y2-intel/ontology
