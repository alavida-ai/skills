# Alavida Skills

AI agent skills for B2B sales intelligence. Built for founders, SDRs, and GTM teams who want their coding agent to do prospect research that would take a human hours — in minutes.

Built by [Alavida](https://alavida.ai). Skills run on the Alavida platform — your agent handles the interface, we handle the heavy lifting server-side.

## What are Skills?

Skills are markdown files that give AI coding agents (Claude Code, Cursor, Codex, etc.) specialized workflows backed by cloud infrastructure. Install a skill and your agent gains a new capability — no API wrangling, no prompt engineering, no infra setup.

The skill tells your agent *what* to do. The Alavida platform does the actual work: orchestrating web scrapers, social media analysis, news monitoring, and AI scoring pipelines. Results come back to your agent automatically.

## Available Skills

| Skill | Description |
|-------|-------------|
| [buying-signals](skills/buying-signals/) | Detect B2B buying signals for prospect companies across web, social, and news sources |

### Buying Signals

Analyze companies for purchase intent across multiple data sources. The platform monitors:

- **Founder pain posts** — founders publicly expressing need for help (highest signal)
- **Job postings** — hiring for creative, marketing, or growth roles
- **Funding announcements** — recent rounds from seed through Series C+
- **Y Combinator activity** — batch companies preparing for Demo Day
- **Stealth launches** — companies coming out of stealth or launching products
- **Partnerships** — new integrations or strategic partnerships
- **Conference speaking** — founders and execs on stage at events

Each company gets scored and tiered: **HOT** (act now), **WARM** (strong candidate), **COOL** (worth monitoring), or **COLD** (low priority).

```
"Analyze Stripe, Vercel, and Linear for buying signals"
→ Runs buying-signals skill

"Score these 20 companies from my CRM export"
→ Processes companies.json through buying-signals

"Find hot leads from this list and draft outreach"
→ Uses buying-signals results to prioritize and personalize
```

## Installation

### Option 1: CLI Install (Recommended)

Install with [skills.sh](https://skills.sh):

```bash
npx skills add alavida-ai/skills
```

Or install a specific skill:

```bash
npx skills add alavida-ai/skills --skill buying-signals
```

### Option 2: Clone and Copy

```bash
git clone https://github.com/alavida-ai/skills.git
cp -r skills/skills/* .claude/skills/
```

### Option 3: Git Submodule

```bash
git submodule add https://github.com/alavida-ai/skills.git .claude/alavida-skills
```

### Option 4: Fork and Customize

1. Fork this repository
2. Customize skills for your workflow
3. Clone your fork into your projects

## Setup

After installing, authenticate with the Alavida platform:

```bash
npm install -g @alavida/cli
alavida auth
```

Verify your connection:

```bash
alavida auth status
alavida credits
```

## Usage

Once installed, your coding agent can use skills through natural language:

```
"Analyze Acme Corp for buying signals"
"Score these prospect companies and tell me which ones are hot"
"Research buying intent for companies in my pipeline"
```

Or run directly via the CLI:

```bash
# Single company
alavida run buying-signals --input '{
  "companies": [{"company_id": "acme-1", "company_name": "Acme Corp", "domain": "acme.com"}]
}' --poll

# From a file
alavida run buying-signals --input companies.json --poll

# Submit and check later
alavida run buying-signals --input companies.json
alavida jobs status <job-id>
```

## Pricing

Skills run on Alavida credits. Each buying-signals run costs ~500 credits per company, charged after completion based on actual usage.

Check your balance anytime:

```bash
alavida credits
```

## Contributing

Have an idea for a new skill or a way to improve an existing one? PRs and issues welcome.

## License

[MIT](LICENSE)
