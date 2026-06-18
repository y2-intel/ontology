# Ontology Skills

Agent Skills for data engineers and AI coding agents working on open-world ontologies.

Use this pack to model real-world objects, fuse siloed source systems, resolve identity, review ontology anti-patterns, extend stable core models, and record design decisions. Skills follow the [Agent Skills](https://agentskills.io/) format.

## Install

```bash
npx skills add ontology
```

Restart your agent after install so the new skills are discovered.

You do not need to clone this repo or run the local Node.js driver to use the skills. Once installed, use them from your coding agent with normal prompts.

## Smoke Test

Ask your agent:

```text
show ontology commands
```

Then try a workflow prompt:

```text
Use the fuse-siloed-data ontology skill to resolve identity across Salesforce and Stripe customer records.
```

## Skills

| Skill | Type | Use when |
|---|---|---|
| `design-open-ontology` | action | Designing a new ontology from source data, APIs, workflows, and domain language. |
| `fuse-siloed-data` | action | Unifying customers, employees, assets, vendors, facilities, or other entities across systems. |
| `review-ontology-antipatterns` | action | Finding system silos, kitchen-sink fields, god objects, action sprawl, weak naming, or migration risks. |
| `extend-open-ontology` | action | Adding capabilities without destabilizing core models, permissions, or downstream workflows. |
| `ontology-command-index` | skill | Discovering this pack's command surface or routing a task to the right ontology workflow. |
| `ontology-design-decision` | object | Recording identity, denormalization, object-backed link, extension point, or source-of-truth decisions. |
| `ontology-workflow` | interface | Keeping ontology design, fusion, review, and extension skills aligned to the shared workflow contract. |

## Usage

Skills are available automatically after install. Ask for ontology work in plain language:

```text
Design an ontology for customers, accounts, invoices, payments, and support tickets.
```

```text
Fuse Salesforce, Stripe, and warehouse customer records into one ontology Customer object.
```

```text
Review this ontology export for anti-patterns and give data engineers a refactor plan.
```

```text
Extend Asset with inspection workflows without turning Asset into a god object.
```

```text
Record the ontology decision for why HR is authoritative for employee job title.
```

## Prompt Shortcuts

- `choose-ontology-skill`
- `design-extension-point`
- `design-ontology`
- `extend-ontology`
- `find-antipatterns`
- `fuse-silos`
- `model-domain-entities`
- `ontology-commands`
- `ontology-workflow`
- `record-ontology-decision`
- `resolve-identity`
- `review-ontology`

## Development

This section is only for maintainers editing this skill pack. Installed users do not need these commands.

Local development uses Node.js 22+ and npm 10+. No package install is required.

Validate the repo:

```bash
node .claude/skills/run-skills/driver.mjs validate
```

List skills and command aliases:

```bash
node .claude/skills/run-skills/driver.mjs list
node .claude/skills/run-skills/driver.mjs commands
```

Search by topic, command, tag, or description:

```bash
node .claude/skills/run-skills/driver.mjs search identity
node .claude/skills/run-skills/driver.mjs search anti-pattern
node .claude/skills/run-skills/driver.mjs search extension
```

Inspect the skill graph:

```bash
node .claude/skills/run-skills/driver.mjs graph
```

The `.agents` entrypoint wraps the same driver:

```bash
node .agents/skills/run-skills/driver.mjs validate
node .agents/skills/run-skills/driver.mjs commands
```

The `run-skills` helper may appear when listing the repository with `skills add`; it is the validator and command-index utility for this repo.

## Structure

- `skills/*/SKILL.md` - Agent skills
- `schemas/skill.schema.json` - Frontmatter schema
- `.claude/skills/run-skills/driver.mjs` - Validator, search, graph, and command index
- `.agents/skills/run-skills/driver.mjs` - `.agents` wrapper around the same driver
