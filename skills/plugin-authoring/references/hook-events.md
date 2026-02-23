# Hook Events Reference

Complete catalog of all 15 Claude Code hook events, sourced from official documentation.

## Event Catalog

| Event | When It Fires | Can Block? | Matcher Target | Category |
|-------|--------------|------------|----------------|----------|
| `SessionStart` | Session begins or resumes | No | Session source: `startup`, `resume`, `clear`, `compact` | Session |
| `SessionEnd` | Session terminates | No | Exit reason: `clear`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other` | Session |
| `UserPromptSubmit` | User submits prompt, before Claude processes | Yes | No matcher (always fires) | User |
| `PreToolUse` | Before a tool call executes | Yes | Tool name: `Bash`, `Edit`, `Write`, `Read`, `Glob`, `Grep`, `Task`, `WebFetch`, `WebSearch`, `mcp__*` | Tool |
| `PostToolUse` | After a tool call succeeds | No (feedback only) | Tool name (same as PreToolUse) | Tool |
| `PostToolUseFailure` | After a tool call fails | No | Tool name (same as PreToolUse) | Tool |
| `PermissionRequest` | Permission dialog appears | Yes | Tool name (same as PreToolUse) | Tool |
| `Stop` | Main agent finishes responding | Yes | No matcher (always fires) | Agent |
| `SubagentStart` | Subagent spawns | No | Agent type: `Bash`, `Explore`, `Plan`, custom agent names | Agent |
| `SubagentStop` | Subagent finishes | Yes | Agent type (same as SubagentStart) | Agent |
| `TeammateIdle` | Agent team teammate about to go idle | Yes | No matcher (always fires) | Team |
| `TaskCompleted` | Task being marked as completed | Yes | No matcher (always fires) | Team |
| `ConfigChange` | Configuration file changes during session | Yes | Config source: `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills` | System |
| `PreCompact` | Before context compaction | No | Trigger: `manual`, `auto` | System |
| `Notification` | Claude Code sends a notification | No | Notification type: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog` | System |

## Per-Event Detail

### SessionStart

**When:** Session begins or resumes.
**Blocking:** No (exit 2 shows stderr to user only).
**Matcher:** Session source — `startup`, `resume`, `clear`, `compact`.

**Input fields** (beyond common):
- `source` — how session started
- `model` — model identifier
- `agent_type` — present if started with `claude --agent <name>`

**Output:** Stdout text or `additionalContext` in hookSpecificOutput added as context for Claude. Also has access to `CLAUDE_ENV_FILE` for persisting environment variables.

**Agonda use:** Bootstrap workbench environment, inject learnings, report workspace status.

---

### SessionEnd

**When:** Session terminates.
**Blocking:** No.
**Matcher:** Exit reason — `clear`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other`.

**Input fields** (beyond common):
- `reason` — why session ended

**Output:** No decision control. Cleanup only.

**Agonda use:** Logging, cleanup.

---

### UserPromptSubmit

**When:** User submits a prompt, before Claude processes it.
**Blocking:** Yes (exit 2 blocks prompt and erases it).
**Matcher:** None — always fires on every prompt.

**Input fields** (beyond common):
- `prompt` — the text the user submitted

**Output:** Plain text stdout or `additionalContext` added as context. JSON `decision: "block"` with `reason` prevents processing.

**Agonda use:** Inject contextual reminders, validate prompt scope, add workspace state to each turn.

---

### PreToolUse

**When:** Before a tool call executes.
**Blocking:** Yes (exit 2 blocks the tool call).
**Matcher:** Tool name — `Bash`, `Edit`, `Write`, `Read`, `Glob`, `Grep`, `Task`, `WebFetch`, `WebSearch`, `mcp__*`.

**Input fields** (beyond common):
- `tool_name` — name of the tool
- `tool_input` — tool-specific parameters (see official docs for per-tool schema)
- `tool_use_id` — unique identifier for this tool call

**Output via hookSpecificOutput:**
- `permissionDecision` — `"allow"`, `"deny"`, or `"ask"`
- `permissionDecisionReason` — shown to user (allow/ask) or Claude (deny)
- `updatedInput` — modify tool parameters before execution
- `additionalContext` — added to Claude's context

**Agonda use:** Guard writes, inject task plan before edits, validate frontmatter, block writes to root files.

---

### PostToolUse

**When:** After a tool call succeeds.
**Blocking:** No (tool already ran). Feedback via `decision: "block"` shows reason to Claude.
**Matcher:** Tool name (same as PreToolUse).

**Input fields** (beyond common):
- `tool_name`, `tool_input`, `tool_use_id`
- `tool_response` — the result the tool returned

**Output:** `decision: "block"` with `reason` provides feedback. `additionalContext` adds context.

**Agonda use:** Compound reminders, progress tracking nudges.

---

### PostToolUseFailure

**When:** After a tool call fails.
**Blocking:** No.
**Matcher:** Tool name (same as PreToolUse).

**Input fields** (beyond common):
- `tool_name`, `tool_input`, `tool_use_id`
- `error` — string describing what went wrong
- `is_interrupt` — boolean, whether failure was user interruption

**Output:** `additionalContext` provides context about the failure.

**Agonda use:** Error logging.

---

### PermissionRequest

**When:** Permission dialog is about to be shown to the user.
**Blocking:** Yes (can auto-approve or auto-deny).
**Matcher:** Tool name (same as PreToolUse).

**Input fields** (beyond common):
- `tool_name`, `tool_input`
- `permission_suggestions` — array of "always allow" options

**Output via hookSpecificOutput:**
- `decision.behavior` — `"allow"` or `"deny"`
- `decision.updatedInput` — modify tool input (allow only)
- `decision.updatedPermissions` — apply permission rules (allow only)
- `decision.message` — tell Claude why denied (deny only)

**Agonda use:** Auto-approve trusted patterns.

---

### Stop

**When:** Main agent finishes responding (not on user interrupt).
**Blocking:** Yes (exit 2 or `decision: "block"` prevents stopping).
**Matcher:** None — always fires.

**Input fields** (beyond common):
- `stop_hook_active` — `true` if Claude is already continuing from a previous Stop hook
- `last_assistant_message` — text of Claude's final response

**Output:** `decision: "block"` with `reason` (required) tells Claude to continue.

**Critical:** Check `stop_hook_active` to prevent infinite loops. If your hook always blocks, Claude never stops.

**Agonda use:** Verify compound phases complete, check learnings updated, gate session completion.

---

### SubagentStart

**When:** Subagent spawns via Task tool.
**Blocking:** No (shows stderr to user only).
**Matcher:** Agent type — `Bash`, `Explore`, `Plan`, custom agent names.

**Input fields** (beyond common):
- `agent_id` — unique identifier
- `agent_type` — agent type name

**Output:** `additionalContext` injected into the subagent.

---

### SubagentStop

**When:** Subagent finishes.
**Blocking:** Yes (same as Stop).
**Matcher:** Agent type (same as SubagentStart).

**Input fields** (beyond common):
- `stop_hook_active`, `agent_id`, `agent_type`
- `agent_transcript_path` — path to subagent's transcript
- `last_assistant_message` — subagent's final response text

**Output:** Same as Stop — `decision: "block"` with `reason`.

---

### TeammateIdle

**When:** Agent team teammate about to go idle.
**Blocking:** Yes (exit 2 sends stderr as feedback, teammate continues).
**Matcher:** None — always fires.

**Input fields** (beyond common):
- `teammate_name` — name of the idle teammate
- `team_name` — name of the team

**Output:** Exit code only — no JSON decision control.

---

### TaskCompleted

**When:** Task being marked as completed (via TaskUpdate or teammate finishing with in-progress tasks).
**Blocking:** Yes (exit 2 prevents completion, stderr fed back as feedback).
**Matcher:** None — always fires.

**Input fields** (beyond common):
- `task_id`, `task_subject`
- `task_description` (optional)
- `teammate_name`, `team_name` (optional)

**Output:** Exit code only — no JSON decision control.

---

### ConfigChange

**When:** Configuration file changes during a session.
**Blocking:** Yes (except `policy_settings` which cannot be blocked).
**Matcher:** Config source — `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills`.

**Input fields** (beyond common):
- `source` — which config type changed
- `file_path` — path to the changed file

**Output:** `decision: "block"` with `reason` prevents the change.

---

### PreCompact

**When:** Before context compaction.
**Blocking:** No (shows stderr to user only).
**Matcher:** Trigger — `manual`, `auto`.

**Input fields** (beyond common):
- `trigger` — `"manual"` or `"auto"`
- `custom_instructions` — user instructions for manual compact (empty for auto)

---

### Notification

**When:** Claude Code sends a notification.
**Blocking:** No (shows stderr to user only).
**Matcher:** Notification type — `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`.

**Input fields** (beyond common):
- `message` — notification text
- `title` — optional title
- `notification_type` — which type fired

**Output:** `additionalContext` adds context to the conversation.
