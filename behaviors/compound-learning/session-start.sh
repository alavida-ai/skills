#!/bin/bash
# Compound Learning — SessionStart hook
# Discovers active workspaces, bootstraps learnings, reports status.

# ── Configurable values ──────────────────────────────────────────────────────
WORKBENCH_NAME="Compound Learning"
MARKER_VALUE="compound-learning"
PIPELINE_TRIGGER="/pipeline:start"
LEARNINGS_PATH="workspace/learnings.md"
LEARNINGS_TEMPLATE='# Learnings

Institutional memory. Updated continuously — every session should add to this.

## Insights
- {Patterns that work well, methodology applied in practice}

## Process Improvements
- {Friction points, what should be streamlined}

## System Patterns
- {Cross-cutting patterns, decisions that generalize}
'
# ── End configurable values ──────────────────────────────────────────────────

echo "=== $WORKBENCH_NAME ==="
echo ""

# Create learnings.md if missing
if [ ! -f "$LEARNINGS_PATH" ]; then
  mkdir -p "$(dirname "$LEARNINGS_PATH")"
  echo "$LEARNINGS_TEMPLATE" > "$LEARNINGS_PATH"
  echo "Created $LEARNINGS_PATH — update it throughout this session."
else
  COUNT=$(grep -c "^-" "$LEARNINGS_PATH" 2>/dev/null || echo "0")
  echo "Learnings: $COUNT entries loaded from previous efforts."
fi

echo ""

# Discover ALL active workspaces via .workbench marker
MARKERS=$(find workspace/active -name ".workbench" -exec grep -l "workbench: $MARKER_VALUE" {} \; 2>/dev/null)
MARKER_COUNT=$(echo "$MARKERS" | grep -c "." 2>/dev/null || echo "0")

if [ "$MARKER_COUNT" -gt 1 ]; then
  echo "MULTIPLE ACTIVE WORKSPACES FOUND ($MARKER_COUNT):"
  echo ""
  INDEX=1
  echo "$MARKERS" | while read -r MARKER; do
    WS=$(dirname "$MARKER")
    GOAL="(no goal.md)"
    if [ -f "$WS/goal.md" ]; then
      GOAL=$(head -1 "$WS/goal.md" | sed 's/^# //')
    fi
    PHASE="unknown"
    if [ -f "$WS/progress.md" ]; then
      PHASE=$(grep -m1 "^## Current Phase" -A1 "$WS/progress.md" 2>/dev/null | tail -1)
    fi
    echo "  $INDEX. $GOAL"
    echo "     Path: $WS"
    echo "     Phase: $PHASE"
    INDEX=$((INDEX + 1))
  done
  echo ""
  echo "ACTION REQUIRED: Ask the user which workspace to resume, or whether to start new."

elif [ "$MARKER_COUNT" -eq 1 ]; then
  MARKER=$(echo "$MARKERS" | head -1)
  WORKSPACE_DIR=$(dirname "$MARKER")

  if [ -f "$WORKSPACE_DIR/goal.md" ]; then
    GOAL=$(head -1 "$WORKSPACE_DIR/goal.md" | sed 's/^# //')
    echo "Active workspace: $GOAL"
    echo "  Path: $WORKSPACE_DIR"
  else
    echo "Active workspace exists but has no goal.md."
    echo "  Path: $WORKSPACE_DIR"
  fi

  if [ -f "$WORKSPACE_DIR/progress.md" ]; then
    PHASE=$(grep -m1 "^## Current Phase" -A1 "$WORKSPACE_DIR/progress.md" 2>/dev/null | tail -1)
    STATUS=$(grep -m1 "^## Status" -A1 "$WORKSPACE_DIR/progress.md" 2>/dev/null | tail -1)
    echo "  Phase: $PHASE"
    echo "  Status: $STATUS"
  fi

  if [ -f "$WORKSPACE_DIR/learnings.md" ]; then
    COUNT=$(grep -c "^-" "$WORKSPACE_DIR/learnings.md" 2>/dev/null || echo "0")
    echo "  Learnings: $COUNT entries loaded."
  fi

else
  echo "No active workspace. Ready to start a new effort."
fi

echo ""
echo "→ Triggering $PIPELINE_TRIGGER pipeline orchestrator."
