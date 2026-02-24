# External Libraries (CDN)

Optional CDN libraries for cases where pure CSS/HTML isn't enough. Only include what the diagram actually needs — most diagrams need zero external JS.

## Mermaid.js — Diagramming Engine

Use for flowcharts, sequence diagrams, ER diagrams, state machines, mind maps, class diagrams, and any diagram where automatic node positioning and edge routing saves effort. Mermaid handles layout — you handle theming.

Do NOT use for dashboards — CSS Grid card layouts with Chart.js look better for those. Data tables use `<table>` elements.

**CDN:**
```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

  mermaid.initialize({ startOnLoad: true, /* ... */ });
</script>
```

**With ELK layout** (required for `layout: 'elk'` — it's a separate package, not bundled in core):
```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  import elkLayouts from 'https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk/dist/mermaid-layout-elk.esm.min.mjs';

  mermaid.registerLayoutLoaders(elkLayouts);
  mermaid.initialize({ startOnLoad: true, layout: 'elk', /* ... */ });
</script>
```

Without the ELK import and registration, `layout: 'elk'` silently falls back to dagre. Only import ELK when you actually need it — it adds significant bundle weight. Most simple diagrams render fine with dagre.

### Deep Theming

Always use `theme: 'base'` — it's the only theme where all `themeVariables` are fully customizable. The built-in themes (`default`, `dark`, `forest`, `neutral`) ignore most variable overrides.

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    look: 'classic',
    themeVariables: {
      // Background and surfaces
      primaryColor: isDark ? '#2d1b69' : '#ede9fe',
      primaryBorderColor: isDark ? '#7c3aed' : '#8b5cf6',
      primaryTextColor: isDark ? '#e6edf3' : '#1a1a2e',
      secondaryColor: isDark ? '#1c2333' : '#f0fdf4',
      secondaryBorderColor: isDark ? '#059669' : '#16a34a',
      secondaryTextColor: isDark ? '#e6edf3' : '#1a1a2e',
      tertiaryColor: isDark ? '#27201a' : '#fef3c7',
      tertiaryBorderColor: isDark ? '#d97706' : '#f59e0b',
      tertiaryTextColor: isDark ? '#e6edf3' : '#1a1a2e',
      // Lines and edges
      lineColor: isDark ? '#6b7280' : '#9ca3af',
      // Text
      // Global default — CSS overrides on .nodeLabel/.edgeLabel win when present
      fontSize: '16px',
      fontFamily: 'var(--font-body)',
      // Notes and labels
      noteBkgColor: isDark ? '#1c2333' : '#fefce8',
      noteTextColor: isDark ? '#e6edf3' : '#1a1a2e',
      noteBorderColor: isDark ? '#fbbf24' : '#d97706',
    }
  });
</script>
```

### Hand-Drawn Mode

Add `look: 'handDrawn'` for a sketchy, whiteboard-style aesthetic. Combines well with the `elk` layout engine for better positioning (requires the ELK import — see CDN section above):

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  import elkLayouts from 'https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk/dist/mermaid-layout-elk.esm.min.mjs';

  mermaid.registerLayoutLoaders(elkLayouts);
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    look: 'handDrawn',
    layout: 'elk',
    themeVariables: { /* same as above */ }
  });
</script>
```

Or set it per-diagram via frontmatter:
```
---
config:
  look: handDrawn
  layout: elk
---
graph TD
  A[User Request] --> B{Auth Check}
  B -->|Valid| C[Process]
  B -->|Invalid| D[Reject]
```

### CSS Overrides on Mermaid SVG

Mermaid renders SVG. Override its classes for pixel-perfect control that `themeVariables` can't reach:

```css
/* Container — see css-patterns.md "Mermaid Zoom Controls" for the full zoom pattern */
.mermaid-wrap {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  overflow: auto;
}

/* CRITICAL: Force node/edge text to follow the page's color scheme.
   Without this, themeVariables.primaryTextColor works for DEFAULT nodes,
   but any classDef that sets color: will hardcode a single value that
   breaks in the opposite color scheme. Fix: never set color: in classDef,
   and always include these CSS overrides. */
.mermaid .nodeLabel { color: var(--text) !important; }
.mermaid .edgeLabel { color: var(--text-dim) !important; background-color: var(--bg) !important; }
.mermaid .edgeLabel rect { fill: var(--bg) !important; }

/* Node shapes */
.mermaid .node rect,
.mermaid .node circle,
.mermaid .node polygon {
  stroke-width: 1.5px;
}

/* Edge paths */
.mermaid .edge-pattern-solid {
  stroke-width: 1.5px;
}

/* Edge labels — smaller than node labels for visual hierarchy */
.mermaid .edgeLabel {
  font-family: var(--font-mono) !important;
  font-size: 13px !important;
}

/* Node labels — 16px default; drop to 14px for complex diagrams (20+ nodes) */
.mermaid .nodeLabel {
  font-family: var(--font-body) !important;
  font-size: 16px !important;
}

/* Sequence diagram actors */
.mermaid .actor {
  stroke-width: 1.5px;
}

/* Sequence diagram messages */
.mermaid .messageText {
  font-family: var(--font-mono) !important;
  font-size: 12px !important;
}

/* ER diagram entities */
.mermaid .er.entityBox {
  stroke-width: 1.5px;
}

/* Mind map nodes */
.mermaid .mindmap-node rect {
  stroke-width: 1.5px;
}
```

### classDef Gotchas

`classDef` values are static text inside `<pre>` — they can't use CSS variables or JS ternaries. Two rules:

1. **Never set `color:` in classDef.** It hardcodes a text color that breaks in the opposite color scheme. Let the CSS overrides above handle text color via `var(--text)`.

2. **Use semi-transparent fills (8-digit hex) for node backgrounds.** They layer over whatever Mermaid's base theme background is, producing a tint that works in both light and dark modes. Use `20`–`44` alpha for subtle, `55`–`77` for prominent:

```
classDef highlight fill:#b5761433,stroke:#b57614,stroke-width:2px
classDef muted fill:#7c6f6411,stroke:#7c6f6444,stroke-width:1px
```

Avoid opaque light fills like `fill:#fefce8` — they render as bright boxes in dark mode.

### stateDiagram-v2 Label Limitations

State diagram transition labels have a strict parser. Avoid:
- `<br/>` — only works in flowcharts; causes a parse error in state diagrams
- Parentheses in labels — `cancel()` can confuse the parser
- Multiple colons — the first `:` is the label delimiter; extra colons in the label text may break parsing

If you need multi-line labels or special characters, use a `flowchart` instead of `stateDiagram-v2`. Flowcharts support quoted labels (`|"label with: special chars"|`) and `<br/>` for line breaks.

### Writing Valid Mermaid

Most Mermaid failures come from a few recurring issues. Follow these rules to avoid invalid diagrams:

**Quote labels with special characters.** Parentheses, colons, commas, brackets, and ampersands break the parser when unquoted. Wrap any label containing special characters in double quotes:

```
A["handleRequest(ctx)"] --> B["DB: query users"]
A[handleRequest] --> B[query users]
```

**Keep IDs simple.** Node IDs should be alphanumeric with no spaces or punctuation. Put the readable name in the label, not the ID:

```
userSvc["User Service"] --> authSvc["Auth Service"]
```

**Max 15-20 nodes per diagram.** Beyond that, readability collapses even with ELK layout. Use `subgraph` blocks to group related nodes, or split into multiple diagrams:

```
subgraph Auth
  login --> validate --> token
end
subgraph API
  gateway --> router --> handler
end
Auth --> API
```

**Arrow styles for semantic meaning:**

| Arrow | Meaning | Use for |
|-------|---------|---------|
| `-->` | Solid | Primary flow |
| `-.->` | Dotted | Optional, async, or fallback paths |
| `==>` | Thick | Critical or highlighted path |
| `--x` | Cross | Rejected or blocked |
| `-->\|label\|` | Labeled | Decision branches, data descriptions |

**Escape pipes in labels.** If a label contains a literal `|`, use `#124;` (HTML entity) or rephrase to avoid it — pipes delimit edge labels in flowcharts.

**Don't mix diagram syntax.** Each diagram type has its own syntax. `-->` works in flowcharts but not in sequence diagrams (`->>` instead). `:::className` works in flowcharts but not in ER diagrams. When in doubt, check the examples below for correct syntax per type.

### Diagram Type Examples

**Flowchart with decisions:**
```html
<pre class="mermaid">
graph TD
  A[Request] --> B{Authenticated?}
  B -->|Yes| C[Load Dashboard]
  B -->|No| D[Login Page]
  D --> E[Submit Credentials]
  E --> B
  C --> F{Role?}
  F -->|Admin| G[Admin Panel]
  F -->|User| H[User Dashboard]
</pre>
```

**Sequence diagram:**
```html
<pre class="mermaid">
sequenceDiagram
  participant C as Client
  participant G as Gateway
  participant S as Service
  participant D as Database
  C->>G: POST /api/data
  G->>G: Validate JWT
  G->>S: Forward request
  S->>D: Query
  D-->>S: Results
  S-->>G: Response
  G-->>C: 200 OK
</pre>
```

**ER diagram:**
```html
<pre class="mermaid">
erDiagram
  USERS ||--o{ ORDERS : places
  ORDERS ||--|{ LINE_ITEMS : contains
  LINE_ITEMS }o--|| PRODUCTS : references
  USERS { string email PK }
  ORDERS { int id PK }
  LINE_ITEMS { int quantity }
  PRODUCTS { string name }
</pre>
```

**State diagram:**
```html
<pre class="mermaid">
stateDiagram-v2
  [*] --> Draft
  Draft --> Review : submit
  Review --> Approved : approve
  Review --> Draft : request_changes
  Approved --> Published : publish
  Published --> Archived : archive
  Archived --> [*]
</pre>
```

**Mind map:**
```html
<pre class="mermaid">
mindmap
  root((Project))
    Frontend
      React
      Next.js
      Tailwind
    Backend
      Node.js
      PostgreSQL
      Redis
    Infrastructure
      AWS
      Docker
      Terraform
</pre>
```

### Dark Mode Handling

Mermaid initializes once — it can't reactively switch themes. Read the preference at load time inside your `<script type="module">`:

```javascript
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// Use isDark to pick light or dark values in themeVariables
```

The CSS overrides on the container (`.mermaid-wrap`) and page will still respond to `prefers-color-scheme` normally — only the Mermaid SVG internals are static.

## Chart.js — Data Visualizations

Use for bar charts, line charts, pie/doughnut charts, radar charts, and other data-driven visualizations in dashboard-type diagrams. Overkill for static numbers — use pure SVG/CSS for simple progress bars and sparklines.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>

<canvas id="myChart" width="600" height="300"></canvas>

<script>
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const textColor = isDark ? '#8b949e' : '#6b7280';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const fontFamily = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';

  new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Feedback Items',
        data: [45, 62, 78, 91, 120],
        backgroundColor: isDark ? 'rgba(129, 140, 248, 0.6)' : 'rgba(79, 70, 229, 0.6)',
        borderColor: isDark ? '#818cf8' : '#4f46e5',
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: textColor, font: { family: fontFamily } } },
      },
      scales: {
        x: { ticks: { color: textColor, font: { family: fontFamily } }, grid: { color: gridColor } },
        y: { ticks: { color: textColor, font: { family: fontFamily } }, grid: { color: gridColor } },
      }
    }
  });
</script>
```

### Line Chart

```html
<canvas id="lineChart" width="600" height="300"></canvas>
<script>
  const isDarkL = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const txtL = isDarkL ? '#8b949e' : '#6b7280';
  const gridL = isDarkL ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const fontL = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';
  const accentL = isDarkL ? '#818cf8' : '#4f46e5';

  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Active Users',
        data: [120, 145, 132, 178, 195, 210],
        borderColor: accentL,
        backgroundColor: accentL + '1a',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: accentL,
        pointBorderColor: isDarkL ? '#161b22' : '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: txtL, font: { family: fontL } } },
      },
      scales: {
        x: { ticks: { color: txtL, font: { family: fontL } }, grid: { color: gridL } },
        y: { ticks: { color: txtL, font: { family: fontL } }, grid: { color: gridL } },
      }
    }
  });
</script>
```

### Radar Chart

```html
<canvas id="radarChart" width="400" height="400"></canvas>
<script>
  const isDarkR = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const txtR = isDarkR ? '#8b949e' : '#6b7280';
  const fontR = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';

  new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: ['Speed', 'Reliability', 'Security', 'UX', 'Scalability', 'Cost'],
      datasets: [
        {
          label: 'Current',
          data: [7, 8, 6, 5, 4, 7],
          borderColor: isDarkR ? '#818cf8' : '#4f46e5',
          backgroundColor: isDarkR ? 'rgba(129,140,248,0.15)' : 'rgba(79,70,229,0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: isDarkR ? '#818cf8' : '#4f46e5',
        },
        {
          label: 'Target',
          data: [9, 9, 8, 8, 7, 6],
          borderColor: isDarkR ? '#34d399' : '#059669',
          backgroundColor: isDarkR ? 'rgba(52,211,153,0.12)' : 'rgba(5,150,105,0.08)',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 3,
          pointBackgroundColor: isDarkR ? '#34d399' : '#059669',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: txtR, font: { family: fontR } } },
      },
      scales: {
        r: {
          angleLines: { color: isDarkR ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
          grid: { color: isDarkR ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
          pointLabels: { color: txtR, font: { family: fontR, size: 12 } },
          ticks: { display: false },
          suggestedMin: 0,
          suggestedMax: 10,
        }
      }
    }
  });
</script>
```

### Doughnut Chart

```html
<canvas id="doughnutChart" width="300" height="300"></canvas>
<script>
  const isDarkD = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const txtD = isDarkD ? '#8b949e' : '#6b7280';
  const fontD = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';

  const doughnut = new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
      labels: ['Features', 'Bugs', 'Tech Debt', 'Docs'],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: isDarkD
          ? ['#818cf8', '#f87171', '#fbbf24', '#34d399']
          : ['#4f46e5', '#dc2626', '#d97706', '#059669'],
        borderColor: isDarkD ? '#161b22' : '#ffffff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: txtD, font: { family: fontD }, padding: 16 },
        },
      },
    }
  });
</script>
```

To add a center label (e.g., total), use a Chart.js plugin:
```javascript
{
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.font = `bold 24px ${fontD}`;
    ctx.fillStyle = isDarkD ? '#e6edf3' : '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100', width / 2, height / 2);
    ctx.restore();
  }
}
```

### Scatter Chart

```html
<canvas id="scatterChart" width="600" height="300"></canvas>
<script>
  const isDarkS = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const txtS = isDarkS ? '#8b949e' : '#6b7280';
  const gridS = isDarkS ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const fontS = getComputedStyle(document.documentElement)
    .getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';

  new Chart(document.getElementById('scatterChart'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Teams',
        data: [
          { x: 2, y: 8 }, { x: 5, y: 3 }, { x: 7, y: 9 },
          { x: 1, y: 5 }, { x: 8, y: 4 }, { x: 6, y: 7 },
        ],
        backgroundColor: isDarkS ? 'rgba(129,140,248,0.6)' : 'rgba(79,70,229,0.6)',
        borderColor: isDarkS ? '#818cf8' : '#4f46e5',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: txtS, font: { family: fontS } } },
        tooltip: {
          callbacks: {
            label: (ctx) => `Effort: ${ctx.parsed.x}, Impact: ${ctx.parsed.y}`
          }
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Effort', color: txtS, font: { family: fontS } },
          ticks: { color: txtS, font: { family: fontS } },
          grid: { color: gridS }
        },
        y: {
          title: { display: true, text: 'Impact', color: txtS, font: { family: fontS } },
          ticks: { color: txtS, font: { family: fontS } },
          grid: { color: gridS }
        },
      }
    }
  });
</script>
```

### Container Pattern

Wrap the canvas in a styled container:
```css
.chart-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.chart-container canvas {
  max-height: 300px;
}
```

## Observable Plot — Data Visualization (SVG)

Use for scatter plots, dot strips, line charts, area charts, and heatmaps. Plot is declarative — you describe what to encode, it handles axes, legends, scales, and tooltips automatically. Renders SVG that inherits CSS colors.

Prefer Plot over Chart.js when you need: SVG output (scales to any size), auto-axes, built-in tooltips via `tip`, or CSS-themable text. Prefer Chart.js when you need: canvas rendering (thousands of points), radar/polar charts, or doughnut charts.

**CDN (ESM):**
```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  // Plot auto-resolves its D3 dependencies — no separate D3 import needed
</script>
```

### Dark Mode and CSS Variable Theming

Plot renders SVG — text elements inherit `color` from CSS, and you can set `--plot-background` for the figure background. Combine with the `isDark` pattern for conditional color scales:

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const textColor = isDark ? '#8b949e' : '#6b7280';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Plot options that respond to theme:
  const themeDefaults = {
    style: { background: 'transparent', color: textColor },
    grid: true,
    marginLeft: 50,
  };
</script>
```

CSS overrides for Plot's SVG (place in your `<style>`):
```css
/* Plot renders <figure> with ARIA-labeled axes */
.chart-wrap svg text { fill: var(--text-dim); }
.chart-wrap svg [aria-label="x-axis"] line,
.chart-wrap svg [aria-label="y-axis"] line { stroke: var(--border); }
.chart-wrap svg [aria-label="x-axis"] tick line,
.chart-wrap svg [aria-label="y-axis"] tick line { stroke: var(--border); }
```

### Example: Scatter Plot (Correlate task)

`Plot.dot()` with x/y position, fill by category, and `tip` for tooltips.

```html
<div class="chart-wrap">
  <div class="chart-title">Effort vs Impact</div>
  <div id="scatter"></div>
</div>

<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const data = [
    { effort: 2, impact: 8, category: "Quick win", label: "Auth cache" },
    { effort: 7, impact: 9, category: "Strategic", label: "Event mesh" },
    { effort: 5, impact: 3, category: "Low value", label: "UI polish" },
    { effort: 1, impact: 5, category: "Quick win", label: "Error pages" },
    { effort: 8, impact: 4, category: "Low value", label: "Legacy migration" },
    { effort: 6, impact: 7, category: "Strategic", label: "API v2" },
  ];

  const chart = Plot.plot({
    style: { background: "transparent", color: isDark ? "#8b949e" : "#6b7280" },
    grid: true,
    marginLeft: 50,
    x: { label: "Effort (story points)" },
    y: { label: "Impact (1-10)" },
    color: {
      legend: true,
      range: isDark
        ? ["#818cf8", "#34d399", "#f87171"]
        : ["#4f46e5", "#059669", "#dc2626"]
    },
    marks: [
      Plot.dot(data, {
        x: "effort", y: "impact", fill: "category", r: 6,
        tip: true, title: d => `${d.label}\n${d.category}`
      }),
    ]
  });

  document.getElementById("scatter").append(chart);
</script>
```

### Example: Dot Strip (Rank/order task)

`Plot.dotX()` for horizontal ranking on a common scale.

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const data = [
    { team: "Platform", velocity: 42 },
    { team: "Growth", velocity: 38 },
    { team: "Data", velocity: 31 },
    { team: "Mobile", velocity: 27 },
    { team: "DevOps", velocity: 45 },
  ];

  const chart = Plot.plot({
    style: { background: "transparent", color: isDark ? "#8b949e" : "#6b7280" },
    marginLeft: 80,
    x: { label: "Sprint Velocity" },
    marks: [
      Plot.dotX(data, {
        x: "velocity", y: "team", fill: isDark ? "#818cf8" : "#4f46e5",
        r: 5, sort: { y: "x", reverse: true }
      }),
      Plot.ruleX([0]),
    ]
  });

  document.getElementById("dot-strip").append(chart);
</script>
```

### Example: Line Chart (Trend task)

`Plot.lineY()` with date x-axis and automatic scale.

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const data = [
    { date: new Date("2025-01"), value: 120 },
    { date: new Date("2025-02"), value: 145 },
    { date: new Date("2025-03"), value: 132 },
    { date: new Date("2025-04"), value: 178 },
    { date: new Date("2025-05"), value: 195 },
    { date: new Date("2025-06"), value: 210 },
  ];

  const chart = Plot.plot({
    style: { background: "transparent", color: isDark ? "#8b949e" : "#6b7280" },
    grid: true,
    y: { label: "Monthly Active Users" },
    marks: [
      Plot.lineY(data, {
        x: "date", y: "value",
        stroke: isDark ? "#818cf8" : "#4f46e5",
        strokeWidth: 2,
        curve: "catmull-rom"
      }),
      Plot.dot(data, {
        x: "date", y: "value",
        fill: isDark ? "#818cf8" : "#4f46e5",
        r: 3, tip: true
      }),
    ]
  });

  document.getElementById("line-chart").append(chart);
</script>
```

### Example: Area Chart (Trend + magnitude)

`Plot.areaY()` with fill for volume perception.

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const accent = isDark ? "#818cf8" : "#4f46e5";
  const data = [
    { date: new Date("2025-01"), value: 120 },
    { date: new Date("2025-02"), value: 145 },
    { date: new Date("2025-03"), value: 132 },
    { date: new Date("2025-04"), value: 178 },
    { date: new Date("2025-05"), value: 195 },
    { date: new Date("2025-06"), value: 210 },
  ];

  const chart = Plot.plot({
    style: { background: "transparent", color: isDark ? "#8b949e" : "#6b7280" },
    grid: true,
    y: { label: "Revenue ($K)" },
    marks: [
      Plot.areaY(data, {
        x: "date", y: "value",
        fill: accent, fillOpacity: 0.15,
        curve: "catmull-rom"
      }),
      Plot.lineY(data, {
        x: "date", y: "value",
        stroke: accent, strokeWidth: 2,
        curve: "catmull-rom"
      }),
    ]
  });

  document.getElementById("area-chart").append(chart);
</script>
```

### Example: Heatmap (Dense multivariate)

`Plot.cell()` with color-coded cells for matrix views.

```html
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"];
  const data = days.flatMap(day =>
    hours.map(hour => ({
      day, hour, activity: Math.floor(Math.random() * 100)
    }))
  );

  const chart = Plot.plot({
    style: { background: "transparent", color: isDark ? "#8b949e" : "#6b7280" },
    padding: 0.05,
    x: { label: null, tickRotate: -45 },
    y: { label: null },
    color: {
      scheme: isDark ? "blues" : "ylgnbu",
      legend: true,
      label: "Activity"
    },
    marks: [
      Plot.cell(data, {
        x: "hour", y: "day", fill: "activity",
        tip: true, title: d => `${d.day} ${d.hour}: ${d.activity}`
      }),
    ]
  });

  document.getElementById("heatmap").append(chart);
</script>
```

### Theming Cheat Sheet

| What to control | Plot option | CSS variable |
|---|---|---|
| Figure background | `style: { background }` | `--plot-background` or use `"transparent"` |
| Axis/tick text color | `style: { color }` | Inherited from container `color` |
| Grid lines | `grid: true` + stroke via CSS | `.chart-wrap svg line { stroke: var(--border) }` |
| Color scale | `color: { range: [...] }` | Use `isDark` ternary for light/dark ranges |
| Font | `style: { fontFamily }` | Inherited from container `font-family` |
| Tooltip style | N/A (Plot's tip uses SVG) | Override via `.chart-wrap [aria-label*="tip"]` |

---

## D3.js — Specialized Layouts

Use for layouts Observable Plot can't handle: treemaps, Sankey diagrams, force-directed graphs, and choropleths. D3 is low-level — you build the SVG yourself. Only import D3 when Plot won't work.

Plot auto-resolves D3 dependencies internally. Import D3 separately only when you need `d3.hierarchy`, `d3.treemap`, `d3Sankey`, or `d3.geoPath`.

**CDN (ESM):**
```html
<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
  // For Sankey (separate package):
  import * as d3Sankey from "https://cdn.jsdelivr.net/npm/d3-sankey@0.12/+esm";
</script>
```

### Dark Mode Handling

D3 renders raw SVG attributes — use the `isDark` pattern to set colors in JS:

```javascript
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const textColor = isDark ? '#8b949e' : '#6b7280';
const bgColor = isDark ? '#161b22' : '#ffffff';
// Use CSS variables where possible:
const style = getComputedStyle(document.documentElement);
const accent = style.getPropertyValue('--accent').trim();
```

### Example: Treemap (Part-of-whole)

`d3.hierarchy()` + `d3.treemap()` with categorical color scale.

```html
<div class="d3-chart-wrap">
  <div class="chart-title">Work Distribution</div>
  <div id="treemap"></div>
</div>

<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const width = 600, height = 400;

  const data = {
    name: "Work",
    children: [
      { name: "Features", value: 45, children: [
        { name: "Auth", value: 20 }, { name: "Dashboard", value: 15 }, { name: "API", value: 10 }
      ]},
      { name: "Bugs", value: 25, children: [
        { name: "Critical", value: 10 }, { name: "Minor", value: 15 }
      ]},
      { name: "Tech Debt", value: 20 },
      { name: "Docs", value: 10 },
    ]
  };

  const root = d3.hierarchy(data).sum(d => d.value).sort((a, b) => b.value - a.value);
  d3.treemap().size([width, height]).padding(2).round(true)(root);

  const colors = isDark
    ? ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#38bdf8"]
    : ["#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0284c7"];
  const color = d3.scaleOrdinal(colors);

  const svg = d3.create("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", "auto");

  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  leaf.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.parent.data.name))
    .attr("fill-opacity", 0.85)
    .attr("rx", 3);

  leaf.append("text")
    .attr("class", "treemap-label")
    .attr("x", 6).attr("y", 16)
    .text(d => d.data.name)
    .attr("fill", isDark ? "#e6edf3" : "#1a1a2e");

  leaf.append("text")
    .attr("class", "treemap-label-small")
    .attr("x", 6).attr("y", 30)
    .text(d => d.data.value)
    .attr("fill", isDark ? "#8b949e" : "#6b7280");

  document.getElementById("treemap").append(svg.node());
</script>
```

### Example: Sankey Diagram (Flow quantities)

`d3Sankey.sankey()` for flow-with-quantity visualization.

```html
<div class="d3-chart-wrap">
  <div class="chart-title">Pipeline Flow</div>
  <div id="sankey"></div>
</div>

<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
  import * as d3Sankey from "https://cdn.jsdelivr.net/npm/d3-sankey@0.12/+esm";

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const width = 700, height = 400;

  const data = {
    nodes: [
      { name: "Leads" }, { name: "Qualified" }, { name: "Demo" },
      { name: "Proposal" }, { name: "Won" }, { name: "Lost" }
    ],
    links: [
      { source: 0, target: 1, value: 100 },
      { source: 1, target: 2, value: 60 },
      { source: 1, target: 5, value: 40 },
      { source: 2, target: 3, value: 45 },
      { source: 2, target: 5, value: 15 },
      { source: 3, target: 4, value: 30 },
      { source: 3, target: 5, value: 15 },
    ]
  };

  const sankey = d3Sankey.sankey()
    .nodeWidth(20)
    .nodePadding(16)
    .extent([[1, 1], [width - 1, height - 1]]);

  const { nodes, links } = sankey(data);

  const colors = isDark
    ? ["#818cf8", "#34d399", "#38bdf8", "#fbbf24", "#4ade80", "#f87171"]
    : ["#4f46e5", "#059669", "#0284c7", "#d97706", "#16a34a", "#dc2626"];
  const color = d3.scaleOrdinal(colors);

  const svg = d3.create("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", "auto");

  // Links
  svg.append("g")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("class", "sankey-link")
    .attr("d", d3Sankey.sankeyLinkHorizontal())
    .attr("stroke", d => color(d.source.name))
    .attr("stroke-width", d => Math.max(1, d.width));

  // Nodes
  svg.append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("class", "sankey-node")
    .attr("x", d => d.x0).attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => color(d.name));

  // Labels
  svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("class", "sankey-label")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name)
    .attr("fill", isDark ? "#e6edf3" : "#1a1a2e");

  document.getElementById("sankey").append(svg.node());
</script>
```

### Choropleth Note

Choropleths require TopoJSON data (country/state boundaries) as an external dependency. The pattern is:

```javascript
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";
// Load TopoJSON: https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
// Use d3.geoPath() + d3.geoNaturalEarth1() for projection
// Color via d3.scaleSequential(d3.interpolateBlues)
```

Documented but not fully templated — choropleths need domain-specific geo data. See D3's [choropleth example](https://observablehq.com/@d3/choropleth) for the full pattern.

---

## anime.js — Orchestrated Animations

Use when a diagram has 10+ elements and you want a choreographed entrance sequence (staggered reveals, path drawing, count-up numbers). For simpler diagrams, CSS `animation-delay` staggering is sufficient.

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>

<script>
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    anime({
      targets: '.node',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80, { start: 200 }),
      easing: 'easeOutCubic',
      duration: 500,
    });

    anime({
      targets: '.connector path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutCubic',
      duration: 800,
      delay: anime.stagger(150, { start: 600 }),
    });

    document.querySelectorAll('[data-count]').forEach(el => {
      anime({
        targets: { val: 0 },
        val: parseInt(el.dataset.count),
        round: 1,
        duration: 1200,
        delay: 400,
        easing: 'easeOutExpo',
        update: (anim) => { el.textContent = anim.animations[0].currentValue; }
      });
    });
  }
</script>
```

When using anime.js, set initial opacity to 0 in CSS so elements don't flash before the animation:
```css
.node { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .node { opacity: 1 !important; }
}
```

## Google Fonts — Typography

Always load with `display=swap` for fast rendering. Pick a distinctive pairing — body + mono at minimum, optionally a display font for the title.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Define as CSS variables for easy reference:
```css
:root {
  --font-body: 'Outfit', system-ui, sans-serif;
  --font-mono: 'Space Mono', 'SF Mono', Consolas, monospace;
}
```

**Font suggestions** (rotate — never use the same pairing twice in a row):

| Body / Headings | Mono / Labels | Feel |
|---|---|---|
| Outfit | Space Mono | Clean geometric, modern |
| Instrument Serif | JetBrains Mono | Editorial, refined |
| Sora | IBM Plex Mono | Technical, precise |
| DM Sans | Fira Code | Friendly, developer |
| Fraunces | Source Code Pro | Warm, distinctive |
| Libre Franklin | Inconsolata | Classic, reliable |
| Manrope | Martian Mono | Soft, contemporary |
| Playfair Display | Roboto Mono | Elegant contrast |
| Bricolage Grotesque | Fragment Mono | Bold, characterful |
| Geist | Geist Mono | Vercel-inspired, sharp |
| Crimson Pro | Noto Sans Mono | Scholarly, serious |
| Red Hat Display | Red Hat Mono | Cohesive family |
| Plus Jakarta Sans | Azeret Mono | Rounded, approachable |

Never default to Inter, Roboto, Arial, or system-ui as the primary choice.
