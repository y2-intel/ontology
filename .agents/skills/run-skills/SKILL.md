---
name: run-skills
description: Validate, list, search, graph, and command-index ontology skills in this repo from .agents-compatible workspaces. Use when asked to validate imported ontology skills, list available ontology commands, search skills, or inspect the skill graph.
---

This is the `.agents` entrypoint for the ontology skills repo. It delegates to the canonical driver at `.claude/skills/run-skills/driver.mjs`, so `.agents` and `.claude` use the same validation and command-index behavior.

All commands run from the repo root.

## Validate

```bash
node .agents/skills/run-skills/driver.mjs validate
```

## List

```bash
node .agents/skills/run-skills/driver.mjs list
```

## Search

```bash
node .agents/skills/run-skills/driver.mjs search identity
node .agents/skills/run-skills/driver.mjs search anti-pattern
node .agents/skills/run-skills/driver.mjs search extension
```

## Commands

```bash
node .agents/skills/run-skills/driver.mjs commands
```

## Graph

```bash
node .agents/skills/run-skills/driver.mjs graph
```

## Import

Copy the ontology skills into another agent workspace:

```bash
mkdir -p /path/to/target/.agents/skills
cp -R skills/* /path/to/target/.agents/skills/
cp -R .agents/skills/run-skills /path/to/target/.agents/skills/
```
