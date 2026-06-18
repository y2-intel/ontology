---
name: runnable
description: Interface contract for skills that can be launched, started, and interacted with as a running process. Implement this on any skill that involves starting a server, CLI, or GUI.
type: interface
platforms:
  - claude-code
  - codex
  - any
tags:
  - interface
  - infrastructure
version: 1.0.0
sharedCapabilities:
  - launch
  - stop
  - health-check
---

This is an **interface** skill — it defines the contract that all "runnable" skills must fulfil.

Inspired by Palantir interface types: multiple object types can implement this interface and share tooling that understands the `launch` / `stop` / `health-check` lifecycle.

## Shared capabilities

Any skill implementing `runnable` must document:

| Capability | What it means |
|---|---|
| `launch` | Command to start the process (including env setup) |
| `stop` | Command to cleanly shut down (not `kill -9`) |
| `health-check` | How to verify the process is ready (curl, port-check, etc.) |

## Implementing this interface

Add to your skill's frontmatter:

```yaml
implements:
  - runnable
```

Then include a `## Run` section with the three capabilities above.
