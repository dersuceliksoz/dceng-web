# Dersu Celiksoz — Personal Engineering Website

## Context

Dersu Celiksoz needs a professional personal brand site that reads as the online platform of a serious **Systems & Control Engineer**, technical author, and future sector expert — not a corporate consulting page. The site must publish technical knowledge (a real publications library), promote education (Academy events/courses), and present his engineering identity with a clean, minimal, diagram-driven visual language. No site currently exists (`DersuSite/` is empty; Node v21.7.1 / npm 10.5.0 available).

This plan was validated by a 3-agent design pass + synthesis that confirmed the **Astro 5 Content Layer API** against current docs and resolved the architecture's tricky seams (content-config path, slug-keyed sort, a single shared filter engine, processed-module scripts, CSS token tiers).

### Decisions locked with the user
- **Language:** English (international expert positioning).
- **Contact:** real email `fabena33@gmail.com` wired in; LinkedIn/GitHub/Scholar = clearly-marked replaceable placeholders. `mailto:` only — no backend/form (keeps deploy static & host-agnostic).
- **Typeface:** self-hosted **Inter Variable** via `@fontsource-variable/inter` (no external request), system stack as fallback.
- **Scope:** spec minimum — category filters on Publications + Upcoming/Past filters on Academy. **No** publication detail pages, **no** search. Add lightweight `?cat=` / `?when=` URL sync for shareable filtered views (low cost).
- **Deferred TODOs (not blocking the build):** canonical `site` domain (placeholder `https://dersuceliksoz.com`), host choice (any of Vercel/Netlify/CF — all auto-detect static `dist/`), optional nightly rebuild for event freshness.

## Tech Stack
Astro 5 + TypeScript (strict), plain CSS with CSS variables, `@astrojs/mdx`, `@fontsource-variable/inter`. **No** React, **no** Tailwind, **no** animation libs. Static output, **no adapter**. Real multi-page routes — not an SPA. Minimal vanilla TS only for mobile nav + the two filter UIs.

## Architecture (key contracts)

- **Data layer (build time):** `publications` = MD/MDX via `glob()` (frontmatter = fields, body = abstract, future-proof for figures/equations). `events` = single `src/data/events.yaml` via `file()` (each entry needs a unique `id`). `profile`/`experience` = plain typed TS modules (single/short records — no collection needed). Dates use `z.coerce.date()`.
- **Sort:** done **once at build time** in `src/lib/publications.ts` — slug-keyed `CATEGORY_ORDER` (white-paper→0 … engineering-note→4), then newest-first within category. A separate `CATEGORY_LABELS` map holds display names so slugs (used in data-attributes) and labels never drift.
- **Filter contract:** pages render the full sorted dataset server-side; each row carries a data-attribute (`data-category` on pub rows, `data-when` on event rows) whose value is the enum slug verbatim. Chips carry `data-filter`. One shared `initFilter()` engine only toggles an `.is-hidden` class + updates `aria-pressed` and an `aria-live` count — **it never re-sorts** (build-time order is the single source of truth).
- **Scripts:** all behavior lives in `src/scripts/*.ts` imported via **processed `<script>` module imports** (`<script>import '../scripts/nav.ts'</script>`) so Astro bundles, type-checks, minifies, and dedupes across pages.
- **CSS:** one `src/styles/global.css` imported in `Layout` — two-tier tokens (raw spec palette → semantic aliases), reset, `:focus-visible` ring, `prefers-reduced-motion` reset, layout primitives (`.container`, `.section`, `.stack`, `.cluster`, `.card`, `.grid-bg`, `.visually-hidden`). Component-specific styles use Astro scoped `<style>`. `--container-narrow: 760px` doubles as the single responsive breakpoint.

## File Tree
```
DersuSite/
├── astro.config.mjs            # static output, no adapter, site URL, @astrojs/mdx
├── package.json                # astro, @astrojs/mdx, @astrojs/check, typescript, @fontsource-variable/inter
│                               #   build = "astro check && astro build"
├── tsconfig.json               # extends astro/tsconfigs/strict
├── public/
│   ├── favicon.svg             # minimal monogram (no raster)
│   └── robots.txt
├── src/
│   ├── content.config.ts       # ⚠ EXACT path. Content Layer API: publications (glob MD/MDX) + events (file YAML)
│   ├── content/publications/   # one .md/.mdx per publication (5 placeholders, one per category)
│   ├── data/
│   │   ├── events.yaml          # file() array, each entry unique id, upcoming + past, placeholder:true
│   │   ├── profile.ts           # name, role, brandLine, company (footer-only), contact links
│   │   └── experience.ts        # typed array for Timeline (experience + education)
│   ├── lib/publications.ts      # CATEGORY_ORDER + CATEGORY_LABELS + sortPublicationsAll
│   ├── layouts/Layout.astro     # head/meta, .no-js→.js snippet, skip-link, global.css + font, Header/main/Footer
│   ├── components/              # 13 components (see list below)
│   ├── pages/                   # index, about, engineering, publications, academy, contact
│   ├── scripts/
│   │   ├── nav.ts               # mobile disclosure: aria-expanded, focus return, Esc, matchMedia close, scroll-lock
│   │   └── filters.ts           # shared initFilter(root,{itemAttr,liveRegion}) + ?cat=/?when= URL sync
│   └── styles/global.css        # tokens (raw+semantic), reset, focus, reduced-motion, primitives
```

## Components (13)
`Layout.astro`, `Header.astro`, `Footer.astro` (the ONLY place "DC Engineering Solutions" appears), `PageHeader.astro` (eyebrow/h1/lede — one h1 per page), `Button.astro` (polymorphic `<a>`/`<button>`, variants primary/secondary/ghost), `TagList.astro` (wrapping hairline chips, also base for filter chips), `TechnicalCard.astro` (hairline card + optional PreviewGraphic), `PreviewGraphic.astro` (inline-SVG 16:9 placeholders, `variant`: control-loop / grid-plot / signal / nodes, `role="img"` + title), `PublicationList.astro` (professional list rows emitting the data-attribute contract), `PublicationFilters.astro` (All + 5 category chips), `EventFilters.astro` (Upcoming/Past chips), `Timeline.astro` (hairline rail — drives About experience/education + Academy events), `ContactCard.astro` (channels from `profile.ts`, mailto). Each gets a typed `Props` interface.

## Pages (content per spec)
- **`/`** — Hero (label "Systems & Control Engineer", h1 "Dersu Celiksoz", tagline, buttons → Engineering/Publications/Academy, circular profile placeholder; mobile reorders graphic above text via DOM order). Short statement. Technical Focus (4 `TechnicalCard`s: System Design / Modeling & Simulation / Control Systems / Verification & Validation — describing the lifecycle). Latest Publication + Upcoming Activities (2-col desktop / 1-col mobile).
- **`/about`** — Background, Engineering Focus tags, **Approach** (how he thinks as an engineer, emphasized), Tools & Technologies, Experience `Timeline`, Education, Download Resume button placeholder.
- **`/engineering`** — Intro, Capabilities cards (Control Systems / Modeling & Simulation / Systems Engineering / V&V), Application Domains tags, Collaboration Models, Selected Work (16:9 `PreviewGraphic` cards: Control-Oriented Vehicle Dynamics Modeling, Real-Time Simulator Development, Gimbal Stabilization Control Design, SIL/HIL Validation Framework), subtle cross-link to Publications.
- **`/publications`** — Overview, Featured Work (2–3 highlighted), Publication Library (`getCollection` → drop `draft` in PROD only, keep `placeholder` badged → `sortPublicationsAll` → filters + list rows, default "All"), Research & Future Work.
- **`/academy`** — Overview, Events (Upcoming/Past filters, build-time classification + `data-date`), Courses (Coming Soon placeholder).
- **`/contact`** — Overview, ContactCards (LinkedIn placeholder, Email `fabena33@gmail.com`, Location: Ankara, Türkiye). Calm, no sales funnel.

## Build Order
1. **Scaffold:** `package.json` (`build = "astro check && astro build"`), `tsconfig.json` (strict), `astro.config.mjs` (static, no adapter, `site`, mdx). Install deps incl. `@fontsource-variable/inter`.
2. **Tokens + global CSS first:** `global.css` with two-tier `:root` tokens, reset, base type, `:focus-visible` (navy 2px + offset), `prefers-reduced-motion` reset, primitives.
3. **Data layer:** `src/content.config.ts` (Content Layer API, `z.coerce.date()`), `src/lib/publications.ts` (slug-keyed order + labels + `sortPublicationsAll`), `profile.ts` + `experience.ts`.
4. **Placeholder content** exercising the full sort: 5 publication `.md` files (one per category, ≥1 `featured`, `status: placeholder`) + `events.yaml` (upcoming + past, unique ids, `placeholder: true`).
5. **Shell components:** `Layout` (head/meta, `.no-js→.js`, skip-link, font preload), `Header` (+ `nav.ts`), `Footer` (only "DC Engineering Solutions"), `PageHeader`.
6. **Primitives:** `Button`, `TagList`, `PreviewGraphic` (SVG variants), `TechnicalCard`, `ContactCard`, `Timeline`.
7. **Publications feature:** `PublicationList` (data-attribute rows), `PublicationFilters`, wire `initFilter({itemAttr:'data-category'})`, default chip `aria-pressed="true"`.
8. **Academy feature:** `EventFilters`, reuse rows with build-time `data-when` + `data-date`, same `initFilter({itemAttr:'data-when'})`, default Upcoming, Courses Coming-Soon.
9. **Pages:** all six, per content above.
10. **Responsive pass:** single 760px breakpoint, mobile-first; hero graphic-above-text via DOM order; chip `flex-wrap`; single-column cards; overflow guards.
11. **A11y + no-JS pass:** skip-link, heading hierarchy, keyboard-test mobile nav (Esc, focus return, matchMedia close), `aria-live` filter counts; with JS off → full lists visible, hamburger/chips hidden.
12. **Build + deploy:** `npm run build` (astro check gates schema/TS), `npm run preview` smoke test.

## Key Snippets (pin the decisions)

**`src/content.config.ts`** — ⚠ path MUST be `src/content.config.ts` (NOT `src/content/config.ts`, which triggers legacy-compat mode):
```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['white-paper','journal','conference','patent','engineering-note']),
    date: z.coerce.date(),
    authors: z.array(z.string()).default(['Dersu Celiksoz']),
    summary: z.string(),
    venue: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    graphic: z.enum(['control-loop','grid-plot','signal','nodes']).default('grid-plot'),
    featured: z.boolean().default(false),
    status: z.enum(['published','draft','placeholder']).default('published'),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: file('src/data/events.yaml'),
  schema: z.object({
    title: z.string(),
    type: z.enum(['webinar','course','talk','workshop']),
    date: z.coerce.date(),
    location: z.string().default('Online'),
    status: z.enum(['upcoming','past']),
    registrationUrl: z.string().url().optional(),
    summary: z.string(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { publications, events };
```

**`src/lib/publications.ts`** — slug-keyed order + separate labels:
```ts
import type { CollectionEntry } from 'astro:content';
type Cat = CollectionEntry<'publications'>['data']['category'];

export const CATEGORY_ORDER: Record<Cat, number> = {
  'white-paper': 0, 'journal': 1, 'conference': 2, 'patent': 3, 'engineering-note': 4,
};
export const CATEGORY_LABELS: Record<Cat, string> = {
  'white-paper': 'White Papers', 'journal': 'Journal Articles', 'conference': 'Conference Papers',
  'patent': 'Patents', 'engineering-note': 'Engineering Notes',
};
export function sortPublicationsAll(items: CollectionEntry<'publications'>[]) {
  return [...items].sort((a, b) => {
    const byCat = CATEGORY_ORDER[a.data.category] - CATEGORY_ORDER[b.data.category];
    return byCat !== 0 ? byCat : b.data.date.getTime() - a.data.date.getTime();
  });
}
```

**`src/scripts/filters.ts`** — one shared engine (show/hide only, + URL sync):
```ts
export function initFilter(
  root: HTMLElement,
  { itemAttr, liveRegion }: { itemAttr: string; liveRegion?: HTMLElement | null },
) {
  const chips = root.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = root.querySelectorAll<HTMLElement>('[' + itemAttr + ']');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const key = itemAttr.replace(/^data-/, '');          // 'category' | 'when'
  function apply(filter: string) {
    let shown = 0;
    items.forEach((el) => {
      const match = filter === 'all' || el.dataset[key] === filter;
      el.classList.toggle('is-hidden', !match); if (match) shown++;
    });
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
    if (empty) empty.hidden = shown !== 0;
    if (liveRegion) liveRegion.textContent = 'Showing ' + shown + ' of ' + items.length;
  }
  chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter ?? 'all')));
  const start = root.querySelector<HTMLButtonElement>('[data-filter][aria-pressed="true"]');
  apply(start?.dataset.filter ?? 'all');
}
```
Publications: `initFilter(root, { itemAttr: 'data-category' })` (default "All"). Academy: `initFilter(root, { itemAttr: 'data-when' })` (default Upcoming). URL sync reads/writes `?cat=`/`?when=` via `history.replaceState`.

**`global.css`** — two-tier tokens + `--line` guard:
```css
:root{
  --ink:#16181a; --ink-soft:#5b5e60; --navy:#0c2d4d; --navy-soft:#2e5c84;
  --line:#e4e3df; --bg:#ffffff; --bg-soft:#f7f7f5;
  --color-text:var(--ink); --color-text-muted:var(--ink-soft);
  --color-accent:var(--navy); --color-accent-soft:var(--navy-soft);
  --color-border:var(--line); --color-surface:var(--bg); --color-surface-2:var(--bg-soft);
  --color-focus:var(--navy-soft);
  --font-sans:'Inter Variable',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  --container-max:1120px; --container-narrow:760px; /* narrow == single breakpoint */
}
/* --line is ~1.28:1 on white: HAIRLINE/BORDER ONLY — never text, never the sole state signal. */
:where(a,button,[tabindex]):focus-visible{ outline:2px solid var(--color-focus); outline-offset:2px; }
@media (prefers-reduced-motion:reduce){ *,*::before,*::after{ transition:none!important; animation:none!important; } }
```

## Risks & Guards
1. **Content-config path:** must be exactly `src/content.config.ts`. `src/content/config.ts` silently enters legacy mode and the loaders misbehave.
2. **Sort integrity:** category enum slugs must equal `CATEGORY_ORDER` keys; labels live only in `CATEGORY_LABELS`. A label-as-key typo yields `undefined` priority.
3. **No client re-sort:** `initFilter` only show/hides; build-time order is canonical, so "All" never reorders on first interaction.
4. **Mobile nav focus:** `matchMedia` must close + un-trap focus when resizing past 760px; Escape returns focus to the toggle. Keyboard/SR test required.
5. **Use-of-color (WCAG 1.4.1):** active chip needs a non-color cue (fill/weight) **plus** `aria-pressed`; `--line` alone can't signal state.
6. **Event freshness:** Upcoming/Past freezes at build time on a static site — note for the user; optional nightly rebuild or additive client re-classify from `data-date`. No-JS users still get the build-time split.
7. **Stay static:** no SSR adapter. Contact = `mailto:`; if a form is ever needed, use a third-party endpoint (Formspree/Netlify Forms), never an adapter.
8. **No-JS degradation:** hamburger + filter chips gated behind `.js`; all rows visible by default.
9. **Fonts:** use the `@fontsource-variable/inter` package (managed asset) — a raw `/public/fonts` woff2 would 404 silently and mask a regression. `font-display: swap` + preload.

## Verification
- **Build gate:** `npm run build` must pass (runs `astro check` first → fails fast on schema/TS errors, malformed dates via `z.coerce.date()`, or missing event `id`s). Then `npm run preview` for a smoke test.
- **Routes:** confirm all six routes render with no console errors.
- **Filters:** Publications "All" shows correct priority order (White Papers → … → Engineering Notes, newest-first within each); each category chip narrows correctly; count updates; empty state works. Academy Upcoming/Past toggles correctly; `?cat=`/`?when=` deep-links restore filtered state.
- **Responsive:** at <760px — hamburger appears, hero graphic above text, cards single-column, chips wrap, no horizontal overflow.
- **A11y:** keyboard-only nav open/close (Esc + focus return), skip-link works, one h1 per page, visible focus rings, `aria-live` count announces, `prefers-reduced-motion` honored, navy-on-white / ink-soft-on-white contrast checked.
- **No-JS:** disable JS — all publications/events visible, no dead controls (hamburger/chips hidden).
- **Visual:** spot-check via `npm run preview` / browser preview MCP that the engineering-minimal language holds (hairlines, grid details, SVG placeholders — no gradients/photos).
