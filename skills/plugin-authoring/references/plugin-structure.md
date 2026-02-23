# Plugin Structure Reference

Sourced from the official Claude Code plugins documentation.

## plugin.json Schema

The manifest file lives at `.claude-plugin/plugin.json`. If omitted, Claude Code auto-discovers components in default locations and derives the plugin name from the directory name.

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Unique identifier (kebab-case, no spaces). Used for skill namespacing. | `"workbench-builder"` |

### Metadata Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `version` | string | Semantic version (MAJOR.MINOR.PATCH) | `"0.1.0"` |
| `description` | string | Brief explanation of plugin purpose | `"Creator workbench for building workbenches"` |
| `author` | object | Author info: `name`, `email`, `url` | `{"name": "Alex"}` |
| `homepage` | string | Documentation URL | `"https://docs.example.com"` |
| `repository` | string | Source code URL | `"https://github.com/user/plugin"` |
| `license` | string | License identifier | `"MIT"` |
| `keywords` | array | Discovery tags | `["governance", "workbench"]` |

### Component Path Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `commands` | string\|array | `./commands/` | Additional command files/directories |
| `agents` | string\|array | `./agents/` | Additional agent files |
| `skills` | string\|array | `./skills/` | Additional skill directories |
| `hooks` | string\|array\|object | `./hooks/hooks.json` | Hook config paths or inline config |
| `mcpServers` | string\|array\|object | `./.mcp.json` | MCP config paths or inline config |
| `lspServers` | string\|array\|object | `./.lsp.json` | LSP server configurations |
| `outputStyles` | string\|array | `./styles/` | Output style files |

**Critical:** Custom paths supplement default directories — they don't replace them. All paths must be relative to plugin root and start with `./`.

## Directory Layout

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          ← ONLY manifest goes here
├── skills/                  ← At plugin root, NOT inside .claude-plugin/
│   └── my-skill/
│       └── SKILL.md
├── hooks/                   ← At plugin root
│   ├── hooks.json
│   └── session-start.sh
├── agents/                  ← At plugin root (if needed)
├── commands/                ← At plugin root (if needed)
├── .mcp.json                ← At plugin root (if needed)
└── scripts/                 ← At plugin root (if needed)
```

**Common mistake:** Putting `commands/`, `agents/`, `skills/`, or `hooks/` inside `.claude-plugin/`. Only `plugin.json` belongs there.

## Caching Behavior

This is the most misunderstood part of plugin development:

1. **Marketplace plugins are cached.** Claude Code copies marketplace plugins to `~/.claude/plugins/cache/` at install time. Changes to the source won't take effect until you update.

2. **Hooks are snapshotted at startup.** Claude Code captures a snapshot of all hook configurations when a session starts. Mid-session changes to hooks.json or settings files trigger a warning and require review in `/hooks` before they apply.

3. **`${CLAUDE_PLUGIN_ROOT}` resolves to the cache directory** for marketplace plugins, not the original source. For `--plugin-dir` loaded plugins, it resolves to the original directory.

4. **Version bumps are required** to trigger cache refresh for marketplace plugins. If you change plugin code without bumping the version in plugin.json, users won't see the changes.

5. **`--plugin-dir` bypasses caching.** During development, use `claude --plugin-dir ./my-plugin` to load plugins directly without caching.

### Path Traversal Limitation

Installed plugins cannot reference files outside their directory. Paths like `../shared-utils` won't work after installation because those external files aren't copied to the cache. Use symlinks within the plugin directory if external access is needed.

## Activation Flow

1. Claude Code starts (or resumes a session)
2. Settings files are read to find `enabledPlugins`
3. For each enabled plugin, Claude Code locates the plugin directory
4. `plugin.json` is parsed for component paths (or defaults are used)
5. Components are loaded: skills registered, hooks merged, MCP servers started
6. Hooks snapshot is captured — this is what runs for the session
7. SessionStart hooks fire

## The hooks Field

Claude Code auto-discovers `hooks/hooks.json` at the default location — the `hooks` field in plugin.json is **not required** when using the default path. The field becomes required when:

- Hooks file is at a non-default path (e.g., `"hooks": "./config/hooks.json"`)
- Multiple hook files needed (e.g., `"hooks": ["./hooks/hooks.json", "./extra.json"]`)
- Inline hook config (e.g., `"hooks": { "hooks": { "Stop": [...] } }`)

**Best practice:** Include it explicitly anyway — it makes the plugin self-documenting and removes ambiguity when debugging.

## Skill Namespacing

Plugin skills are namespaced by the plugin `name`. A skill folder `skills/build/` in a plugin named `workbench-builder` becomes `/workbench-builder:build`. This prevents conflicts when multiple plugins define skills with the same name.
