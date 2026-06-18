---
name: generate-newsletter
description: Action skill that generates and distributes an AI-curated newsletter. Use when asked to run, trigger, test, or schedule newsletter generation via the y2-agent-api service.
type: action
platforms:
  - claude-code
  - codex
tags:
  - newsletter
  - agent
  - ai
version: 1.0.0
implements:
  - runnable
parameters:
  - name: topic
    baseType: string
    description: Newsletter topic or query (e.g. "AI infrastructure funding rounds")
    required: true
  - name: recipientList
    baseType: string
    description: Comma-separated email addresses or list slug
    required: true
  - name: dryRun
    baseType: boolean
    description: If true, generate content but do not send
    required: false
modifies:
  - newsletter-campaign
  - subscriber-log
links:
  - forwardName: runs-on
    reverseName: hosts
    target: hello-world
    cardinality: many-to-many
---

Triggers the y2-agent-api FastAPI service to orchestrate newsletter generation via Agno AI agents.

## Run

**Launch:**
```bash
cd /Users/tobalo/Development/y2/y2-agent-api
uv run python server.py &
```

**Health-check:**
```bash
curl -s http://localhost:8000/health | python3 -m json.tool
```

**Stop:**
```bash
kill $(lsof -ti:8000)
```

## Trigger (dry run)

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI infrastructure", "recipientList": "test@y2.dev", "dryRun": true}'
```
