# Ontology Skills

Importable skills for data engineers who are designing, improving, and governing open-world data ontologies. The pack is inspired by Palantir Foundry ontology design guidance and focuses on practical data-oriented workflows: model real entities, fuse siloed systems, define stable identities, curate properties, design semantic links, extend core models safely, and record decisions.

## What's Included

| Skill | Type | Purpose |
|---|---|---|
| `ontology-command-index` | skill | Routes ontology tasks to the right skill and exposes command aliases. |
| `ontology-workflow` | interface | Shared workflow contract for ontology design, review, fusion, and extension skills. |
| `design-open-ontology` | action | Designs a domain-driven ontology from source data, use cases, and workflows. |
| `fuse-siloed-data` | action | Merges source-system representations into shared ontology object types. |
| `review-ontology-antipatterns` | action | Reviews ontology artifacts for structural anti-patterns and remediation paths. |
| `extend-open-ontology` | action | Adds new capabilities without destabilizing core models or security boundaries. |
| `ontology-design-decision` | object | Records design decisions, tradeoffs, source precedence, and security impact. |

## Ontology Commands

The skills expose searchable command aliases for agents and data engineers:

```bash
node .claude/skills/run-skills/driver.mjs commands
```

Common commands:

- `design-ontology`
- `model-domain-entities`
- `fuse-silos`
- `resolve-identity`
- `review-ontology`
- `find-antipatterns`
- `extend-ontology`
- `design-extension-point`
- `record-ontology-decision`
- `choose-ontology-skill`

## Setup

Clone the repo:

```bash
git clone https://github.com/y2-intel/ontology.git
cd ontology
```

Requirements:

- Node.js 18 or newer.
- No package install is required.

Validate the skill pack:

```bash
node .claude/skills/run-skills/driver.mjs validate
```

List available skills:

```bash
node .claude/skills/run-skills/driver.mjs list
```

Search by topic, command, tag, or description:

```bash
node .claude/skills/run-skills/driver.mjs search identity
node .claude/skills/run-skills/driver.mjs search anti-pattern
node .claude/skills/run-skills/driver.mjs search extension
```

Inspect the graph of skill relationships:

```bash
node .claude/skills/run-skills/driver.mjs graph
```

## Install Into Codex

Copy the ontology skills into your Codex skills directory:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/* "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Restart Codex after copying so the new skills are discovered.

## Install Into `.agents`

This repo is ready for `.agents`-style usage. It includes:

```text
.agents/skills/run-skills/SKILL.md
.agents/skills/run-skills/driver.mjs
```

The `.agents` driver is a thin wrapper around the canonical `.claude` driver, so both entrypoints validate and index the same `skills/` directory.

Run through the `.agents` entrypoint:

```bash
node .agents/skills/run-skills/driver.mjs validate
node .agents/skills/run-skills/driver.mjs commands
```

To import the ontology skills into another `.agents` workspace:

```bash
mkdir -p /path/to/target/.agents/skills
cp -R skills/* /path/to/target/.agents/skills/
```

If the target agent expects utility skills under `.agents/skills`, copy the run helper too:

```bash
cp -R .agents/skills/run-skills /path/to/target/.agents/skills/
```

## Authoring Rules

Each skill lives at:

```text
skills/<skill-name>/SKILL.md
```

Each `SKILL.md` must start with YAML frontmatter and validate against:

```text
schemas/skill.schema.json
```

Required fields:

```yaml
---
name: fuse-siloed-data
description: Action skill for data engineers fusing siloed source systems into shared ontology object types with identity, provenance, and precedence rules.
type: action
---
```

Supported ontology primitive types:

- `action`: a business operation or workflow.
- `object`: a domain entity or decision record.
- `interface`: a shared capability contract.
- `skill`: a general routing or support skill.

Use `commands` for discoverable workflows:

```yaml
commands:
  - name: fuse-silos
    description: Merge multiple source-system representations into one shared ontology entity.
    examples: "fuse HR badge and project employee data; unify customer records across CRM and billing"
```

Validate after edits:

```bash
node .claude/skills/run-skills/driver.mjs validate
git diff --check
```

## Design Principles

- Model reality, not source-system schemas.
- Fuse siloed data into shared object types with explicit identity, provenance, and source precedence.
- Curate properties intentionally; avoid kitchen-sink object types.
- Store each fact in one semantic home and document deliberate denormalization.
- Use semantic links, object-backed links when relationships carry metadata, and interfaces for reusable capabilities.
- Extend core models through linked extension types and interfaces before mutating stable core types.
- Design security from domain boundaries and least privilege.
- Record irreversible or high-impact tradeoffs as ontology design decisions.
