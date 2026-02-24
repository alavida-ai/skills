# Methodology Playbook

Perceptual science reference for the visual-explainer skill. Read during Steps 1 (Interrogate) and 2 (Profile) to ground design decisions in how humans actually process graphics.

Based on Alberto Cairo's *The Functional Art* and *The Truthful Art*. For deep theory and extended examples, see the [visualization-methodology skill](../../visualization-methodology/).

---

## Interrogate Checklist

Answer these three questions before any visual thinking:

### 1. What task does the reader need to perform?

| Task | Reader is trying to... | Best served by |
|------|----------------------|----------------|
| **Present** | Read specific values | Tables, labeled charts, KPI cards |
| **Compare** | Judge relative sizes at a glance | Bar charts, side-by-side layouts |
| **Organize** | Rank or sort entities | Sorted bars, ranked lists |
| **Correlate** | See relationships between variables | Scatter plots, connected node graphs |
| **Navigate** | Understand flow or sequence | Flowcharts, sequence diagrams, timelines |
| **Explore** | Discover patterns independently | Interactive views, filterable tables, dashboards |

Most pages serve one primary task. If you find two, the page needs two distinct sections — don't blend them.

### 2. What's the one takeaway?

Complete this sentence: *"After seeing this, the reader should understand ___."*

This becomes the entry layer headline. If you can't write this sentence, you don't understand the content well enough to visualize it yet.

### 3. What does the reader already know?

| Audience | Implication |
|----------|------------|
| **Expert** | Higher density, less annotation, abbreviations OK, reference-style layout |
| **Mixed** | Moderate density, key annotations, expand acronyms on first use |
| **General** | Lower density, more whitespace, explain everything, presentation-style layout |

---

## Visualization Wheel (Quick Profile)

Position the graphic on six axes. This is a 10-second mental assessment, not a formal scoring exercise.

| Axis | Lean toward... | When... |
|------|---------------|---------|
| **Abstract** | Data is quantitative, needs conventional encoding (bars, lines, scatter) |
| **Figurative** | Data has spatial/physical referent (maps, layouts, floor plans) |
| **Functional** | Every element must encode data (dashboards, analysis, audit tables) |
| **Decorative** | Engagement matters more than precision (landing pages, presentations) |
| **Dense** | Expert audience, reference material, many variables |
| **Light** | General audience, single message, quick scan |
| **Multidimensional** | Reader needs to slice data multiple ways |
| **Unidimensional** | Single point to make, one view is enough |
| **Original** | Audience is sophisticated, novel form adds insight |
| **Familiar** | Audience is broad, instant recognition matters |

**The 10% rule**: After your initial profile, push at least 10% toward more depth than your gut says. Audiences can handle more than we assume.

---

## Cleveland-McGill Encoding Selection

Select encoding based on the reader's task. Ordered by perceptual accuracy — always pick the most accurate encoding the task allows.

| Reader Task | Best Encoding | Chart Form | Rendered by | Avoid |
|-------------|--------------|------------|-------------|-------|
| Precise comparison | Position on common scale | Bar chart, dot chart | Chart.js / Plot (`dotX`) | Bubbles, area, color intensity |
| Trend over time | Length / direction | Line chart | Plot (`lineY`) / Chart.js | Stacked areas, pie over time |
| Correlation | Position on 2 axes | Scatter plot | Plot (`dot`) | Dual-axis charts |
| Part-of-whole | Angle / area (tolerable) | Stacked bar, treemap | Chart.js / D3 (`treemap`) | Pie charts with >5 segments |
| Geographic pattern | Color saturation | Choropleth, symbol map | D3 (`d3-geo`) | Precise value comparisons |
| Rank / order | Position on common scale | Sorted bar, dot strip | Plot (`dotX`) / Chart.js | Unsorted displays |
| Flow / process | Connection + direction | Flowchart, Sankey | Mermaid / D3 (`d3-sankey`) | Tables (lose the flow) |
| Hierarchical structure | Containment / nesting | Treemap, nested diagram | D3 (`d3-hierarchy`) / Mermaid | Flat lists (lose the structure) |

> **Library reference**: See `libraries.md` for CDN imports, dark mode setup, and working examples for each "Rendered by" library.

**Perceptual accuracy hierarchy** (most to least accurate):
1. Position on common scale
2. Position on non-aligned scale
3. Length
4. Direction / angle
5. Area
6. Volume
7. Color saturation / hue

When in doubt, go higher on the hierarchy.

---

## Layered Information Architecture

Every page should have these layers, in descending visual dominance:

### Entry Layer (the "boom")
- Headline takeaway from the Interrogate step
- KPI cards, hero summary, single dominant statement
- Dominates the viewport on load — reader grasps the main point without scrolling
- Think: newspaper headline + subhead

### Context Layer
- Supporting evidence — charts, tables, diagrams that substantiate the takeaway
- The body of the page
- Multiple sections, each making a supporting point

### Detail Layer
- Exploration depth for readers who want to dig
- Behind `<details>` elements or progressive disclosure
- Raw data, methodology notes, full lists, edge cases

### Annotation Layer
- Editorial callouts overlaid on data sections
- "Notice that X", "This spike corresponds to Y", "Key insight: ..."
- Prevents the "beautiful but what does it mean?" reaction
- At least one annotation per data-heavy section

---

## Reading Path (Rectangle Principle)

Before choosing any chart type, sketch the layout as rectangles:

1. **What does the reader see first?** (entry layer — top of viewport)
2. **What do they see second?** (context layer — first scroll)
3. **What do they see third?** (more context or detail layer)
4. **Navigation model**: Linear (scroll) or non-linear (tabs, sidebar)?

The rectangle sketch determines the grid layout. Chart types fill the rectangles — they don't define them.

---

## Gestalt Grouping Rules

Use perceptual grouping to reinforce information relationships:

| Principle | Use for | Implementation |
|-----------|---------|---------------|
| **Proximity** | Related data elements | Close together, whitespace between groups |
| **Similarity** | Related series or categories | Consistent styling (color, shape, size) |
| **Connectedness** | Explicit relationships | Lines between elements (overrides all other grouping) |
| **Closure** | Section boundaries | Prefer whitespace gaps over drawn boxes |
| **Continuity** | Sequential flow | Aligned elements, guide lines |

**Priority**: Connectedness > Proximity > Similarity. If two elements are connected by a line, the viewer perceives them as grouped even if they're far apart and styled differently.

---

## Methodology Quality Gates

Run these checks before delivery. Each maps to a specific methodology principle.

| Check | Pass Criteria | Fix |
|-------|--------------|-----|
| Task-encoding alignment | Cleveland-McGill encoding matches reader task from Interrogate step | Swap chart type to match the task |
| Entry layer clarity | One clear takeaway visible without scrolling | Add or strengthen hero section |
| Annotation presence | At least 1 editorial callout on each data-heavy section | Add "Notice..." or "Key insight:" annotations |
| Category count | 5 or fewer distinct colors/symbols encoding data | Merge categories or use layered progressive disclosure |
| Gestalt coherence | Related elements grouped by proximity; sections separated by whitespace | Adjust spacing, remove unnecessary boxes |
| Redundancy balance | Novel or unfamiliar forms include explanation of how to read them | Add a brief reading guide near the visualization |
