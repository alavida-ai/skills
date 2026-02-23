# Shipping Checklists

Final validation before a skill is ready for adoption. Use the checklist that matches your skill template.

## CLI/API Skill Checklist

- [ ] `SKILL.md` has complete YAML frontmatter (`name`, `description`, `last-updated`, `allowed-tools`)
- [ ] Trigger phrases in `description` are explicit and specific
- [ ] `allowed-tools` is scoped to the minimum required permissions
- [ ] Setup section covers interactive and non-interactive configuration
- [ ] Config priority cascade is documented (env vars > local > global)
- [ ] Credential safety rules are documented (what agents must NOT do)
- [ ] Standard commands implemented: `setup`, `config:show`, `config:test`, `health`
- [ ] Common Actions table maps user intent to commands
- [ ] Workflow section has numbered steps starting with pre-flight checks
- [ ] Both output modes work: formatted (default) and JSON (`--json`)
- [ ] Error handling covers auth, connectivity, quota, and partial failures
- [ ] All script paths are relative to the SKILL.md location
- [ ] Freshness check notice is included near the top
- [ ] Domain CLAUDE.md updated with skill entry in Plugins/Capabilities table

## Knowledge Processing Skill Checklist

- [ ] `SKILL.md` has complete YAML frontmatter (`name`, `description`, `last-updated`, `allowed-tools`)
- [ ] Trigger phrases in `description` are explicit and specific
- [ ] `allowed-tools` is scoped to Read/Write/Edit/Grep/Glob (no Bash unless justified)
- [ ] Execute Now section provides clear entry point for agents
- [ ] Context Loading lists every file the skill needs to read before processing
- [ ] Methodology section explains why, not just what
- [ ] Quality Gates define measurable thresholds
- [ ] Output Format specifies location, naming, and frontmatter for generated files
- [ ] Handoff section names the next step in the pipeline
- [ ] Constraints include ownership rules (propose changes, don't write to other domains)
- [ ] Domain CLAUDE.md updated with skill entry in Plugins/Capabilities table
