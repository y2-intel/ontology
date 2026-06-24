---
name: openontology-standard
description: Use this skill when drafting, reviewing, extending, or implementing OpenOntology standard artifacts, including RFCs, semantic conventions, conformance levels, JSON-LD contexts, JSON Schemas, SHACL shapes, examples, governance, reference validators, or agent workflow contracts.
---

Use this skill to work on OpenOntology as a public standard, not only as a one-off ontology design. Keep the standard boundary clear: OpenOntology defines the operational semantic-fabric layer around existing standards.

## Standard boundary

OpenOntology should standardize:

- Source model capture.
- Semantic assertions.
- Mapping evidence.
- Identity links.
- Unknown states.
- Conflicts and drift.
- Semantic decisions.
- Agent workflow contracts.
- Conformance levels and semantic conventions.

OpenOntology should not replace RDF, OWL, JSON-LD, SHACL, PROV-O, SKOS, DCAT, OpenLineage, or OpenTelemetry. Treat those as adjacent standards to map to, reuse, or export into.

## Workflow

1. Identify the artifact type.
   - RFC: normative proposal and rationale.
   - Spec: stable edited specification text.
   - Context: JSON-LD term mapping.
   - Schema: JSON validation shape.
   - Shape: RDF or SHACL validation profile.
   - Example: concrete interoperable artifact.
   - Skill: agent workflow for applying the standard.

2. Preserve the standard boundary.
   - Say which adjacent standard owns graph semantics, validation, provenance, lineage, telemetry, or cataloging.
   - Add OpenOntology only where the operational semantic-fabric contract is missing.

3. Use RFC conformance language.
   - Use MUST, MUST NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL only for normative statements.
   - Keep examples clearly non-normative unless the section says otherwise.

4. Tie prose to machine-readable artifacts.
   - Update examples when schemas or contexts change.
   - Update schemas or contexts when the RFC adds required fields or terms.
   - Keep extension points open with namespaced fields instead of closing the world too early.

5. Check conformance impact.
   - OO-Core: fabric, source artifacts, terms, assertions, mappings, evidence, provenance, unknowns, JSON-LD envelope.
   - OO-Fusion: identity resolution, conflicts, source authority, transformations.
   - OO-Operations: drift events, semantic metrics, version diffs, lifecycle history.
   - OO-Agent: proposals, review gates, design decisions, anti-pattern checks.
   - OO-RDF: RDF export, JSON-LD expansion, SHACL shapes, PROV-O mapping.

6. Return implementation-ready changes.
   - For RFC/spec work, include affected sections and open questions.
   - For schema/context work, include validation notes and example updates.
   - For skill work, include trigger description changes and output contract changes.

## Repository artifacts

When this skill is used inside the ontology repo, prefer these top-level artifacts when present:

- `rfcs/0001-openontology-core.md` for the current core RFC.
- `docs/openontology-incubation-plan.md` for roadmap and skill alignment.
- `spec/` for stabilized specification text.
- `contexts/` for JSON-LD contexts.
- `schemas/` for JSON Schemas.
- `shapes/` for SHACL profiles.
- `examples/` for interoperable fixtures.

If those artifacts are unavailable, proceed from this skill's boundary guidance and ask for the draft or target artifact when exact wording matters.

## Output checks

- Source artifacts and source labels remain preserved.
- Missing information is not treated as false by default.
- Unknown, unmapped, not applicable, withheld, conflicted, not observed, and closed-world false are distinct when relevant.
- Agent-originated claims remain distinguishable from human-approved assertions.
- Confidence scores identify their method when present.
- Closed-world validation is scoped to an explicit constraint profile.
