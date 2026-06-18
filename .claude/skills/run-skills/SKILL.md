---
name: run-skills
description: Validate, list, search, graph, and command-index skills in the y2 data-ontology skills repo. Use when asked to add a skill, validate skill definitions, list available skills, search ontology commands, show the skill dependency graph, or check whether a SKILL.md is well-formed.
---

This is a standalone data-ontology skills repo modeled on Palantir Foundry ontology primitives (object types, link types, action types, interfaces). "Running" it means validating skill definitions against the schema, browsing the catalog, and indexing ontology commands for data engineers. The driver is `.claude/skills/run-skills/driver.mjs` — zero external dependencies, Node.js only.

All paths below are relative to the repo root.

## Prerequisites

Node.js 18+ (v22 confirmed working on macOS).

```bash
node --version   # → v22.22.3
```

No `npm install` required — driver has zero deps.

## Structure

```
skills/
  <slug>/
    SKILL.md              ← frontmatter (required) + body
schemas/
  skill.schema.json       ← JSON Schema for frontmatter validation
.claude/skills/run-skills/
  driver.mjs              ← catalog and validation tool
  SKILL.md                ← this file
.agents/skills/run-skills/
  driver.mjs              ← wrapper around the canonical driver
  SKILL.md                ← .agents-compatible entrypoint
```

## Run (agent path)

All commands run from the repo root.

### Validate all skills

```bash
node .claude/skills/run-skills/driver.mjs validate
# → "  OK    ⚡ fuse-siloed-data"  (one line per skill, typed)
# → all-pass summary
# exit 0 on all-pass, exit 1 if any fail
```

`.agents` entrypoint:

```bash
node .agents/skills/run-skills/driver.mjs validate
```

### List catalog (grouped by ontological type)

```bash
node .claude/skills/run-skills/driver.mjs list
# → skills grouped under ACTION / SKILL / INTERFACE / OBJECT headings
```

### Search

```bash
node .claude/skills/run-skills/driver.mjs search "identity"
# → matching skills with type icon, description, tags, platforms
```

### Show ontology command index

```bash
node .claude/skills/run-skills/driver.mjs commands
# → command aliases mapped to the skill that implements each workflow
```

`.agents` entrypoint:

```bash
node .agents/skills/run-skills/driver.mjs commands
```

### Inspect a single skill

```bash
node .claude/skills/run-skills/driver.mjs check fuse-siloed-data
# → parsed frontmatter JSON + "Valid." or error list
```

### Show dependency graph

```bash
node .claude/skills/run-skills/driver.mjs graph
# → "  fuse-siloed-data"
# →   "──[uses-workflow]──▶ ontology-workflow"
# →   "──[records-decisions-as]──▶ ontology-design-decision"
```

## Palantir Ontology Model

Skills are modeled on four Palantir Foundry primitives:

| `type` | Icon | Palantir equivalent | When to use |
|---|---|---|---|
| `action` | ⚡ | Action Type | A business operation: design, fuse, review, extend |
| `object` | ◉ | Object Type | A domain entity or durable decision record |
| `interface` | ◈ | Interface | A shared capability contract: `ontology-workflow` |
| `skill` | ◆ | — | General-purpose agent capability (default) |

### Required frontmatter (all types)

```yaml
---
name: my-skill               # kebab-case; singular noun for object/interface, verb-phrase for action
description: One-liner with key verbs (run, build, test, screenshot). Minimum 20 characters.
type: action                 # action | object | interface | skill
---
```

### Action type — additional fields

```yaml
parameters:
  - name: targetEntity
    baseType: string         # string | integer | float | boolean | date | timestamp | object-reference | array | struct
    description: What this param means.
    required: true
modifies:
  - ontology-object-types    # object slugs or system names affected
```

### Object type — additional fields

```yaml
properties:
  - name: decisionId
    baseType: string
    description: Stable identifier for the ontology decision.
    primaryKey: false
```

### Interface type — additional fields

```yaml
sharedCapabilities:
  - gather-domain-language
  - identify-real-world-entities
  - document-tradeoffs
extends:                     # other interface slugs
  - base-interface
```

### Links (any type)

```yaml
links:
  - forwardName: validates-with
    reverseName: reviews
    target: review-ontology-antipatterns
    cardinality: many-to-many  # one-to-one | one-to-many | many-to-many
implements:
  - ontology-workflow        # interface slugs this skill conforms to
```

### Command index entries

Use `commands` to expose importable, searchable workflows for data engineers.

```yaml
commands:
  - name: design-ontology
    description: Build a domain-driven ontology from source data and business use cases.
    examples: "design ontology from CRM and ERP data; ontologize this dataset"
```

## Design principles (from Palantir docs)

- **Domain-driven, not source-driven** — name skills after real ontology/data-engineering work, not source-system internals (`fuse-siloed-data`, not `join-salesforce-table`).
- **Self-documenting names** — if someone needs docs to understand the name, rename it.
- **No action sprawl** — bundle related changes into one action skill, not one per field.
- **Interfaces over duplication** — when three skills share a lifecycle, extract an interface.
- **Fuse silos into shared object types** — prefer one real-world entity model with source precedence and provenance over one object type per system.
- **Open for extension** — protect core models and add new capabilities through linked extension types, interfaces, and documented namespaces.
- **`name` must match directory slug** — `skills/my-skill/SKILL.md` must have `name: my-skill`.

## Gotchas

- **Frontmatter must start at line 1** — the opening `---` must be the very first bytes of the file. A BOM or blank line above it breaks parsing.
- **Array items need two-space indent** — `  - value` (two spaces, dash, space). Tabs or irregular indent silently skip items.
- **Nested object arrays** — for `parameters:` / `links:` / `properties:`, each item starts with `  - name: foo` on the same line as the dash; continuation fields go on the next line with four-space indent.
- **`name` ≠ slug = hard fail** — the driver uses the parent directory name as the canonical slug and rejects any frontmatter `name:` that differs.
- **`additionalProperties` is strict** — unknown fields (e.g. `author:`, `created:`) are rejected. Add them to `schemas/skill.schema.json` first.

## Troubleshooting

- **`No YAML frontmatter block`**: File doesn't start with `---\n`. Blank line before the first `---` causes this.
- **`name ≠ directory slug`**: Rename the directory or the `name:` field to match.
- **`unknown platforms: X`**: Valid values are `claude-code`, `codex`, `openai-assistants`, `any`.
- **`unknown baseType`**: Valid types are `string`, `integer`, `float`, `boolean`, `date`, `timestamp`, `object-reference`, `array`, `struct`.
- **Empty `list` output for a new type**: The driver groups by `type` field — if `type` is missing, the skill fails validation before it appears.
