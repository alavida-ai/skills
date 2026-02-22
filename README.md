# Alavida Skills

Give your coding agent superpowers it wasn't born with. Sales intelligence that takes a human hours — done in minutes. Architecture knowledge from an O'Reilly book — available on demand. Diagrams that belong in a presentation — generated from a single sentence.

Built by [Alavida](https://alavida.ai). Each skill is a markdown file that plugs into Claude Code, Cursor, Codex, or any agent that reads system prompts. No API wrangling. No prompt engineering. Just install and go.

## Available Skills

| Skill | What it does | Requires |
|-------|-------------|----------|
| [buying-signals](skills/buying-signals/) | Score companies by purchase intent across web, social, and news | [Alavida CLI](https://alavida.ai) |
| [agentic-mesh](skills/agentic-mesh/) | Reference guide for designing agent ecosystems and mesh architectures | Nothing — works offline |
| [visual-explainer](skills/visual-explainer/) | Turn any explanation into a styled, interactive HTML page | A browser |

---

### Buying Signals

**Stop guessing which prospects are ready to buy.**

Your agent scans companies across the web, social media, job boards, news, and landing pages — then scores each one by actual buying intent. You get a prioritized list with evidence, not hunches.

The Alavida platform does the heavy lifting server-side: orchestrating scrapers, monitoring signals, and running AI scoring pipelines. Your agent submits companies and gets back scored, tiered results automatically.

**What it detects:**

- **Founder pain posts** — founders publicly asking for help (highest signal, hardest to find manually)
- **Creative/marketing hires** — job postings that reveal budget and ambition
- **Funding rounds** — seed through Series C+, fresh capital looking for deployment
- **YC batch activity** — companies preparing for Demo Day with urgency to ship
- **Stealth launches** — the brief window when companies need everything at once
- **New partnerships** — integrations that signal growth and new needs
- **Conference speaking** — founders and execs with public visibility and momentum

Every company gets a score and a tier — **HOT**, **WARM**, **COOL**, or **COLD** — so you know exactly where to spend your time.

```
"Analyze Stripe, Vercel, and Linear for buying signals"
"Score these 20 companies from my CRM export"
"Find the hot leads and draft personalized outreach"
```

---

### Agentic Mesh

**The architectural playbook for building agent ecosystems — inside your agent.**

Based on *Agentic Mesh* (Falconer, O'Reilly 2025), this skill gives your agent deep knowledge of how to design, deploy, and govern multi-agent systems. It's not a tool that runs code — it's a reference library your agent consults when you're making architectural decisions.

Ask your agent about agent patterns, trust frameworks, fleet management, or mesh infrastructure, and it draws from 15 chapters of curated material covering:

- **Agent architecture** — the 4-component anatomy (brain, memory, context, tools), 4 agent types, and a catalog of 27 patterns across communication, roles, and organizational structures
- **Enterprise reliability** — why naive agent chains fail at scale (0.99^1000 = 0.004% accuracy) and the decomposition strategy that fixes it
- **Seven-layer trust framework** — from cryptographic identity to governance bodies, the full stack for securing agent interactions
- **Mesh platform design** — registry, marketplace, workbenches, proxy, and the lifecycle from draft to retired
- **Operating model** — team structures, agent factories, DevSecOps for agents, and the five-workstream implementation roadmap

```
"How should I structure a multi-agent system for our data pipeline?"
"What patterns exist for agent-to-agent communication?"
"Design a trust framework for our internal agent fleet"
```

Your agent reads the specific reference file it needs for each question — not the entire book — so responses stay focused and grounded in the source material.

---

### Visual Explainer

**Your agent's output deserves better than ASCII art.**

Every coding agent defaults to box-drawing characters and pipe-delimited tables when you ask for a diagram. It works for trivial cases. For anything real — a system architecture, a 15-row comparison table, a diff review — it's unreadable.

Visual Explainer makes your agent generate self-contained HTML pages instead. Real typography. Dark and light theme support. Interactive Mermaid diagrams with zoom and pan. Styled data tables you'd actually put in a presentation. One file, no build step, opens in your browser.

**It activates automatically.** When your agent is about to dump a complex table in the terminal (4+ rows or 3+ columns), it renders HTML instead. You don't have to ask.

**What it generates:**

- **Architecture diagrams** — CSS Grid cards with flow arrows, or Mermaid for topology-focused views
- **Flowcharts and pipelines** — automatic node positioning and edge routing via Mermaid
- **Sequence diagrams** — lifelines, messages, activation boxes, all laid out automatically
- **Data tables** — sticky headers, row hover, status badges, responsive scroll
- **ER / schema diagrams** — entity relationships with auto-routed connection lines
- **Dashboards** — KPI cards, sparklines, Chart.js charts, trend indicators
- **Diff reviews** — before/after architecture, code review with Good/Bad/Ugly, decision log
- **Plan reviews** — cross-references claims against the actual codebase, flags gaps and risks

Ships with five prompt templates: `/generate-web-diagram`, `/diff-review`, `/plan-review`, `/project-recap`, and `/fact-check`.

```
"Draw a diagram of our authentication flow"
"Review the diff on this branch"
"Compare this plan against the codebase and flag risks"
```

Created by [@nicobailon](https://github.com/nicobailon). MIT licensed.

---

## Versioning

Each skill is versioned independently using [semantic versioning](https://semver.org/). Git tags use the format `{skill-name}/v{semver}` to avoid collisions in a multi-skill repo.

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Breaking (removed sections, renamed templates, changed workflow) | Major | `v1.0.0` → `v2.0.0` |
| Additive (new templates, new references, new sections) | Minor | `v1.0.0` → `v1.1.0` |
| Bug fixes, library version bumps | Patch | `v1.0.0` → `v1.0.1` |

Tag a new version when: templates change, references update, workflow changes, or libraries bump. Every tagged release should have a corresponding `CHANGELOG.md` entry in the skill's directory.

```bash
# Example: tag a new visual-explainer release
git tag visual-explainer/v1.1.0
git push origin visual-explainer/v1.1.0
```

## For Downstream Consumers

Skills in this repo are **base skills** — other projects adapt them for specific contexts (e.g., a workbench-specific visualization skill that wraps `visual-explainer` with domain conventions).

Adapted skills declare lineage via a `based-on` field in their SKILL.md frontmatter:

```yaml
based-on: github.com/alavida-ai/skills/visual-explainer@v1.0.0
```

When tagging a new version, consider downstream impact — adapted skills pin to a specific version and need to explicitly absorb updates.

---

## Installation

### Option 1: CLI Install (Recommended)

Install with [skills.sh](https://skills.sh):

```bash
npx skills add alavida-ai/skills
```

Or install a specific skill:

```bash
npx skills add alavida-ai/skills --skill buying-signals
npx skills add alavida-ai/skills --skill agentic-mesh
npx skills add alavida-ai/skills --skill visual-explainer
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

**Buying Signals** requires the Alavida CLI:

```bash
npm install -g @alavida/cli
alavida auth
```

Verify your connection:

```bash
alavida auth status
alavida credits
```

**Agentic Mesh** and **Visual Explainer** work out of the box — no authentication or external services needed.

## Pricing

Buying Signals runs on Alavida credits (~500 credits per company, charged after completion). Check your balance anytime:

```bash
alavida credits
```

Agentic Mesh and Visual Explainer are free. They run entirely within your agent.

## Contributing

Have an idea for a new skill or a way to improve an existing one? PRs and issues welcome.

## License

[MIT](LICENSE)
