# Alavida Skills

Skills for the [Alavida](https://alavida.ai) platform. Install with [skills.sh](https://skills.sh):

```bash
npx skills add alavida-ai/skills@buying-signals
```

## Available Skills

| Skill | Description |
|-------|-------------|
| `buying-signals` | Detect B2B buying signals for prospect companies across web, social, and news sources |
| `echo` | Simple echo tool for testing synchronous execution |
| `echo-workflow` | Simple echo workflow for testing asynchronous execution |

## Structure

```
skills/
├── buying-signals/
│   ├── SKILL.md
│   └── scripts/
│       └── client.js
├── echo/
│   └── SKILL.md
└── echo-workflow/
    └── SKILL.md
```

## How It Works

Skills are instructions + thin client scripts that tell coding agents (Claude Code, Cursor, Codex, etc.) how to interact with Alavida platform components. The actual component logic runs server-side — these files just provide the interface.

Install a skill and it becomes available in your coding agent's context automatically.
