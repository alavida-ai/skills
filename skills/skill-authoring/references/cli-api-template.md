# CLI/API Skill Template

The 13-section template for skills that wrap external APIs, CLI tools, or deployed services. Use this template when your skill calls external endpoints, requires API keys, or wraps a CLI script.

## Document Sections (In Order)

Below the YAML frontmatter, the SKILL.md follows this section order:

| # | Section | Required | Purpose |
|---|---------|----------|---------|
| 1 | **Title + Summary** | Yes | H1 heading + one-line description |
| 2 | **Overview** | Yes | What the skill does, its sources/inputs, and its outputs |
| 3 | **Setup** | Yes | How to configure the skill (API keys, endpoints, dependencies) |
| 4 | **Domain Concepts** | If applicable | Domain-specific reference tables (signal types, tier systems, etc.) |
| 5 | **Common Actions** | Yes | "User says X -> do Y" mapping table |
| 6 | **Workflow** | Yes | Numbered step-by-step for the primary use case |
| 7 | **Commands Reference** | Yes | Every CLI command with flags and descriptions |
| 8 | **Input Format** | If applicable | Schema for input files (JSON, YAML, etc.) with examples |
| 9 | **Data Models** | If applicable | TypeScript-style type definitions for request/response payloads |
| 10 | **Output Format** | Yes | What the skill produces — formatted and raw variants |
| 11 | **Examples** | Yes | Copy-paste-ready command examples |
| 12 | **Error Handling** | Yes | Common errors, causes, and fixes |
| 13 | **Tips** | Optional | Best practices and optimization advice |

### Freshness Check

Include a freshness notice near the top of the document:

```markdown
> **Freshness check**: If more than 30 days have passed since the `last-updated`
> date above, check if the API or data models have changed.
```

Adjust the threshold (30 days, 60 days, etc.) based on how fast the underlying API or system changes.

---

## Config Management Patterns

Skills that wrap external APIs or services need configuration (API keys, endpoints, feature flags). Follow this pattern.

### Config Priority Cascade

Define a clear priority order from highest to lowest:

```
1. Environment variables     (highest — overrides everything)
2. Project-local config      (./.my-skill/config.json)
3. User-global config        (~/.config/my-skill/config.json)
```

Document this cascade explicitly in the Setup section so agents and users know which config wins.

### Interactive Setup Command

Provide a `setup` command that handles first-time configuration:

```bash
# Interactive — prompts for each value
./scripts/my-skill.js setup

# Non-interactive — for CI or scripting
./scripts/my-skill.js setup --key <api-key> --endpoint <url> --location <global|local>
```

Both modes must be supported. Interactive for humans, non-interactive for automation.

### Config Validation

Provide commands to inspect and verify configuration:

| Command | Purpose |
|---------|---------|
| `config:show` | Display current config (source, endpoint, masked key) |
| `config:test` | Validate the API key / credentials against the live service |

### Credential Safety

Document what agents must NOT do when credentials are missing:

```markdown
### Handling "API key not found" errors

**CRITICAL**: When you receive an "API key not found" error:
1. Tell the user to run the setup command
2. Stop and wait — do not continue without valid credentials
3. DO NOT attempt to search for API keys in config files or environment
```

This prevents agents from grepping through the filesystem looking for secrets.

---

## CLI Implementation Patterns

Skills expose functionality through a CLI script. Follow these patterns.

### Command Structure

Use a flat command namespace with colon-separated groups:

```
my-skill <command> [args] [flags]
```

| Pattern | Example | When to use |
|---------|---------|-------------|
| Simple verb | `health`, `setup` | Standalone actions |
| Colon-grouped | `config:show`, `config:test` | Related sub-actions |
| Verb + argument | `run <file>`, `status <id>` | Actions on a target |

### Standard Commands

Every CLI/API skill should implement these baseline commands:

| Command | Purpose |
|---------|---------|
| `setup` | First-time configuration |
| `config:show` | Display current configuration |
| `config:test` | Validate credentials |
| `health` | Check connectivity / dependencies |

Domain-specific commands (like `run`, `status`) are added on top of these.

### Flags

Use long-form flags with consistent naming:

| Flag | Purpose |
|------|---------|
| `--json` | Output raw JSON instead of formatted display |
| `--key <value>` | Pass credentials inline (for non-interactive setup) |
| `--endpoint <url>` | Override API endpoint |

### Script Path Convention

All scripts live in a `scripts/` directory relative to the SKILL.md:

```
skills/my-skill/
├── SKILL.md
└── scripts/
    └── my-skill.js
```

In the SKILL.md, reference scripts with relative paths and include a note for agents:

```markdown
> **Note for agents**: All script paths (e.g., `./scripts/my-skill.js`) are
> relative to the skill directory where this SKILL.md file is located.
```

---

## Output Modes

Every skill must support two output modes:

1. **Formatted (default)** — Human-readable output with visual structure (tables, panels, tree views). This is what agents present to users.
2. **JSON (`--json` flag)** — Machine-readable raw output for programmatic consumption or piping.

Example formatted output pattern:

```
Job Summary
--------------------------------------------
Job ID:     abc-123
Status:     COMPLETED
Duration:   12.3s
--------------------------------------------
```

Use box-drawing characters, status icons, and indented trees to make output scannable. Agents interpret structured text well.

---

## Testing Patterns

### Pre-flight Checks

Before any real operation, the skill workflow should verify the environment:

1. **Check configuration** — `config:show` to confirm credentials exist
2. **Verify connectivity** — `health` to confirm the API/service is reachable
3. **Test with minimal input** — run one small operation before batch processing

Document this as the first three steps of the Workflow section.

### Error Categories

Organize errors into predictable categories:

| Category | Example | Agent action |
|----------|---------|-------------|
| **Auth errors** | "API key not found", "Invalid API key" | Direct user to `setup` or credential renewal |
| **Connectivity errors** | "API server not reachable" | Run `health`, check endpoint with `config:show` |
| **Quota errors** | "Insufficient credits" | Report which service, suggest top-up |
| **Partial failures** | "Pipeline X failed" | Report failure details, note that other results may still be valid |

### Partial Failure Tolerance

Skills that call multiple backends should handle partial failures gracefully:

- If one pipeline/source fails, others continue
- Results include both successes and failure details
- Clearly surface which parts failed and why
- Total output may be incomplete — document this expectation

---

## Common Actions Table Pattern

Include a mapping of natural language to commands. This is how agents match user intent to skill actions:

```markdown
| User says... | Action |
|--------------|--------|
| "Check the health of X" | `health` |
| "Set up my credentials" | `setup` |
| "Process this data" | Create input file, run `run <file>` |
| "What's the status of job Y?" | `status <job_id>` |
```

---

## Data Models as TypeScript

Document request/response shapes using TypeScript notation — agents parse it reliably:

```typescript
{
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: ResultPayload | null;
  error?: string | null;
  created_at: string;  // ISO 8601
}
```

Use union types for enums, `?` for optional fields, and inline comments for format hints.
