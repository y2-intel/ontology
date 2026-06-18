---
name: hello-world
description: Smoke-test skill. Use to verify the skills repo is wired up and skill loading works end-to-end across claude-code and codex.
type: skill
platforms:
  - claude-code
  - codex
  - any
tags:
  - example
  - smoke-test
version: 1.0.0
---

Minimal example skill demonstrating required frontmatter structure.

## What it does

Prints a greeting to confirm skill loading is functional.

## Usage

```bash
echo "Hello from y2 skills!"
```

Expected output: `Hello from y2 skills!`
