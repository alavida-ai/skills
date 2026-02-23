# Agonda Patterns Reference

Proven hook and plugin patterns from Agonda workbenches. Use these as templates — they're battle-tested.

## Pattern 1: .workbench Marker Discovery

**Problem:** Hooks need to find the active workspace without hardcoding paths.

**Solution:** Each workspace has a `.workbench` marker file. Scripts discover it via `find`:

```bash
MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: {workbench-name}" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")
  # Now use $WORKSPACE_DIR for all file access
fi
```

**Why:** Workspaces live under `workspace/active/` in various subdirectories. The marker pattern decouples hooks from the workspace path structure. If the workspace moves, the marker moves with it.

**Marker file format (.workbench):**
```yaml
workbench: {workbench-name}
domain: {domain}
created: {YYYY-MM-DD}
```

The `workbench` field must match the `name` in plugin.json exactly.

## Pattern 2: SessionStart Bootstrap

**Problem:** Agent needs context on entry — what's active, what learnings exist, where to resume.

**Solution:** SessionStart hook discovers workspace via marker, then reports status including workspace-scoped learnings:

```bash
#!/bin/bash
# session-start.sh

echo "=== {Workbench Display Name} ==="
echo ""

# Discover active workspace via .workbench marker
MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: {workbench-name}" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")

  if [ -f "$WORKSPACE_DIR/goal.md" ]; then
    GOAL=$(head -1 "$WORKSPACE_DIR/goal.md" | sed 's/^# //')
    echo "Active workspace: $GOAL"
    echo "  Path: $WORKSPACE_DIR"
  fi

  if [ -f "$WORKSPACE_DIR/progress.md" ]; then
    PHASE=$(grep -m1 "^## Current Phase" -A1 "$WORKSPACE_DIR/progress.md" 2>/dev/null | tail -1)
    echo "  Phase: $PHASE"
    STATUS=$(grep -m1 "^## Status" -A1 "$WORKSPACE_DIR/progress.md" 2>/dev/null | tail -1)
    echo "  Status: $STATUS"
  fi

  # Report learnings (workspace-scoped, NOT global)
  if [ -f "$WORKSPACE_DIR/learnings.md" ]; then
    COUNT=$(grep -c "^-" "$WORKSPACE_DIR/learnings.md" 2>/dev/null || echo "0")
    echo "  Learnings: $COUNT entries loaded."
  else
    echo "  WARNING: No learnings.md in workspace. Create one to capture institutional memory."
  fi
else
  echo "No active workspace. Start one to begin."
fi
```

**Key rules:**
- Keep it fast (< 2s). SessionStart runs on every session, including resume and compact.
- Learnings.md lives INSIDE the workspace directory, not at a global path. Every compound file is workspace-scoped.
- If no workspace exists, the orchestrator skill creates one — the hook just reports status.

## Pattern 3: Compound Attention Management

**Problem:** Agent drifts from the task plan during long sessions.

**Solution:** PreToolUse hook on Write|Edit injects the first 20 lines of task_plan.md before every file modification:

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "command",
      "command": "MARKER=$(find workspace/active -name '.workbench' -exec grep -l 'workbench: {workbench-name}' {} \\; 2>/dev/null | head -1); if [ -n \"$MARKER\" ]; then WS=$(dirname \"$MARKER\"); if [ -f \"$WS/task_plan.md\" ]; then head -20 \"$WS/task_plan.md\"; fi; else echo 'No active workspace'; fi",
      "timeout": 5,
      "statusMessage": "Reading task plan..."
    }
  ]
}
```

**Pair with PostToolUse compound reminder:**

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "command",
      "command": "echo '→ Update progress.md and task_plan.md with what just changed. Update learnings.md if you discovered something.'",
      "timeout": 5,
      "statusMessage": "Compound reminder"
    }
  ]
}
```

**Why this works:** The agent sees its plan before every write and gets reminded to update state after. The combination creates a self-correcting loop.

## Pattern 4: Governance Enforcement

**Problem:** Need to prevent writes to protected files (root CLAUDE.md, federal artifacts).

**Solution:** PreToolUse hook on Write|Edit that checks file paths:

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Block writes to root CLAUDE.md
if [ "$FILE_PATH" = "CLAUDE.md" ] || echo "$FILE_PATH" | grep -q "/CLAUDE.md$"; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Cannot write to CLAUDE.md without governance approval"}}'
  exit 0
fi

exit 0
```

**Key:** Use `permissionDecision: "deny"` (not exit 2) for structured blocking with a clear reason.

## Pattern 5: UserPromptSubmit Context Injection

**Problem:** Agent needs per-turn reminders without the overhead of PreToolUse hooks.

**Solution:** UserPromptSubmit hook injects workspace state before every prompt:

```bash
#!/bin/bash
# user-prompt.sh — runs on every user prompt

MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: {workbench-name}" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WS=$(dirname "$MARKER")
  if [ -f "$WS/progress.md" ]; then
    echo "CURRENT STATE:"
    head -10 "$WS/progress.md"
  fi
fi

exit 0
```

**Why:** Fires once per user prompt, not per tool call. Lighter than PreToolUse for general context.

## Pattern 6: Stop Completion Gate

**Problem:** Agent finishes without updating compound files.

**Solution:** Stop hook verifies compound state, blocks if stale:

```bash
#!/bin/bash
INPUT=$(cat)
ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active')

# Prevent infinite loops
if [ "$ACTIVE" = "true" ]; then
  exit 0
fi

WARNINGS=0

MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: {workbench-name}" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")

  # Check progress.md freshness (modified in last 10 minutes)
  if [ -f "$WORKSPACE_DIR/progress.md" ]; then
    if [ -z "$(find "$WORKSPACE_DIR/progress.md" -mmin -10 2>/dev/null)" ]; then
      echo "WARNING: progress.md may be stale" >&2
      WARNINGS=$((WARNINGS + 1))
    fi
  fi

  # Check learnings.md freshness (workspace-scoped)
  if [ -f "$WORKSPACE_DIR/learnings.md" ]; then
    if [ -z "$(find "$WORKSPACE_DIR/learnings.md" -mmin -10 2>/dev/null)" ]; then
      echo "WARNING: learnings.md not updated this session" >&2
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
fi

if [ "$WARNINGS" -gt 0 ]; then
  echo "$WARNINGS warning(s). Update compound files before ending." >&2
  exit 2
fi

exit 0
```

**Critical:** Always check `stop_hook_active` first. Without it, the hook creates an infinite loop.

## Pattern 7: plugin.json Template

**Complete template for Agonda workbenches:**

```json
{
  "name": "{workbench-name}",
  "version": "0.1.0",
  "description": "{What this workbench does — persona job-to-be-done}",
  "hooks": "./hooks/hooks.json",
  "skills": "./skills/"
}
```

**Rules:**
- `name` must be kebab-case, match the directory name
- `hooks` field MUST be present if hooks exist
- `skills` field included for explicitness (defaults to `./skills/`)
- No `mcpServers` unless the design specified MCP integrations
- No `author` field needed for internal workbenches

## Anti-Patterns

### Don't: Hardcode workspace paths

```bash
# BAD
head -20 workspace/active/architecture/my-project/task_plan.md

# GOOD
MARKER=$(find workspace/active -name '.workbench' -exec grep -l 'workbench: my-workbench' {} \; 2>/dev/null | head -1)
WS=$(dirname "$MARKER")
head -20 "$WS/task_plan.md"
```

### Don't: Use exit 2 when you want structured denial

```bash
# BAD — exit 2 discards all JSON, stderr is just a string
echo "Blocked" >&2
exit 2

# GOOD — structured denial with clear reason
echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Specific reason"}}'
exit 0
```

### Don't: Forget stop_hook_active check

```bash
# BAD — infinite loop
if [ ! -f "progress.md" ]; then
  echo "Missing progress.md" >&2
  exit 2
fi

# GOOD — check first
ACTIVE=$(cat | jq -r '.stop_hook_active')
if [ "$ACTIVE" = "true" ]; then exit 0; fi
# Then check...
```

### Don't: Use bare script paths in plugin hooks

```json
// BAD
"command": "bash hooks/session-start.sh"

// GOOD
"command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh\""
```

### Don't: Print debug output to stdout

```bash
# BAD — breaks JSON parsing
echo "Starting validation..."
echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow"}}'

# GOOD — debug to stderr
echo "Starting validation..." >&2
echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow"}}'
```
