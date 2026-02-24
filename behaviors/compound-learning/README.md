# Compound Learning Behavior Pack

Lifecycle hooks that enforce compounding knowledge across sessions. Three scripts wire into SessionStart, UserPromptSubmit, and Stop events to ensure every session builds on prior work.

## What It Does

1. **Session start** — discovers active workspace(s) via `.workbench` marker, creates learnings.md if missing, reports goal/progress/phase, triggers the pipeline skill.
2. **User prompt** — lightweight per-message reminder to update learnings.md. Shows last-modified timestamp.
3. **Session stop** — staleness gate checks that progress.md and learnings.md were updated within the session. Warns or blocks if stale.

Handles multiple concurrent workspaces (lists them, asks user to disambiguate).

## Configurable Values

When adapting this pack for a workbench, the installing agent should change these values:

| Variable | Where | Example |
|----------|-------|---------|
| `WORKBENCH_NAME` | session-start.sh, user-prompt.sh | `"Knowledge Architect"` |
| `MARKER_VALUE` | all 3 scripts | `"knowledge-architect"` |
| `PIPELINE_TRIGGER` | session-start.sh | `"/governance:evolve"` |
| `LEARNINGS_TEMPLATE` | session-start.sh | Domain-specific section headings |
| `EXIT_MODE` | check-complete.sh | `0` (soft gate) or `1` (hard block) |
| `LEARNINGS_SCOPE` | check-complete.sh | `"workspace"` (workspace-scoped) or `"global"` (workspace/learnings.md) |

Variables are defined at the top of each script. The rest of the script logic is shared.

## hooks.json

The included `hooks.json` shows the event wiring. When adapting, the agent merges these entries into the workbench's existing hooks.json, updating `statusMessage` values to reference the workbench name.

## Files

- `session-start.sh` — SessionStart hook
- `user-prompt.sh` — UserPromptSubmit hook
- `check-complete.sh` — Stop hook
- `hooks.json` — Event wiring reference
