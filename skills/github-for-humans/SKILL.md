---
name: github-for-humans
description: >
  Invisible git layer for non-technical users. Handles commits, pushes, pulls,
  branching, and conflict resolution automatically — surfacing decisions only
  when human judgment is required, in plain business language with no git jargon.
  ALWAYS activate this skill when working with a non-technical user in a GitHub
  repo. Also activate when the user says "save my work," "send for review,"
  "what changed," "am I up to date," or "publish my changes."
last-updated: 2026-02-23
allowed-tools: Bash(git:*), Bash(gh:*)
based-on: null
---

# GitHub for Humans

Git operations translated into business language. The user works on files. The agent handles version control invisibly, only surfacing decisions when human judgment is genuinely needed.

> **Freshness check**: If more than 90 days have passed since the `last-updated`
> date above, review whether git workflows or GitHub CLI patterns have changed.

---

## Philosophy

Three principles govern every interaction. When in doubt, apply them in this order.

### 1. Invisible Until It Cannot Be

The agent performs all git operations silently. The user never needs to know that commits, branches, pushes, or pulls exist. They work on files; the agent keeps everything saved, synced, and organized behind the scenes.

**What "invisible" means in practice:**
- No git command output shown to the user. Ever.
- No mentions of "committing," "pushing," "pulling," or "merging" unless translating into a business concept.
- No status messages like "3 files changed, 42 insertions(+), 7 deletions(-)."
- Branch creation, switching, and cleanup happen without announcement.

### 2. Translated When Surfaced

When a situation requires the user's input, the agent translates it entirely into business terms. The user should feel like they are making a business decision, not a technical one.

**Translation glossary — internal to the agent, never shown to the user:**

| Git concept | Business translation |
|-------------|---------------------|
| Commit | "Save your work" / "checkpoint" |
| Push | "Send to the team" / "share your changes" |
| Pull | "Get the latest from the team" |
| Branch | "Your working copy" / "your draft" |
| Main/master | "The live version" / "what everyone sees" |
| Merge | "Combine your changes with the live version" |
| Pull request | "Review request" / "send for review" |
| Merge conflict | "You and [name] both changed the same thing" |
| Rebase | Never mentioned. Handled silently or avoided. |
| Stash | Never mentioned. Handled silently. |
| HEAD | Never mentioned. |
| SHA / hash | Never mentioned. |
| Remote / origin | "The team's copy" |
| Diff | "What changed" (shown as before/after, not unified format) |
| Force push | Never performed without explicit confirmation framed as a destructive action warning. |

### 3. Protective of Work

The agent never destroys user work. Before any operation that could lose changes, the agent confirms with the user in plain language. Destructive operations require explicit consent, described in terms of what will be lost, not what git command will run.

---

## Automatic Behaviors

These operations happen without asking the user. The agent handles them as part of normal work.

### Session Start

When a work session begins:

1. **Sync silently.** Pull the latest changes from the remote. If there are no conflicts, say nothing.
2. **Check for unfinished work.** If there are uncommitted changes from a previous session, commit them with a message reconstructed from file contents. Do not ask the user about stale uncommitted changes — just save them.
3. **Verify branch state.** If the user is on an unexpected branch (e.g., detached HEAD, old feature branch), silently fix it. Move to the appropriate branch for their current work.

If any of these steps encounter a conflict or ambiguity, escalate to the appropriate decision point (see [Decision Points](#decision-points)).

### Saving Work

Commit frequently and automatically. The user should never lose work because they forgot to "save."

**When to commit:**
- After the user completes a logical unit of work (finishes editing a file, completes a section, wraps up a task).
- Before switching context to a different file or topic.
- Before pulling new changes from the team.
- At natural conversation pauses (user says "thanks," "that looks good," "let's move on").

**How to write commit messages:**
- Describe what changed in business terms, not file terms.
- Use the user's own words when possible — pull from what they described as the goal.
- Group related changes into a single commit when they serve one purpose.

**Commit message examples:**

| Bad (never use) | Good (use this style) |
|-----------------|----------------------|
| "Update index.md" | "Add pricing section to landing page" |
| "Fix typo" | "Correct company name on about page" |
| "WIP" | "Draft partner outreach email — first version" |
| "Changes" | "Revise intro paragraph based on Alex's feedback" |
| "Merge branch 'feature/x' into main" | (Never shown to user. If merge commit is needed, write it as a descriptive message.) |

**Commit message rules:**
- Start with a verb (Add, Update, Revise, Remove, Draft, Restructure).
- Reference the content, not the file. "Add testimonials section" not "Edit testimonials.md."
- If the user described what they were doing, use their phrasing. "Rewrite the hero headline" is better than "Update homepage copy."
- Keep it under 72 characters.
- No conventional commit prefixes (feat:, fix:, chore:). These are for developers.

### Syncing

Keep the user's work in sync with the team without them knowing.

**Push after every commit.** There is no reason to delay. The user's work should always be backed up remotely.

**Pull before starting new work.** At session start and before any operation that touches files the team might have changed.

**Handle fast-forward merges silently.** If pulling brings in new changes that do not conflict, apply them and say nothing.

**If push is rejected** (remote has new changes):
1. Pull first.
2. If no conflicts, push again. Say nothing.
3. If conflicts arise, escalate to the merge conflict decision point.

### Branching

Branches are an organizational tool for the agent, not a concept for the user.

**When to create a branch:**
- When the user starts a new piece of work that should be reviewed before going live.
- When the user is experimenting and might want to discard changes.

**Branch naming:**
- Use descriptive, lowercase, hyphenated names derived from the work: `update-pricing-page`, `partner-outreach-draft`, `add-testimonials`.
- Never expose the branch name to the user. If they ask "where is my work?", say "Your changes are saved as a draft. They'll go live after review."

**When to merge:**
- After a PR is approved, merge automatically and confirm: "Your changes are now live."
- Use squash merges to keep history clean. The user does not need to know this.

**Branch cleanup:**
- Delete merged branches silently.
- If an old branch has been abandoned (no commits in 2+ weeks, no open PR), ask: "You started working on [description] a while ago but didn't finish. Want to keep that draft or discard it?"

---

## Decision Points

These are the moments where the agent must involve the user. For each, there is an exact phrasing template. The agent adapts the template to the specific situation but preserves the tone and structure.

### Merge Conflict

**When:** Two people edited the same part of the same file.

**Template:**
> You and [person's name] both made changes to [plain description of the file/section].
>
> **Your version:**
> [Show the user's content in readable, formatted form — not a diff]
>
> **[Person's name]'s version:**
> [Show the other person's content in readable, formatted form]
>
> I can:
> 1. Keep your version
> 2. Keep [person's name]'s version
> 3. Try to combine both (I'll show you the result before saving)
>
> Which would you prefer?

**Rules:**
- Always identify the other person by name (look at git log for author). If unknown, say "someone on the team."
- Show content, not diffs. Format the conflicting sections as readable text, not unified diff with +/- markers.
- If the conflict is trivial (whitespace, formatting), resolve it silently and do not bother the user.
- After resolution, confirm: "Done — I've combined the changes and saved everything."

### Review Request (Pull Request)

**When:** The user's work is ready to share with the team for feedback.

**Trigger phrases:** "Send this to Alex," "Is this ready?", "Can Alex look at this?", "Submit for review," "Send for review."

**Template:**
> Your changes are ready to send for review. Here's a summary of what you've done:
>
> - [Plain language bullet point of change 1]
> - [Plain language bullet point of change 2]
> - [Plain language bullet point of change 3]
>
> Want me to send this to [reviewer name] for review?

**After creating the PR:**
> Done — I've sent your changes to [reviewer name] for review. I'll let you know when they respond.

**Rules:**
- Summarize changes in plain language. "Added a new pricing section" not "Modified pricing.md with 47 insertions."
- Never show the diff. If the user asks "what exactly changed?", show a before/after comparison in readable form.
- Default reviewer is the repo owner or the person specified. Check CODEOWNERS if available.

### Review Feedback

**When:** Someone left comments on the user's PR.

**Template:**
> [Reviewer name] looked at your changes and left some feedback:
>
> - **[File/section in plain terms]:** "[Summarized comment in conversational language]"
> - **[File/section in plain terms]:** "[Summarized comment in conversational language]"
>
> Want to address these now, or come back to it later?

**Rules:**
- Translate review comments from technical to conversational. "Nit: missing period" becomes "Small thing — there's a missing period in the intro paragraph."
- Group related comments together.
- If the reviewer approved with minor suggestions, lead with that: "[Reviewer] approved your changes. They had a couple of small suggestions..."

### Branch Divergence

**When:** The user's working copy and the live version have diverged significantly.

**Template:**
> A heads up — the live version has changed since you started working on this.
> The safest approach is for me to update your draft with the latest changes first,
> then we can check if anything overlaps.
>
> Want me to go ahead? (Recommended: yes)

**Rules:**
- Always recommend the safe option.
- If the user says yes, rebase or merge (agent's choice — never ask the user which). Resolve trivially if possible, escalate conflicts per the merge conflict template.
- If the user says no, warn them: "Just so you know, the longer we wait, the more likely your changes will overlap with someone else's. I'd suggest doing this soon."

### Destructive Action Warning

**When:** Any operation that would permanently lose user work. This includes: force push, hard reset, discarding uncommitted changes, deleting a branch with unmerged work.

**Template:**
> Just to be safe — this would permanently remove your changes to [description of what would be lost].
> Once it's done, I can't undo it.
>
> Are you sure you want to go ahead?

**Rules:**
- This is the ONLY type of confirmation that should feel serious.
- Always describe specifically what will be lost, in the user's terms.
- If the user has not explicitly requested a destructive action, do not offer one. Find a non-destructive alternative.

### Stale Draft Cleanup

**When:** The user has old branches with unmerged work.

**Template:**
> I noticed you have a draft from [approximate date] about [description based on branch name or last commit].
> It was never sent for review. Want to:
> 1. Keep it for later
> 2. Discard it — you've moved on
> 3. Send it for review now

---

## Error Recovery

When things go wrong, the agent fixes them silently when possible and explains in plain terms when it cannot.

### Detached HEAD

**Detection:** `git status` shows "HEAD detached at..."

**Action:** Silently check out the appropriate branch. If unsure which branch, check out main. If there were uncommitted changes, commit them to the correct branch first.

**If the user notices anything:** "I noticed your workspace was in an unusual state — I've tidied it up. Nothing was lost."

### Authentication Failure

**Detection:** Push/pull fails with authentication error.

**Action:**
> I'm having trouble connecting to GitHub. This usually means your login has expired.
> Can you run this in your terminal? `gh auth login`
> Once that's done, let me know and I'll retry.

### Network Failure

**Detection:** Push/pull fails with network error.

**Action:**
> I can't reach GitHub right now — might be a network issue. Your work is saved locally,
> so nothing is lost. I'll try syncing again in a bit. If this keeps happening,
> check your internet connection.

### Merge Tool Failure

**Detection:** Merge fails for reasons other than conflicts (e.g., corrupted index, tree conflicts).

**Action:** Attempt `git merge --abort`, then retry with a different strategy. If still broken:

> Something unexpected happened while combining changes. Your work is safe — I've
> rolled back the operation. Let me try a different approach.
>
> [Attempt alternative resolution. If all else fails:]
>
> I wasn't able to resolve this automatically. The safest thing to do is ask Alex
> to take a look. Want me to flag this for him?

### Accidental File Deletion

**Detection:** User deleted a file they may not have intended to delete, or `git status` shows unexpected deletions.

**Action:**
> I noticed [file description] was removed. Was that intentional?
> - Yes, I wanted to remove it
> - No, that was an accident — please bring it back

If accidental, restore from git and confirm: "Restored — [file description] is back."

---

## Status Awareness

The agent maintains awareness of the repo state and proactively shares relevant information in business terms.

### When the User Asks "What's Going On?"

**Trigger phrases:** "What's the status?", "Where are we?", "What's happening?", "Am I up to date?"

**Template:**
> Here's where things stand:
>
> **Your current work:** [Description of uncommitted or unpushed changes, if any]
> **Team updates:** [Any new changes from the team since last sync, if any]
> **Open review requests:** [Any open PRs, who's reviewing, if any]
>
> [If everything is clean:] Everything's up to date. Your latest changes are live and there's nothing waiting for review.

### Proactive Notifications

The agent mentions these naturally in conversation, not as alerts:

- **Unsynced work:** "By the way, you have some unsaved changes from earlier. Want me to save them?"
- **PR approved:** "Good news — Alex approved your changes. They're live now." (Merge automatically unless configured otherwise.)
- **PR comments:** "Alex left some feedback on your [description]. Want to look at it now?"
- **Stale branch:** Only mention during natural pauses, not interrupting active work.

---

## Anti-Patterns

Things the agent must NEVER do when this skill is active.

### Never Show Raw Git Output

| Forbidden | Instead |
|-----------|---------|
| `3 files changed, 42 insertions(+), 7 deletions(-)` | "Saved your changes to the pricing page." |
| `CONFLICT (content): Merge conflict in about.md` | "You and Alex both changed the about page. Let me show you both versions." |
| `Your branch is behind 'origin/main' by 3 commits` | "The team made some updates. Let me pull those in." |
| `fatal: not a git repository` | "This folder isn't set up for collaboration yet. Want me to set it up?" |
| `HEAD detached at abc1234` | (Fix silently. Say nothing.) |

### Never Use Git Jargon

| Forbidden term | Allowed alternative |
|----------------|-------------------|
| Commit | Save, checkpoint |
| Push / pull | Sync, send, get latest |
| Branch | Draft, working copy |
| Merge / rebase | Combine changes |
| Stash | (Handle silently — never mention) |
| Cherry-pick | (Handle silently — never mention) |
| HEAD | (Never mention) |
| SHA, hash, ref | (Never mention) |
| Remote, origin | The team's copy, GitHub |
| Upstream / downstream | (Never mention) |
| Index / staging area | (Never mention) |
| Working tree | Your files |
| Checkout | (Never mention — say "switching to" if needed) |
| Fetch | (Never mention — use "checking for updates") |
| Fast-forward | (Never mention — handle silently) |
| Force push | (Describe as "overwriting the team's version" if absolutely necessary) |

### Never Ask Technical Questions

| Forbidden question | Correct approach |
|-------------------|-----------------|
| "Should I rebase or merge?" | Choose the appropriate one silently. |
| "Do you want to force push?" | Explain what would be lost and ask if they're sure. |
| "There's a detached HEAD, what should I do?" | Fix it silently. |
| "Should I stash your changes?" | Save them silently and restore after. |
| "Which branch do you want to check out?" | "Which piece of work do you want to continue with?" |
| "Do you want to squash commits?" | (Always squash on merge. Never ask.) |
| "Should I amend the last commit?" | (Just make a new commit. Never ask.) |

### Never Perform Destructive Operations Without Consent

- Never `git reset --hard` without explicit user confirmation framed as a loss warning.
- Never `git push --force` without explicit user confirmation framed as overwriting team work.
- Never `git clean -f` without explicit user confirmation.
- Never `git branch -D` on branches with unmerged work without asking.
- Never delete remote branches without checking for open PRs first.

---

## Working with the Branching Convention

When this skill is active in an Alavida repo, the agent follows the branching rules from `.claude/rules/branching.md` but translates the resulting workflow for the user.

**The user says:** "I'm going to write new copy for the landing page."
**The agent does:** Creates a branch named `workspace/landing-page-copy` (following the convention), starts the work. Says nothing about branches.

**The user says:** "Send this to Alex for review."
**The agent does:** Pushes the branch, creates a PR with a clear title and description, assigns Alex. Tells the user: "Sent for review. I'll let you know when Alex responds."

**The user asks:** "What branch am I on?"
**The agent says:** "You're working on your landing page copy draft. It hasn't gone live yet — it's waiting for review." (Translates branch state to business state.)

---

## Integration with Other Skills

This skill is a **base behavior layer** — it runs underneath other skills, not instead of them.

- When paired with a copywriting skill, the agent writes copy AND handles git invisibly.
- When paired with a compound skill, the agent follows the compound loop AND handles git invisibly.
- This skill never overrides another skill's workflow. It only governs the version control layer.

**Conflict resolution with other skills:**
- If another skill says "commit after every phase" — this skill handles the commit, using its message conventions.
- If another skill says "create a PR" — this skill handles the PR creation, using its translation templates.
- If another skill has its own branching convention — defer to that skill's convention, but still translate for the user.

---

## Session Checklist

At the start of every session where this skill is active, the agent silently runs through this checklist. None of these steps are shown to the user.

1. Pull latest changes from remote.
2. Check for uncommitted work from previous sessions.
3. Verify branch state is sane (not detached, on expected branch).
4. Check for open PRs that have new activity (comments, approvals).
5. Check if current branch is behind remote.
6. Resolve any trivial issues (fast-forward, stale locks, detached HEAD).
7. If anything needs user input, queue it and present after greeting.

---

## Constraints

- This skill governs git behavior only. It does not dictate what content the user creates.
- The agent must never skip the destructive action warning for operations that lose work.
- The agent must never invent commit messages that misrepresent what changed. If unsure, describe the files touched rather than guessing the intent.
- The agent must follow the repo's `.claude/rules/branching.md` if present, translating the convention for the user.
- The agent must not suppress genuine errors that require user action (authentication, permissions). These are translated, not hidden.
- The agent must not accumulate large numbers of uncommitted changes. Commit frequently — small, meaningful saves are better than one massive save at the end.
