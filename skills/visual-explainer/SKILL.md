---
name: visual-explainer
description: Generate beautiful, self-contained HTML pages that visually explain systems, code changes, plans, and data. Use when the user asks for a diagram, architecture overview, diff review, plan review, project recap, comparison table, or any visual explanation of technical concepts. Also use proactively when you are about to render a complex ASCII table (4+ rows or 3+ columns) — present it as a styled HTML page instead.
license: MIT
compatibility: Requires a browser to view generated HTML files. Optional surf-cli for AI image generation.
metadata:
  author: nicobailon
  version: "0.3.0"
---

# Visual Explainer

Generate self-contained HTML files for technical diagrams, visualizations, and data tables. Always open the result in the browser. Never fall back to ASCII art when this skill is loaded.

**Proactive table rendering.** When you're about to present tabular data as an ASCII box-drawing table in the terminal (comparisons, audits, feature matrices, status reports, any structured rows/columns), generate an HTML page instead. The threshold: if the table has 4+ rows or 3+ columns, it belongs in the browser. Don't wait for the user to ask — render it as HTML automatically and tell them the file path. You can still include a brief text summary in the chat, but the table itself should be the HTML page.

## Workflow

### 1. Interrogate

Before anything visual, answer three questions. These constrain every decision downstream.

1. **What task does the reader need to perform?** Present (read values) · Compare (judge sizes) · Organize (rank) · Correlate (see relationships) · Navigate (understand flow) · Explore (discover patterns). See `./references/methodology-playbook.md` for the full task taxonomy.

2. **What's the one takeaway?** Complete: *"After seeing this, the reader should understand ___."* This sentence becomes the entry layer headline.

3. **What does the reader already know?** Expert → higher density, less annotation. General → lower density, more annotation. This sets the Visualization Wheel's density axis.

### 2. Profile

Position the graphic on Cairo's Visualization Wheel (abstract↔figurative, functional↔decorative, dense↔light, multidimensional↔unidimensional, original↔familiar). Read `./references/methodology-playbook.md` for the full wheel and the 10% rule.

**Select encoding** using the Cleveland-McGill hierarchy based on the reader task from Step 1. The playbook has the full decision matrix (task → encoding → chart form → avoid). Don't pick a chart type by instinct — match it to the task.

### 3. Think

Before writing HTML, commit to a direction. Read `./references/brand.md` for the locked brand identity — palette, fonts, and surface treatment are fixed across all output.

**Who is looking?** A developer understanding a system? A PM seeing the big picture? A team reviewing a proposal? This shapes information density and visual complexity.

**What type of diagram?** Architecture, flowchart, sequence, data flow, schema/ER, state machine, mind map, data table, timeline, or dashboard. Each has distinct layout needs and rendering approaches (see Diagram Types below).

**What to vary** (within brand constraints — see Profile from Step 2):
- Wheel leans **functional/dense** → tighter spacing, more data per section, compact chart labels
- Wheel leans **decorative/light** → more whitespace, larger type, fewer sections
- Wheel leans **original** → pair with extra redundancy (explain how to read the form)
- Wheel leans **familiar** → conventional charts, invest in annotation quality

Layout, density, and animation vary per page. Colors, fonts, and surface treatment do not — they come from brand.md.

### 4. Architect

Build a **narrative backbone** before selecting a template. The visual should tell a story, not just display data.

**Define layered information architecture** (see `./references/methodology-playbook.md`):
- **Entry layer**: Headline takeaway from Step 1. KPI cards, hero summary. Dominates viewport on load — reader grasps the main point without scrolling.
- **Context layer**: Supporting evidence — charts, tables, diagrams that substantiate the takeaway.
- **Detail layer**: Exploration depth. Behind `<details>` elements or progressive disclosure. For readers who want to dig.
- **Annotation layer**: Editorial callouts overlaid on data sections. "Notice that X", "This spike corresponds to Y". At least one per data-heavy section.

**Define the reading path**: What does the reader see first → second → third? Sketch the layout as rectangles before choosing any chart type. Navigation: linear (scroll) or non-linear (tabs, sidebar)?

**Apply Gestalt grouping**: Related data → proximity. Related series → similarity. Relationships → connectedness (lines override all other grouping). Sections → closure (prefer whitespace over boxes).

**Now select a template.** Read the reference template before generating. Don't memorize it — read it each time to absorb the patterns.
- For text-heavy architecture overviews (card content matters more than topology): read `./templates/architecture.html`
- For flowcharts, sequence diagrams, ER, state machines, mind maps: read `./templates/mermaid-flowchart.html`
- For data tables, comparisons, audits, feature matrices: read `./templates/data-table.html`
- For scatter plots, line/area charts, radar charts, treemaps, or pages mixing data chart types: read `./templates/data-chart.html`

**For CSS/layout patterns and SVG connectors**, read `./references/css-patterns.md`.

**For pages with 4+ sections** (reviews, recaps, dashboards), also read `./references/responsive-nav.md` for section navigation with sticky sidebar TOC on desktop and horizontal scrollable bar on mobile.

**Choosing a rendering approach:**

| Diagram type | Approach | Why |
|---|---|---|
| Architecture (text-heavy) | CSS Grid cards + flow arrows | Rich card content (descriptions, code, tool lists) needs CSS control |
| Architecture (topology-focused) | **Mermaid** | Visible connections between components need automatic edge routing |
| Flowchart / pipeline | **Mermaid** | Automatic node positioning and edge routing; hand-drawn mode available |
| Sequence diagram | **Mermaid** | Lifelines, messages, and activation boxes need automatic layout |
| Data flow | **Mermaid** with edge labels | Connections and data descriptions need automatic edge routing |
| ER / schema diagram | **Mermaid** | Relationship lines between many entities need auto-routing |
| State machine | **Mermaid** | State transitions with labeled edges need automatic layout |
| Mind map | **Mermaid** | Hierarchical branching needs automatic positioning |
| Data table | HTML `<table>` | Semantic markup, accessibility, copy-paste behavior |
| Timeline | CSS (central line + cards) | Simple linear layout doesn't need a layout engine |
| Dashboard | CSS Grid + Chart.js | Card grid with embedded charts |
| Scatter / dot plot | **Observable Plot** | Declarative SVG, auto-axes, CSS-themable |
| Line / area chart | **Observable Plot** | Trend encoding with automatic scales |
| Heatmap / cell plot | **Observable Plot** | Dense matrix with color-scale encoding |
| Radar / wheel chart | **Chart.js** (radar) | Canvas polar chart with clean API |
| Treemap | **D3.js** (`d3-hierarchy`) | Hierarchical containment not in Plot |
| Sankey diagram | **D3.js** (`d3-sankey`) | Flow-with-quantity layout |
| Choropleth / geo | **D3.js** (`d3-geo` + TopoJSON) | Geographic projection |

**Library loading**: Only include what the page needs. Most pages need zero JS. Observable Plot auto-resolves D3 dependencies — import D3 separately only for treemap/Sankey/geo layouts. Chart.js loads via UMD `<script src>`, Plot and D3 via ESM `<script type="module">`. See `./references/libraries.md` for CDN imports and working examples.

**Mermaid theming:** Always use `theme: 'base'` with custom `themeVariables` so colors match your page palette. Use `look: 'handDrawn'` for sketch aesthetic or `look: 'classic'` for clean lines. Use `layout: 'elk'` for complex graphs (requires the `@mermaid-js/layout-elk` package — see `./references/libraries.md` for the CDN import). Override Mermaid's SVG classes with CSS for pixel-perfect control. See `./references/libraries.md` for full theming guide.

**Mermaid zoom controls:** Always add zoom controls (+/−/reset buttons) to every `.mermaid-wrap` container. Complex diagrams render at small sizes and need zoom to be readable. Include Ctrl/Cmd+scroll zoom on the container. See the zoom controls pattern in `./references/css-patterns.md` and the reference template at `./templates/mermaid-flowchart.html`.

**AI-generated illustrations (optional).** If [surf-cli](https://github.com/nicobailon/surf-cli) is available, you can generate images via Gemini and embed them in the page for creative, illustrative, explanatory, educational, or decorative purposes. Check availability with `which surf`. If available:

```bash
# Generate to a temp file (use --aspect-ratio for control)
surf gemini "descriptive prompt" --generate-image /tmp/ve-img.png --aspect-ratio 16:9

# Base64 encode for self-containment (macOS)
IMG=$(base64 -i /tmp/ve-img.png)
# Linux: IMG=$(base64 -w 0 /tmp/ve-img.png)

# Embed in HTML and clean up
# <img src="data:image/png;base64,${IMG}" alt="descriptive alt text">
rm /tmp/ve-img.png
```

See `./references/css-patterns.md` for image container styles (hero banners, inline illustrations, captions).

**When to use:** Hero banners that establish the page's visual tone. Conceptual illustrations for abstract systems that Mermaid can't express (physical infrastructure, user journeys, mental models). Educational diagrams that benefit from artistic or photorealistic rendering. Decorative accents that reinforce the aesthetic.

**When to skip:** Anything Mermaid or CSS handles well. Generic decoration that doesn't convey meaning. Data-heavy pages where images would distract. Always degrade gracefully — if surf isn't available, skip images without erroring. The page should stand on its own with CSS and typography alone.

**Prompt craft:** Match the image to the page's palette and aesthetic direction. Specify the style (3D render, technical illustration, watercolor, isometric, flat vector, etc.) and mention dominant colors from your CSS variables. Use `--aspect-ratio 16:9` for hero banners, `--aspect-ratio 1:1` for inline illustrations. Keep prompts specific — "isometric illustration of a message queue with cyan nodes on dark navy background" beats "a diagram of a queue."

### 5. Style

Apply these principles to every diagram:

**Typography and color are locked.** Read `./references/brand.md` and copy the Quick Reference CSS block as your starting point. Crimson Pro for body/headings (italic, never bold), Noto Sans Mono for labels/data. Sage/terracotta/muted gold palette. Both light and dark themes are pre-defined — use them exactly.

**Surfaces whisper, they don't shout.** Thin 1px borders, no shadows by default (hover only), no colored left-accents. KPI grids use the 1px-gap divider pattern from brand.md. Border-radius: 0 on KPI cards, 8px on chart containers.

**Backgrounds are clean.** Flat warm cream (`--bg`). No gradients, no dot grids, no radial glows. The editorial aesthetic relies on typography and whitespace, not atmospheric backgrounds.

**Visual weight signals importance.** Not every section deserves equal visual treatment. Executive summaries and key metrics should dominate the viewport on load (larger type, more padding, subtle accent-tinted background zone). Reference sections (file maps, dependency lists, decision logs) should be compact and stay out of the way. Use `<details>/<summary>` for sections that are useful but not primary — the collapsible pattern is in `./references/css-patterns.md`.

**Surface depth creates hierarchy.** Vary card depth to signal what matters. Hero sections get elevated shadows and accent-tinted backgrounds (`node--hero` pattern). Body content stays flat (default `.node`). Code blocks and secondary content feel recessed (`node--recessed`). See the depth tiers in `./references/css-patterns.md`. Don't make everything elevated — when everything pops, nothing does.

**Animation earns its place.** Staggered fade-ins on page load are almost always worth it — they guide the eye through the diagram's hierarchy. Mix animation types by role: `fadeUp` for cards, `fadeScale` for KPIs and badges, `drawIn` for SVG connectors, `countUp` for hero numbers. Hover transitions on interactive-feeling elements make the diagram feel alive. Always respect `prefers-reduced-motion`. CSS transitions and keyframes handle most cases. For orchestrated multi-element sequences, anime.js via CDN is available (see `./references/libraries.md`).

**Methodology guardrails** (apply after styling, before delivery):
- **Memory limit**: 5 or fewer colors encoding different data categories. Beyond that, merge categories or use layered progressive disclosure.
- **Decoration audit**: For each visual element, is it encoding data or just looking nice? Decoration is fine — but conscious, not default.
- **Contrast hierarchy**: Bright/saturated = important data. Subdued/gray = context. Use preattentive features (color, size, weight) for instant hierarchy. Never make everything equally vivid.

### 6. Deliver

**Output location:** Write to `~/.agent/diagrams/`. Use a descriptive filename based on content: `modem-architecture.html`, `pipeline-flow.html`, `schema-overview.html`. The directory persists across sessions.

**Open in browser:**
- macOS: `open ~/.agent/diagrams/filename.html`
- Linux: `xdg-open ~/.agent/diagrams/filename.html`

**Tell the user** the file path so they can re-open or share it.

## Diagram Types

### Architecture / System Diagrams
Two approaches depending on what matters more:

**Text-heavy overviews** (card content matters more than connections): CSS Grid with explicit row/column placement. Sections as rounded cards with colored borders and monospace labels. Vertical flow arrows between sections. Nested grids for subsystems. The reference template at `./templates/architecture.html` demonstrates this pattern. Use when cards need descriptions, code references, tool lists, or other rich content that Mermaid nodes can't hold.

**Topology-focused diagrams** (connections matter more than card content): **Use Mermaid.** A `graph TD` or `graph LR` with custom `themeVariables` produces proper diagrams with automatic edge routing. Use `look: 'handDrawn'` for informal feel or `look: 'classic'` for clean lines. Use when the point is showing how components connect rather than describing what each component does in detail.

### Flowcharts / Pipelines
**Use Mermaid.** Automatic node positioning and edge routing produces proper diagrams with connecting lines, decision diamonds, and parallel branches — dramatically better than CSS flexbox with arrow characters. Use `graph TD` for top-down or `graph LR` for left-right. Use `look: 'handDrawn'` for sketch aesthetic. Color-code node types with Mermaid's `classDef` or rely on `themeVariables` for automatic styling.

### Sequence Diagrams
**Use Mermaid.** Lifelines, messages, activation boxes, notes, and loops all need automatic layout. Use Mermaid's `sequenceDiagram` syntax. Style actors and messages via CSS overrides on `.actor`, `.messageText`, `.activation` classes.

### Data Flow Diagrams
**Use Mermaid.** Data flow diagrams emphasize connections over boxes — exactly what Mermaid excels at. Use `graph LR` or `graph TD` with edge labels for data descriptions. Thicker, colored edges for primary flows. Source/sink nodes styled differently from transform nodes via Mermaid's `classDef`.

### Schema / ER Diagrams
**Use Mermaid.** Relationship lines between entities need automatic routing. Use Mermaid's `erDiagram` syntax with entity attributes. Style via `themeVariables` and CSS overrides on `.er.entityBox` and `.er.relationshipLine`.

### State Machines / Decision Trees
**Use Mermaid.** Use `stateDiagram-v2` for states with labeled transitions. Supports nested states, forks, joins, and notes. Use `look: 'handDrawn'` for informal state diagrams. Decision trees can use `graph TD` with diamond decision nodes.

**`stateDiagram-v2` label caveat:** Transition labels have a strict parser — colons, parentheses, `<br/>`, HTML entities, and most special characters cause silent parse failures ("Syntax error in text"). If your labels need any of these (e.g., `cancel()`, `curate: true`, multi-line labels), use `flowchart LR` instead with rounded nodes and quoted edge labels (`|"label text"|`). Flowcharts handle all special characters and support `<br/>` for line breaks. Reserve `stateDiagram-v2` for simple single-word or plain-text labels.

### Mind Maps / Hierarchical Breakdowns
**Use Mermaid.** Use `mindmap` syntax for hierarchical branching from a root node. Mermaid handles the radial layout automatically. Style with `themeVariables` to control node colors at each depth level.

### Data Tables / Comparisons / Audits
Use a real `<table>` element — not CSS Grid pretending to be a table. Tables get accessibility, copy-paste behavior, and column alignment for free. The reference template at `./templates/data-table.html` demonstrates all patterns below.

**Use proactively.** Any time you'd render an ASCII box-drawing table in the terminal, generate an HTML table instead. This includes: requirement audits (request vs plan), feature comparisons, status reports, configuration matrices, test result summaries, dependency lists, permission tables, API endpoint inventories — any structured rows and columns.

Layout patterns:
- Sticky `<thead>` so headers stay visible when scrolling long tables
- Alternating row backgrounds via `tr:nth-child(even)` (subtle, 2-3% lightness shift)
- First column optionally sticky for wide tables with horizontal scroll
- Responsive wrapper with `overflow-x: auto` for tables wider than the viewport
- Column width hints via `<colgroup>` or `th` widths — let text-heavy columns breathe
- Row hover highlight for scanability

Status indicators (use styled `<span>` elements, never emoji):
- Match/pass/yes: colored dot or checkmark with green background
- Gap/fail/no: colored dot or cross with red background
- Partial/warning: amber indicator
- Neutral/info: dim text or muted badge

Cell content:
- Wrap long text naturally — don't truncate or force single-line
- Use `<code>` for technical references within cells
- Secondary detail text in `<small>` with dimmed color
- Keep numeric columns right-aligned with `tabular-nums`

### Timeline / Roadmap Views
Vertical or horizontal timeline with a central line (CSS pseudo-element). Phase markers as circles on the line. Content cards branching left/right (alternating) or all to one side. Date labels on the line. Color progression from past (muted) to future (vivid).

### Data Charts / Statistical Visualizations

Three libraries cover different chart needs. Pick by the chart type, not by preference:

- **Observable Plot**: First choice for scatter, dot strip, line, area, heatmap. Declarative, renders SVG, inherits CSS colors, handles axes/legends/tooltips automatically. Import via ESM.
- **D3.js**: For layouts Plot can't handle — treemap (`d3-hierarchy`), Sankey (`d3-sankey`), choropleth (`d3-geo`). More code, more control. Import via ESM alongside Plot or standalone.
- **Chart.js**: Canvas-based — bar, line, radar, doughnut. Best for dashboard KPI widgets where you need quick, clean charts. Import via UMD `<script src>`.

For CSS container patterns (`.chart-wrap`, `.d3-chart-wrap`, `.chart-annotation`), see `./references/css-patterns.md`. For CDN imports, theming, and working examples, see `./references/libraries.md`. The reference template at `./templates/data-chart.html` demonstrates all three libraries in one page.

### Dashboard / Metrics Overview
Card grid layout. Hero numbers large and prominent. Sparklines via inline SVG `<polyline>`. Progress bars via CSS `linear-gradient` on a div. For real charts (bar, line, pie), use **Chart.js via CDN** (see `./references/libraries.md`). KPI cards with trend indicators (up/down arrows, percentage deltas).

## File Structure

Every diagram is a single self-contained `.html` file. No external assets except CDN links (fonts, optional libraries). Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descriptive Title</title>
  <link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
  <style>
    /* CSS custom properties, theme, layout, components — all inline */
  </style>
</head>
<body>
  <!-- Semantic HTML: sections, headings, lists, tables, inline SVG -->
  <!-- No script needed for static CSS-only diagrams -->
  <!-- Optional: <script> for Mermaid, Chart.js, or anime.js when used -->
</body>
</html>
```

## Quality Checks

Before delivering, verify:
- **The squint test**: Blur your eyes. Can you still perceive hierarchy? Are sections visually distinct?
- **The swap test**: Would replacing your fonts and colors with a generic dark theme make this indistinguishable from a template? If yes, push the aesthetic further.
- **Both themes**: Toggle your OS between light and dark mode. Both should look intentional, not broken.
- **Information completeness**: Does the diagram actually convey what the user asked for? Pretty but incomplete is a failure.
- **No overflow**: Resize the browser to different widths. No content should clip or escape its container. Every grid and flex child needs `min-width: 0`. Side-by-side panels need `overflow-wrap: break-word`. Never use `display: flex` on `<li>` for marker characters — it creates anonymous flex items that can't shrink, causing lines with many inline `<code>` badges to overflow. Use absolute positioning for markers instead. See the Overflow Protection section in `./references/css-patterns.md`.
- **Mermaid zoom controls**: Every `.mermaid-wrap` container must have zoom controls (+/−/reset buttons), Ctrl/Cmd+scroll zoom, and click-and-drag panning. Complex diagrams render too small without them. The cursor should change to `grab` when zoomed in and `grabbing` while dragging. See `./references/css-patterns.md` for the full pattern.
- **File opens cleanly**: No console errors, no broken font loads, no layout shifts.

### Methodology Gates

Run these after the visual checks above. Each maps to a principle from `./references/methodology-playbook.md`.

| Check | Pass Criteria | Fix |
|-------|--------------|-----|
| Task-encoding alignment | Cleveland-McGill encoding matches reader task from Step 1 | Swap chart type |
| Entry layer clarity | One clear takeaway visible without scrolling | Add/strengthen hero |
| Annotation presence | At least 1 editorial callout per data-heavy section | Add "Notice..." annotations |
| Category count | 5 or fewer distinct colors/symbols encoding data | Merge or layer |
| Gestalt coherence | Related elements grouped by proximity; sections by whitespace | Adjust spacing |
| Redundancy balance | Novel forms include explanation of how to read them | Add reading guide |
