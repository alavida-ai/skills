# Alavida Brand System

Brand identity for all visual-explainer output. Read this in Step 3 (Think) and Step 5 (Style). Values here are **locked** — use them exactly. Layout, chart type, density, and animation remain free to vary per page.

---

## Typography

**Fonts**: Crimson Pro (serif, body + headings) + Noto Sans Mono (labels, code, data).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-body: 'Crimson Pro', Georgia, 'Times New Roman', serif;
  --font-mono: 'Noto Sans Mono', 'SF Mono', Consolas, monospace;
}
```

**Rules**:
- Headings: `font-weight: 400; font-style: italic` — never bold headings, the italic carries the emphasis
- Section labels: `font-family: var(--font-mono); font-variant: small-caps; text-transform: uppercase; letter-spacing: 3px; font-size: 9px`
- Body text: `font-size: 18px; line-height: 1.7` — generous reading measure
- Chart/data labels: always `var(--font-mono)`
- KPI values: `var(--font-body); font-weight: 700` — serif numbers feel authoritative

---

## Color Palette

### Light Mode (primary)

```css
:root {
  --bg: #faf8f5;
  --surface: #ffffff;
  --surface-elevated: #ffffff;
  --border: rgba(0, 0, 0, 0.08);
  --border-bright: rgba(0, 0, 0, 0.15);
  --text: #2d2d2d;
  --text-dim: #8a8578;
  --accent: #6b7c5e;          /* sage green — primary brand color */
  --accent-dim: rgba(107, 124, 94, 0.06);
  --secondary: #c4704b;       /* terracotta — secondary brand color */

  --chart-1: #6b7c5e;         /* sage */
  --chart-2: #c4704b;         /* terracotta */
  --chart-3: #b8a88a;         /* muted gold */
  --chart-4: #8a8578;         /* warm gray */
  --chart-5: #a3b495;         /* light sage */

  --green: #6b7c5e;
  --green-dim: rgba(107, 124, 94, 0.08);
  --red: #c4704b;
  --red-dim: rgba(196, 112, 75, 0.08);
  --orange: #b8a88a;
  --orange-dim: rgba(184, 168, 138, 0.08);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1916;
    --surface: #252320;
    --surface-elevated: #2e2b27;
    --border: rgba(255, 255, 255, 0.06);
    --border-bright: rgba(255, 255, 255, 0.12);
    --text: #e8e4dc;
    --text-dim: #9a9488;
    --accent: #8fa67e;
    --accent-dim: rgba(143, 166, 126, 0.1);
    --secondary: #d4845e;

    --chart-1: #8fa67e;
    --chart-2: #d4845e;
    --chart-3: #c8b89a;
    --chart-4: #9a9488;
    --chart-5: #a8c296;

    --green: #8fa67e;
    --green-dim: rgba(143, 166, 126, 0.1);
    --red: #d4845e;
    --red-dim: rgba(212, 132, 94, 0.1);
    --orange: #c8b89a;
    --orange-dim: rgba(200, 184, 154, 0.1);
  }
}
```

### Chart Color Usage

| Slot | Light | Dark | Use for |
|------|-------|------|---------|
| `--chart-1` (sage) | `#6b7c5e` | `#8fa67e` | Primary data series, positive indicators |
| `--chart-2` (terracotta) | `#c4704b` | `#d4845e` | Secondary series, warnings, negative indicators |
| `--chart-3` (muted gold) | `#b8a88a` | `#c8b89a` | Tertiary series, neutral/amber states |
| `--chart-4` (warm gray) | `#8a8578` | `#9a9488` | Muted/background series, grid lines |
| `--chart-5` (light sage) | `#a3b495` | `#a8c296` | Accents, highlights, hover states |

Maximum 5 colors in any single chart. If the data has more categories, merge or use progressive disclosure.

---

## Tone and Surface Treatment

**Aesthetic direction**: Editorial, refined, premium. Inspired by long-form journalism and literary publications.

**Locked**:
- **Background**: Flat warm cream (`--bg`). No gradients, no dot grids, no radial glows. Clean and quiet.
- **Borders**: Thin 1px, `var(--border)`. No colored left-accents on cards. Use bottom borders for section separation.
- **Shadows**: None by default. Subtle `box-shadow` on hover only (e.g., `0 1px 4px rgba(0,0,0,0.06)`).
- **Border radius**: `0` on KPI cards (editorial grid feel), `8px` on chart containers and collapsible sections.
- **Spacing**: Generous — `56px+` between sections, `40px+` around KPI rows, `64px` body padding top.
- **Hero rule**: Thin centered `<hr>` (48px wide, 1px, accent color) below the hero subtitle.
- **KPI grid**: Use `gap: 1px; background: var(--border)` on the grid container with solid `background: var(--surface)` on cards — creates thin divider lines between cards without explicit borders.

**Free to vary**:
- Layout (grid columns, sidebar vs full-width, card arrangements)
- Chart types (scatter, radar, treemap, line, bar — whatever the data needs)
- Information density (dense for expert audiences, light for general)
- Animation (fadeUp, fadeScale — keep subtle, no bouncy/playful)
- Section count and structure
- Collapsible vs inline detail layers

---

## Quick Reference

Copy this block as the starting point for every page:

```css
:root {
  --font-body: 'Crimson Pro', Georgia, 'Times New Roman', serif;
  --font-mono: 'Noto Sans Mono', 'SF Mono', Consolas, monospace;
  --bg: #faf8f5;
  --surface: #ffffff;
  --surface-elevated: #ffffff;
  --border: rgba(0, 0, 0, 0.08);
  --border-bright: rgba(0, 0, 0, 0.15);
  --text: #2d2d2d;
  --text-dim: #8a8578;
  --accent: #6b7c5e;
  --accent-dim: rgba(107, 124, 94, 0.06);
  --secondary: #c4704b;
  --chart-1: #6b7c5e;
  --chart-2: #c4704b;
  --chart-3: #b8a88a;
  --chart-4: #8a8578;
  --chart-5: #a3b495;
  --green: #6b7c5e;
  --green-dim: rgba(107, 124, 94, 0.08);
  --red: #c4704b;
  --red-dim: rgba(196, 112, 75, 0.08);
  --orange: #b8a88a;
  --orange-dim: rgba(184, 168, 138, 0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1916;
    --surface: #252320;
    --surface-elevated: #2e2b27;
    --border: rgba(255, 255, 255, 0.06);
    --border-bright: rgba(255, 255, 255, 0.12);
    --text: #e8e4dc;
    --text-dim: #9a9488;
    --accent: #8fa67e;
    --accent-dim: rgba(143, 166, 126, 0.1);
    --secondary: #d4845e;
    --chart-1: #8fa67e;
    --chart-2: #d4845e;
    --chart-3: #c8b89a;
    --chart-4: #9a9488;
    --chart-5: #a8c296;
    --green: #8fa67e;
    --green-dim: rgba(143, 166, 126, 0.1);
    --red: #d4845e;
    --red-dim: rgba(212, 132, 94, 0.1);
    --orange: #c8b89a;
    --orange-dim: rgba(200, 184, 154, 0.1);
  }
}
```
