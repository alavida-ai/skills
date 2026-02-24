# Changelog

## [0.3.0] - 2026-02-24

### Rendering Capabilities
- Added **Observable Plot** as primary data visualization library — scatter, dot strip, line, area, heatmap examples with dark mode theming and CSS variable integration
- Added **D3.js** for specialized layouts — treemap (`d3-hierarchy`) and Sankey (`d3-sankey`) examples with dark mode handling; choropleth documented but not templated (requires TopoJSON)
- Expanded **Chart.js** documentation with line chart, radar chart, doughnut, and scatter examples following existing `isDark`/`textColor`/`gridColor` pattern
- New routing table rows in SKILL.md: scatter/dot plot, line/area chart, heatmap/cell plot, radar/wheel chart, treemap, Sankey diagram, choropleth/geo
- New "Data Charts / Statistical Visualizations" diagram type section with Plot vs D3 vs Chart.js guidance
- Library loading guidance paragraph after routing table

### References
- `libraries.md` — Observable Plot section (CDN ESM import, dark mode/CSS variable theming, 5 examples matching Cleveland-McGill tasks), D3.js section (treemap + Sankey examples), 4 new Chart.js examples (line, radar, doughnut, scatter)
- `css-patterns.md` — SVG chart container patterns (`.chart-wrap`, `.chart-title`, `.chart-annotation`, `.chart-grid`, `.d3-chart-wrap` with treemap/Sankey sub-patterns)
- `methodology-playbook.md` — "Rendered by" column added to Cleveland-McGill decision matrix linking each chart form to its rendering library

### Templates
- `data-chart.html` — New reference template demonstrating Observable Plot (scatter), Chart.js (radar), and D3.js (treemap) in one page. Indigo/violet palette, Sora + IBM Plex Mono fonts, methodology-driven narrative backbone

## [0.2.0] - 2026-02-24

### Methodology Integration
- New 6-step workflow: Interrogate → Profile → Think → Architect → Style → Deliver (was Think → Structure → Style → Deliver)
- Step 1 "Interrogate": Reader task identification, single-takeaway forcing function, audience assessment
- Step 2 "Profile": Cairo's Visualization Wheel quick-profile, Cleveland-McGill encoding selection based on reader task
- Step 3 "Think" (enhanced): Aesthetic choice now grounded in the Visualization Wheel profile
- Step 4 "Architect" (enhanced "Structure"): Layered information architecture (entry/context/detail/annotation layers), reading path definition, Gestalt grouping rules — then template selection
- Step 5 "Style": Added three methodology guardrails (memory limit, decoration audit, contrast hierarchy)
- Step 6 "Deliver": Added methodology quality gate table (task-encoding alignment, entry layer clarity, annotation presence, category count, Gestalt coherence, redundancy balance)

### References
- Added `methodology-playbook.md` — Interrogate checklist, Visualization Wheel, Cleveland-McGill decision matrix, layered information architecture, Gestalt grouping rules, methodology quality gates. Source: Cairo's *The Functional Art*

## [0.1.1] - 2026-02-19

- Prompts no longer require the `pi-prompt-template-model` extension — each prompt now explicitly loads the skill itself
- Added "Writing Valid Mermaid" section to `libraries.md` (quoting special chars, simple IDs, max node count, arrow styles, pipe escaping)
- Fixed mobile scroll offset in `responsive-nav.md` — section headings now clear the sticky nav bar via `scroll-margin-top`
- Added video preview to README

## [0.1.0] - 2026-02-16

Initial release.

### Skill
- Core workflow: Think (pick aesthetic) → Structure (read template) → Style (apply design) → Deliver (write + open)
- 11 diagram types with rendering approach routing (Mermaid, CSS Grid, HTML tables, Chart.js)
- 9 aesthetic directions (monochrome terminal, editorial, blueprint, neon, paper/ink, sketch, IDE-inspired, data-dense, gradient mesh)
- Mermaid deep theming with `theme: 'base'` + `themeVariables`, hand-drawn mode, ELK layout
- Zoom controls (buttons, scroll-to-zoom, drag-to-pan) required on all Mermaid containers
- Proactive table rendering — agent generates HTML instead of ASCII for complex tables
- Optional AI-generated illustrations via surf-cli + Gemini Nano Banana Pro
- Both light and dark themes via CSS custom properties and `prefers-color-scheme`
- Quality checks: squint test, swap test, overflow protection, zoom controls verification

### References
- `css-patterns.md` — theme setup, depth tiers, node cards, grid layouts, data tables, status badges, KPI cards, before/after panels, connectors, animations (fadeUp, fadeScale, drawIn, countUp), collapsible sections, overflow protection, generated image containers
- `libraries.md` — Mermaid (CDN, ELK, deep theming, hand-drawn mode, CSS overrides, diagram examples), Chart.js, anime.js, Google Fonts with 13 font pairings
- `responsive-nav.md` — sticky sidebar TOC on desktop, horizontal scrollable bar on mobile, scroll spy

### Templates
- `architecture.html` — CSS Grid card layout, terracotta/sage palette, depth tiers, flow arrows, pipeline with parallel branches
- `mermaid-flowchart.html` — Mermaid flowchart with ELK + handDrawn mode, teal/cyan palette, zoom controls
- `data-table.html` — HTML table with KPI cards, status badges, collapsible details, rose/cranberry palette

### Prompt Templates
- `/generate-web-diagram` — generate a diagram for any topic
- `/diff-review` — visual diff review with architecture comparison, KPI dashboard, code review, decision log
- `/plan-review` — plan vs. codebase with current/planned architecture, risk assessment, understanding gaps
- `/project-recap` — project mental model snapshot for context-switching
- `/fact-check` — verify factual accuracy of review pages and plan docs against actual code
