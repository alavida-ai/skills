# Matchers and Environment Reference

How to filter when hooks fire and what environment is available to hook scripts.

## Matcher Syntax

The `matcher` field is a **regex string** that filters when hooks fire. Use `"*"`, `""`, or omit `matcher` entirely to match all occurrences.

### Per-Event Matcher Targets

| Event | What Matcher Filters | Example Values |
|-------|---------------------|----------------|
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest` | Tool name | `Bash`, `Edit\|Write`, `mcp__.*` |
| `SessionStart` | How session started | `startup`, `resume`, `clear`, `compact` |
| `SessionEnd` | Why session ended | `clear`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other` |
| `Notification` | Notification type | `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog` |
| `SubagentStart`, `SubagentStop` | Agent type | `Bash`, `Explore`, `Plan`, custom agent names |
| `ConfigChange` | Config source | `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills` |
| `PreCompact` | What triggered compaction | `manual`, `auto` |

### Events Without Matcher Support

These events always fire on every occurrence. Adding a `matcher` is silently ignored:

- `UserPromptSubmit`
- `Stop`
- `TeammateIdle`
- `TaskCompleted`

### Regex Patterns

Standard regex. Matched against a field from the JSON input.

| Pattern | Matches |
|---------|---------|
| `Bash` | Only Bash tool |
| `Edit\|Write` | Edit or Write tool |
| `mcp__memory__.*` | All tools from memory MCP server |
| `mcp__.*__write.*` | Any write tool from any MCP server |
| `Notebook.*` | Any tool starting with Notebook |
| `startup` | Only new sessions (not resume/clear/compact) |

MCP tools follow the naming pattern `mcp__<server>__<tool>`.

## hooks.json Structure

Three nesting levels:

```json
{
  "description": "Optional description of what these hooks do",
  "hooks": {
    "EventName": [           // Level 1: Event name
      {                      // Level 2: Matcher group
        "matcher": "regex",
        "hooks": [           // Level 3: Hook handler array
          {
            "type": "command",
            "command": "...",
            "timeout": 10,
            "statusMessage": "..."
          }
        ]
      }
    ]
  }
}
```

**Rules:**
- Each event maps to an **array** of matcher groups
- Each matcher group has one `matcher` (optional) and one `hooks` array
- The `hooks` array contains one or more hook handlers
- All matching hooks run **in parallel**
- Identical handlers are deduplicated automatically
- The top-level `description` field is optional (for plugin hooks)

### Multiple Matchers Per Event

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "validate-writes.sh" }]
      },
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "validate-commands.sh" }]
      }
    ]
  }
}
```

## Environment Variables

Available to all hook scripts:

| Variable | Value | Available In |
|----------|-------|-------------|
| `CLAUDE_PROJECT_DIR` | Project root directory | All hooks |
| `CLAUDE_PLUGIN_ROOT` | Plugin root directory | Plugin hooks only |
| `CLAUDE_ENV_FILE` | File path for persisting env vars | SessionStart only |
| `CLAUDE_CODE_REMOTE` | `"true"` if web environment, unset if CLI | All hooks |

### CLAUDE_PLUGIN_ROOT

**Critical for plugin scripts.** Resolves to the plugin's cached directory for marketplace plugins, or the original directory for `--plugin-dir` loaded plugins.

**Always use it for script references:**
```json
"command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh\""
```

**Never use bare relative paths:**
```json
"command": "bash hooks/session-start.sh"
```

Bare paths depend on the working directory and break when the user navigates to a different directory during the session.

### CLAUDE_ENV_FILE

SessionStart-only. Write `export` statements to persist environment variables for the session:

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
fi
```

Use `>>` (append) to preserve variables set by other hooks.

## Common Input Fields

All hooks receive these fields via stdin as JSON:

```json
{
  "session_id": "uuid",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default|plan|acceptEdits|dontAsk|bypassPermissions",
  "hook_event_name": "PreToolUse"
}
```

Event-specific fields are added alongside these. See hook-events.md for per-event input schemas.

## Hook Locations and Scoping

| Location | Scope | Shareable |
|----------|-------|-----------|
| `~/.claude/settings.json` | All projects | No (local to machine) |
| `.claude/settings.json` | Single project | Yes (committable) |
| `.claude/settings.local.json` | Single project | No (gitignored) |
| Managed policy settings | Organization-wide | Yes (admin-controlled) |
| Plugin `hooks/hooks.json` | When plugin enabled | Yes (bundled with plugin) |
| Skill/agent frontmatter | While component active | Yes (defined in component) |

Plugin hooks merge with user and project hooks. All matching hooks from all sources run in parallel.

### Hooks in Skill/Agent Frontmatter

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh"
---
```

Scoped to the component's lifetime. Cleaned up when it finishes. For subagents, `Stop` hooks are automatically converted to `SubagentStop`.
