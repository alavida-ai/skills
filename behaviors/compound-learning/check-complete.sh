#!/bin/bash
# Compound Learning — Stop hook
# Staleness gate: verifies compound state is current before session ends.

# ── Configurable values ──────────────────────────────────────────────────────
MARKER_VALUE="compound-learning"
EXIT_MODE=0          # 0 = soft gate (warn), 1 = hard block
STALENESS_MINUTES=10 # minutes before a file is considered stale
# ── End configurable values ──────────────────────────────────────────────────

WARNINGS=0

# Discover workspace via .workbench marker
MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: $MARKER_VALUE" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")

  # Check progress.md is current
  if [ -f "$WORKSPACE_DIR/progress.md" ]; then
    if [ "$(find "$WORKSPACE_DIR/progress.md" -mmin -$STALENESS_MINUTES 2>/dev/null)" ]; then
      echo "progress.md: up to date."
    else
      echo "WARNING: progress.md may be stale — update it so the next session can resume correctly."
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo "WARNING: No progress.md found. Create one so the next session knows where to resume."
    WARNINGS=$((WARNINGS + 1))
  fi

  # Check learnings.md was updated
  LEARNINGS="$WORKSPACE_DIR/learnings.md"
  if [ -f "$LEARNINGS" ]; then
    if [ "$(find "$LEARNINGS" -mmin -$STALENESS_MINUTES 2>/dev/null)" ]; then
      echo "learnings.md: updated this session."
    else
      echo "WARNING: learnings.md was not updated this session. Capture any patterns or issues you discovered."
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo "WARNING: No learnings.md found. Create one to capture institutional memory."
    WARNINGS=$((WARNINGS + 1))
  fi

  if [ "$WARNINGS" -gt 0 ]; then
    echo ""
    echo "$WARNINGS warning(s). Please address before ending session."
    exit $EXIT_MODE
  else
    echo ""
    echo "All checks passed. Session state is clean."
  fi
else
  echo "No active workspace. Nothing to check."
fi
