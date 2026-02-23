# Knowledge Processing Skill Template

A lighter template for skills that process knowledge files — extracting insights, discovering connections, or validating quality. These skills use Read/Write/Edit/Grep/Glob directly. No CLI wrapping, no API keys, no external endpoints.

Adapted from the Ars Contexta skill pattern (reduce, reflect, verify) — processing pipeline skills that transform text with quality gates encoded directly in the skill file.

## YAML Frontmatter

```yaml
---
name: governance:my-skill
description: >
  One-paragraph description with trigger phrases.
  "Use this skill when asked to [do X], [do Y]."
last-updated: 2026-02-19
allowed-tools: Read, Write, Edit, Grep, Glob
---
```

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | `domain:skill-name` format |
| `description` | Yes | Multi-line with explicit trigger conditions |
| `last-updated` | Yes | ISO-8601 date |
| `allowed-tools` | Yes | Typically `Read, Write, Edit, Grep, Glob` — no Bash needed |

## Document Sections (In Order)

| # | Section | Required | Purpose |
|---|---------|----------|---------|
| 1 | **Title + Summary** | Yes | H1 heading + one-line description of what the skill does |
| 2 | **Execute Now** | Yes | Immediate action instructions — what to do when invoked. This is the entry point agents read first. |
| 3 | **Context Loading** | Yes | What to read before processing: which `.claude/rules/`, domain CLAUDE.md files, `taxonomy/` entries. Agents load this context to make informed decisions. |
| 4 | **Methodology** | Yes | Why the skill works the way it does. Processing philosophy, design rationale, tradeoffs. |
| 5 | **Quality Gates** | Yes | How to judge output quality. Measurable thresholds (e.g., skip rate <10%). What "good enough" looks like. |
| 6 | **Output Format** | Yes | What the skill produces — file format, frontmatter, location, naming convention. |
| 7 | **Handoff** | Yes | What happens next in the pipeline. Which skill or process consumes this output. |
| 8 | **Constraints** | Yes | Never/always rules. Ownership boundaries. What the skill must not do. |

---

## Key Differences from CLI/API Template

| Aspect | CLI/API Skill | Knowledge Processing Skill |
|--------|--------------|---------------------------|
| Setup | API keys, endpoints, config cascade | None — reads `.claude/rules/` and CLAUDE.md for config |
| Commands | CLI commands with flags | No CLI — uses Read/Write/Edit/Grep/Glob directly |
| Data Models | TypeScript request/response schemas | Markdown frontmatter + prose |
| Quality | Error handling for API failures | Quality gates for content (skip rate, calibration) |
| Entry point | Common Actions table | Execute Now section |
| Methodology | Not included | Required — explains processing philosophy |
| Testing | Pre-flight checks (config, health, minimal run) | Context loading verification, quality gate calibration |
| Error handling | Auth, connectivity, quota, partial failures | Constraint violations, ownership boundary breaches |

---

## Section Writing Guide

### Execute Now

This section replaces the Common Actions table from CLI/API skills. It gives agents immediate, concrete instructions when the skill is invoked.

```markdown
## Execute Now

1. Read the input file provided by the user
2. Load context (see Context Loading below)
3. Process each section using the methodology
4. Write output to the specified location
5. Report quality gate results
```

Keep it to numbered steps. Agents follow numbered sequences reliably.

### Context Loading

List every file the skill needs to read before processing. Be explicit — agents load exactly what you specify:

```markdown
## Context Loading

Before processing, read:
1. `.claude/rules/ownership.md` — write permission boundaries
2. `domains/{domain}/CLAUDE.md` — domain scope and knowledge index
3. `taxonomy/domain-concepts.md` — shared vocabulary
```

### Methodology

Explain **why**, not just **what**. This section justifies the processing approach:

```markdown
## Methodology

This skill uses progressive extraction: scan for high-confidence patterns first,
then revisit ambiguous sections with accumulated context. This avoids the "first
pass blindness" problem where early sections lack context from later content.
```

### Quality Gates

Define measurable thresholds. Agents need numbers, not vibes:

```markdown
## Quality Gates

| Gate | Threshold | Action if failed |
|------|-----------|-----------------|
| Skip rate | <10% of input sections | Review skipped sections, justify each |
| Confidence distribution | No more than 30% "low" | Revisit low-confidence items with additional context |
| Cross-reference density | At least 1 link per output section | Add connections to existing knowledge |
```

### Handoff

Name the next step in the pipeline explicitly:

```markdown
## Handoff

Output is consumed by `/governance:reflect` which discovers connections
between the extracted knowledge and existing domain artifacts.
```

### Constraints

Never/always rules. Ownership boundaries. What the skill must not do:

```markdown
## Constraints

- NEVER write directly to another domain's `knowledge/` directory
- ALWAYS propose cross-domain changes as workspace notes
- NEVER remove existing knowledge — mark as superseded with provenance
- ALWAYS include source citations linking back to workspace material
```
