---
name: buying-signals
description: >
  Detect B2B buying signals for prospect companies across multiple sources. ALWAYS use this
  skill when asked to analyze companies, detect buying signals, score prospects, or run
  signal detection pipelines for sales/marketing workflows.
last-updated: 2026-02-10
allowed-tools: Bash(./scripts/client.js:*)
---

# Buying Signals

Automated B2B buying-signal detection via the Alavida platform. Analyzes companies across web/news, landing pages, and social media — then scores them by buying intent.

> **Freshness check**: If more than 30 days have passed since the `last-updated` date above, check if the API or data models have changed.

## Overview

Submit a list of companies to the Alavida platform. The service detects buying signals from multiple sources, classifies them with AI, validates findings, and scores each company by buying intent.

**What it detects:**
- Funding announcements (seed through Series C+)
- Y Combinator batch participation
- Product/stealth launches
- Job postings (creative and marketing roles)
- Founder pain posts on social media
- Partnership announcements
- Conference speaking engagements

**Output:**
- Per-company tier assignment (Hot / Warm / Cool / Cold)
- Scored and classified signals with source URLs
- Personalization recommendations for outreach

## Setup

1. **Get an Alavida API key** from your account at https://app.alavida.ai

2. **Configure the key:**
   ```bash
   <skill-path>/scripts/client.js setup --key <your-api-key>
   ```
   Or set the environment variable: `export ALAVIDA_API_KEY=<your-api-key>`

3. **Requirements:** Node.js 18+ (uses native fetch). No other dependencies.

**Config priority** (highest to lowest):
1. `ALAVIDA_API_KEY` environment variable
2. `~/.config/alavida/config.json`

### Handling "API key not found" errors

**CRITICAL**: When you receive an "API key not found" error:

1. **Tell the user to run the setup command** — The setup is interactive and requires user input:
   ```bash
   <skill-path>/scripts/client.js setup
   ```

2. **Stop and wait** — Do not continue without a valid API key. Wait for the user to complete setup and confirm before proceeding.

3. **DO NOT** attempt to:
   - Search for API keys in config files or environment
   - Grep through directories
   - Construct complex shell commands to find credentials
   - Prepare job files before setup is complete

> **Note for agents**: All script paths in this document (e.g., `./scripts/client.js`) are relative to the skill directory where this SKILL.md file is located.

## Signal Types

| Signal Type | Weight | Recency Window | Description |
|-------------|--------|----------------|-------------|
| `founder_pain_post` | 100 | 14 days | Founder expressing need for creative/marketing help |
| `job_post_creative` | 90 | Active | Hiring designer, video editor, creative director |
| `funding_announcement` | 80 | 90 days | Recent funding round (seed through Series C+) |
| `yc_batch` | 80 | 60 days | Y Combinator company preparing for Demo Day |
| `stealth_launch` | 75 | 30 days | Company coming out of stealth or launching |
| `job_post_marketing` | 60 | Active | Hiring marketing roles (CMO, growth, demand gen) |
| `partnership_announced` | 50 | 60 days | New partnership or integration |
| `conference_speaking` | 40 | 30 days | Founder/exec speaking at conference |

**Notes:**
- Higher weights = stronger buying intent
- Signals outside recency window are discarded
- Multiple signals compound to higher scores

## Tier System

| Tier | Score Range | Meaning | Action |
|------|-------------|---------|--------|
| **Hot** | 150+ | Multiple high-intent signals | Prioritize immediately |
| **Warm** | 80-149 | Clear buying signals | Good outreach candidates |
| **Cool** | 40-79 | Some interest indicators | Monitor for more signals |
| **Cold** | <40 | No strong signals | Lowest priority |

## Common Actions

| User says... | Action |
|--------------|--------|
| "Analyze this company for signals" | Create JSON file, run `run <file.json>` |
| "Check buying signals for Acme Corp" | Prepare company data, run analysis |
| "Score these prospects" | Batch analyze with `run companies.json --poll` |
| "Is the service healthy?" | `health` |
| "What's my config?" | `config:show` |
| "Get results for job xyz" | `status <job_id>` |

## Workflow

Follow this workflow when analyzing companies:

1. **Check configuration first:**
   ```bash
   ./scripts/client.js config:show
   ```
   If no API key configured, run setup.

2. **Verify service is available:**
   ```bash
   ./scripts/client.js health
   ```

3. **Prepare input file** (JSON format — see [Input File Format](#input-file-format))

4. **Submit and wait for results:**
   ```bash
   ./scripts/client.js run companies.json --poll
   ```

   **Flags:**
   - `--poll`: Wait for job completion (recommended)
   - `--timeout <seconds>`: Polling timeout (default: 600s)
   - `--json`: Output raw JSON

5. **Or submit and check later:**
   ```bash
   ./scripts/client.js run companies.json
   # returns job_id
   ./scripts/client.js status <job_id>
   ```

6. **Review results** — The CLI displays:
   - Job status and progress
   - Per-company tier assignments and scores
   - Signal details by type with source URLs
   - Outreach recommendations

## Commands Reference

| Command | Description |
|---------|-------------|
| `setup` | Configure Alavida API key (interactive or `--key <key>`) |
| `config:show` | Show current config (key source, platform URL) |
| `health` | Check buying-signals service availability |
| `run <file.json>` | Submit companies for analysis |
| `run <file.json> --poll` | Submit and wait for results |
| `status <job_id>` | Get job status and results |

## Input File Format

JSON file with an array of companies, each optionally containing people:

**Minimal example:**
```json
{
  "companies": [
    {
      "company_id": "comp_123",
      "company_name": "Acme Corp",
      "domain": "acme.com",
      "website_url": "https://acme.com"
    }
  ]
}
```

**Full example:**
```json
{
  "companies": [
    {
      "company_id": "comp_123",
      "company_name": "Acme Corp",
      "domain": "acme.com",
      "website_url": "https://acme.com",
      "funding_stage": "Series A",
      "funding_total": 10000000,
      "employee_count": 50,
      "detected_verticals": ["B2B SaaS", "Developer Tools"],
      "icp_score": 0.85,
      "company_linkedin_url": "https://linkedin.com/company/acme",
      "company_twitter_handle": "@acmecorp",
      "people": [
        {
          "full_name": "Jane Doe",
          "job_title": "CEO & Founder",
          "role_type": "decision_maker",
          "linkedin_url": "https://linkedin.com/in/janedoe",
          "twitter_handle": "@janedoe"
        }
      ]
    }
  ]
}
```

**Company fields:**
- `company_id` (required): Unique identifier
- `company_name` (required): Company name
- `domain` (required): Domain (e.g., "acme.com")
- `website_url` (required): Full website URL
- `funding_stage`: e.g., "Seed", "Series A"
- `funding_total`: Total funding raised in USD
- `employee_count`: Number of employees
- `detected_verticals`: Industry verticals (array)
- `icp_score`: ICP match score 0.0-1.0
- `company_linkedin_url`: Company LinkedIn URL
- `company_twitter_handle`: Twitter handle with @

**Person fields:**
- `full_name` (required): Person's full name
- `job_title` (required): Job title
- `role_type` (required): "decision_maker" or "champion"
- `linkedin_url`: LinkedIn profile URL
- `twitter_handle`: Twitter handle with @

## Data Models

### Job Submission Response

```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "queued"
}
```

### Job Status Response

```json
{
  "job_id": "550e8400-...",
  "status": "completed",
  "progress": 100,
  "credits_used": 500,
  "created_at": "2026-02-10T12:00:00Z",
  "updated_at": "2026-02-10T12:01:30Z",
  "result": {
    "companies": [
      {
        "company_name": "Acme Corp",
        "company_id": "comp_123",
        "tier": "HOT",
        "total_score": 270,
        "signal_count": 8,
        "recommendation": "Strong buying intent. Prioritize for outreach.",
        "reasoning": "Multiple signals across funding, hiring, and social.",
        "signals": [
          {
            "type": "funding_announcement",
            "source_url": "https://techcrunch.com/...",
            "snippet": "Acme raised $10M Series A...",
            "confidence": 0.95,
            "pipeline": "web_news"
          }
        ]
      }
    ],
    "summary": {
      "total_companies": 3,
      "hot": 1,
      "warm": 1,
      "cool": 1,
      "cold": 0
    }
  }
}
```

## Pricing

Buying signals uses a credit-based pricing model:
- **Base cost:** 500 credits per run
- **Typical range:** 400-800 credits depending on signal density
- Credits are deducted after job completion

If your account has insufficient credits, the platform returns a `402` error before any work begins. Top up at https://app.alavida.ai/credits.

## Error Handling

### Common Errors

**"API key not found"**
- Run `./scripts/client.js setup` to configure your API key

**"Authentication failed" (401)**
- Your API key is invalid or expired
- Get a new key from https://app.alavida.ai

**"Insufficient credits" (402)**
- Your account doesn't have enough credits
- Top up at https://app.alavida.ai/credits

**"Service unavailable" (503)**
- The buying-signals service is temporarily down
- Try again in a few minutes

**"Job failed"**
- Check the error message in `./scripts/client.js status <job_id>`
- Some pipelines may fail while others succeed — partial results are still returned

### Partial Failures

The service uses partial failure tolerance:
- If one analysis source fails, others continue
- Results include both successful signals and notes about failures
- Credits are charged proportionally for partial results

## Examples

### Setup
```bash
./scripts/client.js setup --key ak_xxxxx
```

### Show configuration
```bash
./scripts/client.js config:show
```

### Check service health
```bash
./scripts/client.js health
```

### Analyze companies and wait for results
```bash
./scripts/client.js run companies.json --poll
```

### Submit and check later
```bash
./scripts/client.js run companies.json
# => Job ID: 550e8400-e29b-41d4-a716-446655440000

./scripts/client.js status 550e8400-e29b-41d4-a716-446655440000
```

### Get raw JSON output
```bash
./scripts/client.js run companies.json --poll --json > results.json
```

## Tips

- **Start with health check**: Always run `health` before submitting jobs
- **Test with one company first**: Validate your setup before batch processing
- **Use --poll**: Most useful for interactive analysis — submit and get results in one command
- **Personalization**: Use the `recommendation` field in results for outreach messaging
- **Top signals**: Review per-company signals for the best conversation hooks

## Integration with Claude Code

When asked to analyze prospects:
1. User provides company list or asks to analyze specific companies
2. Create input JSON file with company data
3. Run analysis: `./scripts/client.js run <file> --poll`
4. Review results and provide recommendations based on tiers and signals
5. Suggest outreach strategies based on top signals
