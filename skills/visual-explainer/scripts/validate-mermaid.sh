#!/usr/bin/env bash
# validate-mermaid.sh — Validate Mermaid diagram syntax via mmdc
#
# Usage:
#   ./validate-mermaid.sh diagram.mmd     # validate a file
#   echo "graph LR; A-->B" | ./validate-mermaid.sh   # validate stdin
#
# Exit codes:
#   0 — valid (or mmdc not installed — non-blocking skip)
#   2 — invalid syntax (stderr has the error details)

set -euo pipefail

TMP=""
cleanup() { [ -n "$TMP" ] && rm -f "$TMP"; }
trap cleanup EXIT

# Non-blocking if mmdc not available
if ! command -v mmdc &>/dev/null; then
  echo "mmdc not found — skipping validation" >&2
  exit 0
fi

# Accept file path or stdin
if [ $# -ge 1 ] && [ -f "$1" ]; then
  INPUT="$1"
else
  TMP="$(mktemp /tmp/mermaid-validate-XXXXXX.mmd)"
  cat > "$TMP"
  INPUT="$TMP"
fi

# Run mmdc — output to /dev/null, capture stderr
if mmdc -i "$INPUT" -o /dev/null 2>&1; then
  exit 0
else
  echo "Mermaid syntax error in: ${1:-stdin}" >&2
  exit 2
fi
