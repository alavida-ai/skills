# Gotchas and Debugging Reference

Top pitfalls, debugging strategy, and version bump protocol. Sourced from official docs and hard-won Agonda experience.

## Top 10 Pitfalls

### 1. Hooks file at a non-default location

**Symptom:** Hooks don't fire even though hooks.json exists and is valid.

**Cause:** Claude Code auto-discovers `hooks/hooks.json` at the default location. But if your hooks file is elsewhere (e.g., `./config/hooks.json`), you MUST declare it in plugin.json — otherwise it won't be found.

**The rule:**
- `hooks/hooks.json` at plugin root → auto-discovered, `hooks` field optional
- Any other path → `hooks` field required in plugin.json
- Multiple hook files → pass an array: `"hooks": ["./hooks/hooks.json", "./extra-hooks.json"]`

**Best practice:** Include the `hooks` field explicitly for self-documentation, even at the default path:
```json
{
  "name": "my-plugin",
  "hooks": "./hooks/hooks.json",
  "skills": "./skills/"
}
```

### 2. Cache not refreshing after changes

**Symptom:** You edited hooks.json or a script, but behavior hasn't changed.

**Cause:** Hooks are snapshotted at session startup. Mid-session changes require review via `/hooks`. For marketplace plugins, cache updates require a version bump.

**Fix:**
- During development: restart the session, or use `--plugin-dir` to bypass caching
- For marketplace plugins: bump version in plugin.json, then reinstall
- Mid-session: use `/hooks` to review and accept changes

### 3. Exit code confusion (0 vs 2 vs other)

**Symptom:** Hook blocks when it shouldn't, or doesn't block when it should.

**Cause:** Mixing up exit code semantics.

**Fix:** Memorize the trio:
- **Exit 0** = success, proceed, parse stdout for JSON
- **Exit 2** = blocking error, stderr fed to Claude, stdout IGNORED
- **Any other** = non-blocking error, stderr in verbose mode, hook treated as if it didn't run

**Critical:** Exit 2 ignores all stdout. If you write JSON to stdout and exit 2, the JSON is discarded.

### 4. Stop hook infinite loops

**Symptom:** Claude never stops. Session runs indefinitely.

**Cause:** Stop hook always exits 2 or always returns `decision: "block"` without checking `stop_hook_active`.

**Fix:** Always check the `stop_hook_active` field:
```bash
INPUT=$(cat)
ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active')

if [ "$ACTIVE" = "true" ]; then
  # Already continuing from a Stop hook — don't block again
  exit 0
fi

# Your actual checks here...
```

### 5. Stdout pollution breaking JSON parsing

**Symptom:** "JSON validation failed" errors. Hook seems to output correct JSON but it's not parsed.

**Cause:** Shell profile (`.bashrc`, `.zshrc`) prints text on startup, which appears before your JSON output.

**Fix:**
- Ensure stdout contains ONLY the JSON object
- Use `#!/bin/bash` (not `#!/bin/zsh` or login shells)
- Redirect any debug output to stderr: `echo "debug info" >&2`
- Test: `echo '{}' | bash your-script.sh` — output should be clean JSON only

### 6. Bare relative paths in plugin hooks

**Symptom:** "No such file or directory" errors, but the script exists.

**Cause:** Plugin hook commands use `hooks/session-start.sh` instead of `${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh`. When the user changes directories during a session, relative paths break.

**Fix:** Always use `${CLAUDE_PLUGIN_ROOT}` for plugin scripts:
```json
"command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh\""
```

### 7. Script not executable

**Symptom:** "Permission denied" when hook fires.

**Cause:** Script missing execute permission.

**Fix:**
```bash
chmod +x hooks/*.sh
```

Also ensure the shebang line is present: `#!/bin/bash` or `#!/usr/bin/env bash`.

### 8. Components inside .claude-plugin/ directory

**Symptom:** Skills, hooks, or agents not found even though they exist.

**Cause:** Directories placed inside `.claude-plugin/` instead of at the plugin root.

**Fix:** Only `plugin.json` goes inside `.claude-plugin/`. Everything else at root:
```
my-plugin/
├── .claude-plugin/plugin.json   ← ONLY this
├── skills/                      ← At root
├── hooks/                       ← At root
└── agents/                      ← At root
```

### 9. Matcher on events that don't support it

**Symptom:** Hook doesn't fire for some prompts/stops.

**Cause:** Adding a `matcher` to `UserPromptSubmit`, `Stop`, `TeammateIdle`, or `TaskCompleted`. These events silently ignore matchers — they always fire on every occurrence.

**Fix:** Remove the `matcher` field for these events. If you need conditional logic, put it in the script itself.

### 10. Using deprecated PreToolUse decision fields

**Symptom:** PreToolUse hook doesn't block/allow as expected.

**Cause:** Using top-level `decision: "block"` / `decision: "approve"` instead of `hookSpecificOutput.permissionDecision`.

**Fix:** Use the current format:
```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Reason shown to Claude"
  }
}
```

## Debugging Strategy

### Quick Diagnosis

1. **Run with debug flag:** `claude --debug` shows hook execution details — which hooks matched, exit codes, output
2. **Toggle verbose mode:** `Ctrl+O` shows hook progress in transcript
3. **Test scripts standalone:** `echo '{"tool_name":"Write"}' | bash hooks/my-script.sh`
4. **Check exit codes:** `echo $?` after running script manually

### Debug Checklist

When a hook isn't working:

- [ ] Is the hook registered? Check `/hooks` menu — plugin hooks show `[Plugin]` prefix
- [ ] Does hooks.json parse? `python -c "import json; json.load(open('hooks/hooks.json'))"`
- [ ] Does the matcher match? Tool events match on `tool_name`, session events on `source`
- [ ] Is the script executable? `ls -la hooks/session-start.sh`
- [ ] Does the script work standalone? `echo '{}' | bash hooks/script.sh; echo "Exit: $?"`
- [ ] Is stdout clean JSON? No shell profile output, no debug prints to stdout
- [ ] Are paths using `${CLAUDE_PLUGIN_ROOT}`? Bare paths break on directory changes
- [ ] Is this a cache issue? Restart session or use `--plugin-dir`

### Common Debug Output Patterns

```
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <command> with timeout 600000ms
[DEBUG] Hook command completed with status 0: <stdout>
```

## Version Bump Protocol

When to bump the version in plugin.json:

1. **Any change to hooks.json** — hook snapshot is version-keyed
2. **Any change to shell scripts** — scripts are copied to cache
3. **Any change to skills** — skill content is cached
4. **Any change to plugin.json** — manifest is cached

Bump strategy:
- Bug fix (exit code fix, path fix) → patch: `0.1.0` → `0.1.1`
- New hook or skill added → minor: `0.1.0` → `0.2.0`
- Breaking change (renamed skills, removed hooks) → major: `0.1.0` → `1.0.0`

Without a version bump, marketplace users won't see the changes.
