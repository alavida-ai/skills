---
name: skill-authoring
description: >
  Guide for authoring skills in the Agonda system. Covers two skill templates
  (CLI/API and knowledge processing), YAML frontmatter spec, progressive disclosure
  patterns, config management, and shipping checklists. Use when creating a new
  skill, validating skill structure, or understanding skill conventions.
last-updated: 2026-02-23
---

# Skill Authoring

How to design, structure, and ship a skill in the Agonda system.

## What Is a Skill?

A skill is a self-contained capability owned by a domain. It wraps a CLI, API, workflow, or text processing pipeline behind a standardized interface so any domain can adopt it without understanding its internals. The SKILL.md file is the contract — agents navigate to it, read it, and act. Skills are written for LLM consumption first, human consumption second.

Skills are NOT standalone programs. They are documented interfaces backed by an implementation (a script, an API client, a workflow, or a knowledge processing pipeline).

## Two Skill Templates

Choose the template that fits. If your skill calls external APIs or wraps a CLI, use CLI/API. If your skill reads/writes markdown files and transforms knowledge, use knowledge processing.

| Template | Use When | Sections | Tools | Example Skills |
|----------|----------|----------|-------|----------------|
| **CLI/API** | Wrapping an external API, CLI tool, or deployed service | 13 sections | `Bash(./scripts/...)` | buying-signals, icp-discovery, lead-discovery |
| **Knowledge Processing** | Processing text — extracting, connecting, or validating knowledge files | 8 sections | `Read, Write, Edit, Grep, Glob` | reduce, reflect, verify |

**Detailed templates:** See [cli-api-template.md](references/cli-api-template.md) and [knowledge-processing-template.md](references/knowledge-processing-template.md).

## YAML Frontmatter Spec

Every SKILL.md requires frontmatter. This is what agents read to decide whether to activate a skill.

```yaml
---
name: my-skill
description: >
  One-paragraph description with explicit trigger phrases.
  "ALWAYS use this skill when asked to [do X], [do Y], or [do Z]."
last-updated: 2026-02-10
allowed-tools: Bash(./scripts/my-skill.js:*)
---
```

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | Kebab-case identifier. Must match directory name. Knowledge processing skills use `domain:skill-name` format. |
| `description` | Yes | Multi-line with explicit trigger conditions. This is the primary triggering mechanism — agents match against it. |
| `last-updated` | Yes | ISO-8601 date. Drives freshness checks. |
| `allowed-tools` | Yes | Exact tool permissions, scoped as tightly as possible. Never grant `Bash(*)`. |
| `based-on` | No | Lineage reference when adapting a published base skill. Format: `github.com/{org}/{repo}/{skill-name}@v{semver}` |

**Trigger phrasing matters.** Use explicit language: "ALWAYS use this skill when asked to..." followed by concrete actions. Vague descriptions mean agents won't find the skill.

**Tool scoping matters.** `Bash(./scripts/my-skill.js:*)` allows only the skill's own script. `Read, Write, Edit, Grep, Glob` for knowledge processing. Never over-grant.

## Progressive Disclosure

Skills use a three-level loading system to manage context efficiently:

| Level | What Loads | When | Size Target |
|-------|-----------|------|-------------|
| **1. Metadata** | `name` + `description` from frontmatter | Always in context | ~100 words |
| **2. SKILL.md body** | Full instructions and workflow | When skill triggers | <500 lines |
| **3. References** | `references/`, `templates/`, `scripts/` | As needed during execution | Unlimited |

Keep SKILL.md body to the essentials and under 500 lines. Split detailed content into `references/` files. Always reference split-out files from SKILL.md with clear descriptions of when to read them.

**Key principle:** When a skill supports multiple variations, keep only the core workflow and selection guidance in SKILL.md. Move variant-specific details into separate reference files. Keep references one level deep — all reference files link directly from SKILL.md.

## Skill Directory Layout

```
skill-name/
├── SKILL.md              # Required — the skill contract
├── scripts/              # Optional — CLI entry points
│   └── skill-name.js
├── references/           # Optional — detail docs loaded on demand
│   └── topic.md
├── templates/            # Optional — output templates
│   └── template.html
└── assets/               # Optional — files used in output (images, fonts)
```

The SKILL.md is the interface. Everything else is implementation detail. Do not create README.md, CHANGELOG.md, or other auxiliary files — the skill should only contain what an agent needs to do the job.

## Writing for Agents

- **Common Actions table** — map natural language ("User says X") to commands or actions. This is how agents match user intent.
- **Numbered workflows** — agents follow numbered sequences reliably. Number every step.
- **TypeScript for data models** — document request/response shapes using TypeScript notation. Use union types for enums, `?` for optional fields, inline comments for format hints.
- **Freshness notice** — include near the top: "If more than 30 days since `last-updated`, verify the API or data models haven't changed."

## Reference Files

| File | Contents | Read when |
|------|----------|-----------|
| [cli-api-template.md](references/cli-api-template.md) | 13-section document structure, config management patterns, CLI patterns, output modes, testing patterns | Building a skill that wraps an API or CLI tool |
| [knowledge-processing-template.md](references/knowledge-processing-template.md) | 8-section document structure, key differences from CLI/API, quality gates, methodology | Building a skill that processes knowledge files |
| [checklists.md](references/checklists.md) | Shipping checklists for both templates | Final validation before shipping any skill |

## Skill Creation Process

1. **Understand** — gather concrete examples of how the skill will be used. What would a user say to trigger it?
2. **Plan resources** — identify reusable scripts, references, and assets. What does an agent need to execute repeatedly?
3. **Write SKILL.md** — frontmatter first (name, description, triggers), then body following the appropriate template.
4. **Build references** — split detailed content into `references/` files. Keep SKILL.md lean.
5. **Test with real tasks** — use the skill on actual work, notice struggles, iterate.
6. **Ship** — validate against the appropriate checklist in [checklists.md](references/checklists.md).
