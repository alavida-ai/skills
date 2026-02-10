---
name: echo
description: >
  Simple echo tool for testing synchronous tool execution via the Alavida platform.
  Use this skill to verify your Alavida setup is working correctly.
last-updated: 2026-02-10
---

# Echo Test Tool

A simple echo tool for testing synchronous tool execution through the Alavida platform.

## Overview

Sends a message to the Alavida platform's echo component and returns it back. Useful for verifying:
- API key authentication works
- Platform routing is functional
- Credit deduction flows correctly (this tool is free)

## Usage

```bash
alavida run echo --action echo --input '{"message": "hello"}'
```

## Response

```json
{
  "echo": "hello",
  "received_at": "2026-02-10T12:00:00Z"
}
```

## Notes

- This is a **free** tool — no credits are charged
- Uses **synchronous** execution (instant response)
- Useful for smoke testing your Alavida CLI setup
