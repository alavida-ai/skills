# Hook Types and Output Reference

How hook handlers work, how to choose between them, and how to structure output.

## Hook Handler Types

### Command Hook (`type: "command"`)

Runs a shell command. Receives JSON input on stdin. Communicates via exit codes and stdout JSON.

```json
{
  "type": "command",
  "command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/my-script.sh\"",
  "timeout": 10,
  "statusMessage": "Running validation..."
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"command"` |
| `command` | Yes | Shell command to execute |
| `timeout` | No | Seconds before canceling (default: 600) |
| `statusMessage` | No | Custom spinner message |
| `async` | No | If `true`, runs in background without blocking |
| `once` | No | If `true`, runs only once per session (skills/agents only) |

**When to use:** Most hooks. Shell scripts are fast, predictable, and testable.

### Prompt Hook (`type: "prompt"`)

Sends input to a Claude model for single-turn evaluation. Returns `{ "ok": true/false, "reason": "..." }`.

```json
{
  "type": "prompt",
  "prompt": "Does this change follow ownership rules? $ARGUMENTS",
  "timeout": 30
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"prompt"` |
| `prompt` | Yes | Prompt text. `$ARGUMENTS` is replaced with hook input JSON |
| `model` | No | Model to use (defaults to a fast model) |
| `timeout` | No | Seconds before canceling (default: 30) |

**When to use:** Semantic validation hard to express as shell logic. Not supported for TeammateIdle.

### Agent Hook (`type: "agent"`)

Spawns a subagent with tool access (Read, Grep, Glob). Up to 50 tool-use turns. Returns `{ "ok": true/false, "reason": "..." }`.

```json
{
  "type": "agent",
  "prompt": "Verify this edit maintains frontmatter compliance. $ARGUMENTS",
  "timeout": 60
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"agent"` |
| `prompt` | Yes | Prompt text. `$ARGUMENTS` is replaced with hook input JSON |
| `model` | No | Model to use (defaults to a fast model) |
| `timeout` | No | Seconds before canceling (default: 60) |

**When to use:** Verification that requires inspecting files or test output. Not supported for TeammateIdle.

## Choosing the Right Type

| Criterion | Command | Prompt | Agent |
|-----------|---------|--------|-------|
| Speed | Fast (ms) | Medium (~2-5s) | Slow (~10-60s) |
| Deterministic | Yes | No | No |
| Can read files | Via shell commands | No | Yes (Read, Grep, Glob) |
| Can modify state | Yes | No | No |
| Testable standalone | `bash script.sh < input.json` | No | No |
| Cost | Free | API call | Multiple API calls |

**Rule of thumb:** Start with command hooks. Only use prompt/agent when you need semantic judgment that shell logic can't express.

## Exit Code Semantics

### Exit 0 — Success

- Action proceeds
- Stdout parsed for JSON output fields
- For most events, stdout only visible in verbose mode (`Ctrl+O`)
- **Exceptions:** `UserPromptSubmit` and `SessionStart` — stdout added as context Claude can see

### Exit 2 — Blocking Error

- Stdout ignored (all JSON in stdout is discarded)
- Stderr fed back to Claude as error message
- Effect depends on event (see blocking table in hook-events.md)

### Any Other Exit Code — Non-blocking Error

- Stderr shown in verbose mode only
- Execution continues normally
- Hook is treated as if it didn't run

**Critical rule:** You must choose one approach per hook — exit codes alone, OR exit 0 with JSON. Exit 2 with JSON doesn't work; the JSON is ignored.

## JSON Output Schema

On exit 0, stdout is parsed for a JSON object. Must contain ONLY the JSON object — shell profile output will break parsing.

### Universal Fields (All Events)

| Field | Default | Description |
|-------|---------|-------------|
| `continue` | `true` | If `false`, Claude stops processing entirely |
| `stopReason` | none | Message shown to user when `continue` is `false` |
| `suppressOutput` | `false` | If `true`, hides stdout from verbose mode |
| `systemMessage` | none | Warning message shown to user |

### Decision Control Patterns

Different events use different patterns:

**Pattern 1: Top-level `decision`**
Used by: `UserPromptSubmit`, `PostToolUse`, `PostToolUseFailure`, `Stop`, `SubagentStop`, `ConfigChange`

```json
{
  "decision": "block",
  "reason": "Explanation shown to Claude"
}
```

To allow: omit `decision` from JSON, or exit 0 without JSON.

**Pattern 2: hookSpecificOutput with permissionDecision**
Used by: `PreToolUse`

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Cannot write to root CLAUDE.md"
  }
}
```

Values: `"allow"` (bypass permissions), `"deny"` (block), `"ask"` (prompt user).

Additional fields:
- `updatedInput` — modify tool parameters before execution
- `additionalContext` — added to Claude's context

**Pattern 3: hookSpecificOutput with decision.behavior**
Used by: `PermissionRequest`

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow",
      "updatedInput": { "command": "npm run lint" }
    }
  }
}
```

**Pattern 4: Exit code only**
Used by: `TeammateIdle`, `TaskCompleted`

No JSON decision control. Exit 2 with stderr feedback to block.

### hookSpecificOutput by Event

| Event | hookSpecificOutput Fields |
|-------|--------------------------|
| `SessionStart` | `additionalContext` |
| `UserPromptSubmit` | `additionalContext` |
| `PreToolUse` | `permissionDecision`, `permissionDecisionReason`, `updatedInput`, `additionalContext` |
| `PermissionRequest` | `decision.behavior`, `decision.updatedInput`, `decision.updatedPermissions`, `decision.message`, `decision.interrupt` |
| `PostToolUse` | `additionalContext`, `updatedMCPToolOutput` |
| `PostToolUseFailure` | `additionalContext` |
| `SubagentStart` | `additionalContext` |
| `Stop` | (uses top-level `decision`/`reason`) |
| `SubagentStop` | (uses top-level `decision`/`reason`) |
| `Notification` | `additionalContext` |

## Async Hooks

Add `"async": true` to command hooks to run in background:

```json
{
  "type": "command",
  "command": "/path/to/long-running.sh",
  "async": true,
  "timeout": 120
}
```

- Only `type: "command"` supports async
- Cannot block or return decisions (action already proceeded)
- Output delivered on next conversation turn via `systemMessage` or `additionalContext`
- Each execution creates a separate background process
