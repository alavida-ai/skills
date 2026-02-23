---
name: plugin-authoring
description: >
  Reference skill for Claude Code plugin and hook authoring. Covers plugin.json schema, all 15 hook
  events, exit code semantics, matchers, environment variables, caching behavior, and proven Agonda
  patterns. Use when designing hooks, scaffolding plugins, validating hook configuration, or debugging
  hook behavior. Not a workflow — a knowledge base that other skills reference.
---

# Plugin Authoring Reference

Knowledge base for building correct Claude Code plugins and hooks. Read the quick reference below, then navigate to the detailed reference files as needed.

## Quick Reference

### plugin.json — Minimal Template

```json
{
  "name": "{name}",
  "version": "0.1.0",
  "description": "{what this plugin does}",
  "hooks": "./hooks/hooks.json",
  "skills": "./skills/"
}
```

Required field: `name`. The `hooks` field MUST be present for hooks to load. The `skills` field defaults to `./skills/` if omitted.

### hooks.json — Minimal Template

```json
{
  "description": "{what these hooks do}",
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh\"",
            "timeout": 10,
            "statusMessage": "Bootstrapping..."
          }
        ]
      }
    ]
  }
}
```

Three nesting levels: event → matcher group → hook handler array.

### Exit Code Cheat Sheet

| Exit Code | Meaning | Stdout | Stderr |
|-----------|---------|--------|--------|
| **0** | Success / allow | Parsed for JSON output | Ignored |
| **2** | Blocking error | Ignored | Fed back to Claude as error |
| **Other** | Non-blocking error | Ignored | Shown in verbose mode only |

## Reference Navigation

| Reference | Read when... |
|-----------|-------------|
| [plugin-structure.md](references/plugin-structure.md) | Creating plugin.json, understanding directory layout, debugging cache issues, checking activation flow |
| [hook-events.md](references/hook-events.md) | Choosing which events to hook, checking what input each event receives, understanding blocking behavior |
| [hook-types-and-output.md](references/hook-types-and-output.md) | Writing hook handlers, choosing command vs prompt vs agent, structuring JSON output, using hookSpecificOutput |
| [matchers-and-environment.md](references/matchers-and-environment.md) | Filtering when hooks fire, writing regex matchers, using environment variables, structuring hooks.json |
| [gotchas-and-debugging.md](references/gotchas-and-debugging.md) | Hooks not firing, unexpected behavior, cache not refreshing, debugging strategy, common pitfalls |
| [agonda-patterns.md](references/agonda-patterns.md) | Implementing workspace discovery, compound loops, governance enforcement, SessionStart bootstrap, using proven Agonda hook templates |
