---
name: echo-workflow
description: >
  Simple echo workflow for testing asynchronous workflow execution via the Alavida platform.
  Use this skill to verify async job processing is working correctly.
last-updated: 2026-02-10
---

# Echo Workflow Test

A simple echo workflow for testing asynchronous workflow execution through the Alavida platform.

## Overview

Submits a message to the Alavida platform as an async workflow job. The platform queues it, processes it through the echo component, and returns the result via job polling. Useful for verifying:
- Async job submission works
- Job status polling works
- Callback-based completion flows correctly
- Credit deduction after completion (this workflow is free)

## Usage

```bash
alavida run echo-workflow --input '{"message": "hello"}'
```

## Checking Status

```bash
alavida jobs status <job-id>
```

## Response

```json
{
  "echo": "hello",
  "received_at": "2026-02-10T12:00:00Z",
  "execution_mode": "async"
}
```

## Notes

- This is a **free** workflow — no credits are charged
- Uses **asynchronous** execution (job is queued, then completed via callback)
- Useful for smoke testing the full async pipeline
