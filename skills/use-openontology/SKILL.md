---
name: use-openontology
description: Use this skill when mapping source schemas, API fields, events, documents, records, existing ontology terms, or data catalogs into OpenOntology 0.0.1 artifacts; extending OpenOntology-compatible examples, contexts, schemas, assertions, identity links, source artifacts, ontology terms, evidence, provenance, or unknown states; or using OpenOntology outputs in implementation plans.
---

Use this skill to apply OpenOntology 0.0.1 to real data and ontology work. This is the practical mapping and implementation skill; use `openontology-standard` instead when the task is to change RFC wording, conformance policy, governance, or standard semantics.

## Core posture

OpenOntology 0.0.1 is an incubation draft. Do not assume a public web namespace exists. Prefer repo-local artifacts and `urn:openontology:...` identifiers until a governed namespace is reserved.

Preserve source meaning first. A useful OpenOntology output usually starts with SourceArtifact records, then adds OntologyTerm records, MappingAssertion records, IdentityAssertion records, EvidenceRecord entries, ProvenanceRecord entries, UnknownState values, and SemanticDecision records.

## Mapping workflow

1. Capture source artifacts.
   - Record source system, artifact type, native name, stable path, owner, environment, native type, extraction time, and lineage reference when known.
   - Do not rename or harmonize away source labels before they are captured.

2. Identify ontology terms.
   - Create terms for domain concepts, properties, relationships, events, observations, roles, interfaces, policies, units, and enumerations.
   - Keep terms small, named in domain language, and scoped to a namespace.

3. Map with explicit assertion kinds.
   - Use `exact_match` only when meanings are the same in scope.
   - Use `broad_match`, `narrow_match`, or `related_match` for partial overlap.
   - Use `derived_from`, `transformed_from`, `aggregates`, `splits_into`, or `composes_from` when logic is involved.
   - Use `unknown` or `unmapped` rather than pretending a mapping exists.

4. Resolve identity separately from meaning.
   - Use IdentityAssertion for record/entity identity candidates.
   - Distinguish `candidate_same_as`, `same_as`, `not_same_as`, `merged_into`, `split_from`, `alias_of`, `identifier_for`, and `canonical_for_scope`.
   - Include match method, scope, evidence, provenance, and review state.

5. Add evidence and provenance.
   - Evidence should explain why the assertion exists.
   - Provenance should say who or what generated it, when, using which inputs.
   - If confidence is present, include the method and whether it is calibrated.

6. Record unknowns and conflicts.
   - Use `unknown`, `unmapped`, `not_applicable`, `withheld`, `conflicted`, `not_observed`, or `closed_world_false` deliberately.
   - Closed-world false requires an explicit constraint profile.

7. Validate and package.
   - For this repo, validate JSON examples against `schemas/openontology-core.schema.json`.
   - Keep example contexts pointed at `urn:openontology:context:core:0.0.1` unless the repo adopts a governed public namespace.
   - Return implementation-ready JSON-LD snippets, mapping tables, or migration steps.

## Extension rules

- Extend with namespaced fields rather than changing core semantics.
- Prefer new OntologyTerm records for domain-specific concepts.
- Prefer SemanticDecision records for source precedence, identity policy, denormalization, naming, security, privacy, and constraint choices.
- Update examples and schemas together when the extension should be reusable.
- Do not introduce a public URL namespace unless the user explicitly asks and governance exists for it.

## Output shape

For mapping work, return:

- SourceArtifact inventory.
- OntologyTerm proposals.
- MappingAssertion table or JSON-LD.
- IdentityAssertion table or JSON-LD when record identity is in scope.
- Evidence and provenance notes.
- Unknown, unmapped, withheld, conflicted, and not-applicable states.
- SemanticDecision records for durable tradeoffs.
- Validation notes and open questions.

## Guardrails

- Do not turn similar labels into `exact_match` without evidence.
- Do not merge source artifacts into ontology terms without preserving the source artifact.
- Do not treat missing information as false.
- Do not hide identity-resolution uncertainty.
- Do not mark agent-generated claims as human-approved.
- Do not use any unreserved domain as a canonical namespace.
