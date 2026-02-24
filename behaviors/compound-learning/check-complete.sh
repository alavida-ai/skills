#!/bin/bash
# Compound Learning — Stop hook
# Staleness gate: verifies compound state is current before session ends.

# ── Configurable values ──────────────────────────────────────────────────────
MARKER_VALUE="compound-learning"
EXIT_MODE=0          # 0 = soft gate (warn), 1 = hard block
STALENESS_MINUTES=10 # minutes before a file is considered stale
# ── End configurable values ──────────────────────────────────────────────────

WARNINGS=0
STALE_FILES=""

# Helper: human-readable file age
file_age() {
  local file="$1"
  local mod_epoch
  mod_epoch=$(stat -f "%m" "$file" 2>/dev/null || stat -c "%Y" "$file" 2>/dev/null)
  if [ -n "$mod_epoch" ]; then
    local now_epoch
    now_epoch=$(date +%s)
    local diff_min=$(( (now_epoch - mod_epoch) / 60 ))
    if [ "$diff_min" -lt 60 ]; then
      echo "${diff_min}m ago"
    else
      echo "$(( diff_min / 60 ))h ${diff_min_mod=$((diff_min % 60))}m ago"
    fi
  fi
}

# Discover workspace via .workbench marker
MARKER=$(find workspace/active -name ".workbench" -exec grep -l "workbench: $MARKER_VALUE" {} \; 2>/dev/null | head -1)

if [ -n "$MARKER" ]; then
  WORKSPACE_DIR=$(dirname "$MARKER")

  # Check progress.md is current
  if [ -f "$WORKSPACE_DIR/progress.md" ]; then
    if [ "$(find "$WORKSPACE_DIR/progress.md" -mmin -$STALENESS_MINUTES 2>/dev/null)" ]; then
      echo "progress.md: up to date."
    else
      AGE=$(file_age "$WORKSPACE_DIR/progress.md")
      echo "WARNING: progress.md is stale (last updated $AGE) — update it so the next session can resume correctly."
      STALE_FILES="$STALE_FILES progress.md"
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo "WARNING: No progress.md found. Create one so the next session knows where to resume."
    STALE_FILES="$STALE_FILES progress.md"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Check learnings.md was updated
  LEARNINGS="$WORKSPACE_DIR/learnings.md"
  if [ -f "$LEARNINGS" ]; then
    if [ "$(find "$LEARNINGS" -mmin -$STALENESS_MINUTES 2>/dev/null)" ]; then
      echo "learnings.md: updated this session."
    else
      AGE=$(file_age "$LEARNINGS")
      echo "WARNING: learnings.md is stale (last updated $AGE) — capture any patterns or issues you discovered."
      STALE_FILES="$STALE_FILES learnings.md"
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo "WARNING: No learnings.md found. Create one to capture institutional memory."
    STALE_FILES="$STALE_FILES learnings.md"
    WARNINGS=$((WARNINGS + 1))
  fi

  if [ "$WARNINGS" -gt 0 ]; then
    echo ""
    echo "$WARNINGS warning(s). Update before ending:$STALE_FILES"
    exit $EXIT_MODE
  else
    echo ""
    echo "All checks passed. Session state is clean."
  fi
else
  echo "No active workspace. Nothing to check."
fi
