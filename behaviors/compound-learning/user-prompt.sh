#!/bin/bash
# Compound Learning — UserPromptSubmit hook
# Lightweight per-message reminder. Keep it short — this fires on every user message.

# ── Configurable values ──────────────────────────────────────────────────────
WORKBENCH_NAME="Compound Learning"
MARKER_VALUE="compound-learning"
PIPELINE_TRIGGER="/pipeline:start"
LEARNINGS_PROMPT="a pattern, a pain point, an insight"
# ── End configurable values ──────────────────────────────────────────────────

# Discover active workspace via .workbench marker
MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: $MARKER_VALUE" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")
  LEARNINGS="$WORKSPACE_DIR/learnings.md"

  echo "COMPOUND REMINDER: You are in the $WORKBENCH_NAME."

  # Check if learnings.md exists
  if [ -f "$LEARNINGS" ]; then
    LAST_MOD=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$LEARNINGS" 2>/dev/null || stat -c "%y" "$LEARNINGS" 2>/dev/null | cut -d'.' -f1)
    echo "  learnings.md last updated: $LAST_MOD"
  else
    echo "  WARNING: No learnings.md in workspace. Create one to capture patterns and pain points."
  fi

  echo "  If you just learned something — $LEARNINGS_PROMPT — update learnings.md NOW."
else
  echo "AGENT REMINDER: $WORKBENCH_NAME plugin is active but no workspace exists. Use $PIPELINE_TRIGGER to start."
fi
