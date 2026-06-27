# CLAUDE.md

Context for Claude Code working in this repository. Travels with the project folder, so any
machine/session has the same background. (User-level memory under `~/.claude/` does **not**
travel — this file is the portable source of truth.)

## What this is

Personal engineering brand website for **Dersu Celiksoz**, Systems & Control Engineer (Ankara,
Türkiye). Footer-only company text: "DC Engineering Solutions". The owner communicates in
**Turkish**; the **site content is English** (international/expert positioning).

Tone target: technical, minimal, research-oriented. **Avoid** corporate-consulting clichés,
mission/vision sections, startup-landing style, big gradients, stock photos, aggressive CTAs.

## Stack & hard constraints

- **Astro 5 + TypeScript (strict)**, plain CSS with CSS variables. **No** React, **no** Tailwind,
  **no** animation libraries.
- **Static output, no adapter.** Do not add an SSR adapter. Keep contact as `mailto:`; if a form
  is ever needed, use a third-party endpoint (Formspree/Netlify Forms), never SSR.
- Minimal vanilla TS only for: mobile nav (`src/scripts/nav.ts`) and filters (`src/scripts/filters.ts`).
- Real multi-page routes (not an SPA): `/ /about /engineering /publications /academy /contact`.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check (type/schema gate) + astro build -> dist/
npm run preview   # serve dist/
```
`npm run build` fails on TS errors, content-schema errors, malformed dates (`z.coerce.date()`),
or a missing event `id`. Treat a green build as the baseline gate.

## Architecture & conventions

- **Content layer (Astro 5 Content Layer API).** Config lives at **`src/content.config.ts`**
  (NOT `src/content/config.ts` — that path silently triggers legacy compat mode). Publications
  use the `glob()` MD/MDX loader; events use the `file()` YAML loader (`src/data/events.yaml`,
  each entry needs a unique `id`). `profile.ts` / `experience.ts` are plain typed TS modules.
- **Publication sort** is centralized in `src/lib/publications.ts`: `CATEGORY_ORDER` is keyed by
  enum **slugs** (also used as `data-*` values); `CATEGORY_LABELS` holds display names separately so
  the two never drift. `sortPublicationsAll()` runs once at build time — category priority, then
  newest-first. The client filter must **never re-sort**, only show/hide.
- **Filter engine.** One shared `initFilter()` in `src/scripts/filters.ts` powers both Publications
  and Academy. Markup contract: a wrapper `[data-filter-root]` carries `data-item-attr`
  (`data-category` | `data-when`) and optional `data-param` (`cat` | `when`) for `?cat=`/`?when=`
  URL sync; chips carry `data-filter`; items carry the item attr; `[data-empty]` is the empty state;
  `[data-filter-status]` is the `aria-live` count. It toggles `.is-hidden` and `aria-pressed` only.
- **Scripts are processed module imports** (`<script>import '../scripts/x.ts'</script>`), not inline
  blocks — so Astro bundles/type-checks/minifies/dedupes them.
- **CSS.** One `src/styles/global.css` (imported in Layout) holds two-tier tokens (raw spec palette →
  semantic aliases), reset, primitives (`.container`, `.section`, `.stack`, `.cluster`, `.grid`,
  `.card`, `.grid-bg`, `.visually-hidden`), `.is-hidden`, `.chip`, and the `.no-js [data-requires-js]`
  gate. Components use scoped `<style>`. Single responsive breakpoint: **760px**.
- **Progressive enhancement.** `<html class="no-js">` is flipped to `js` by an inline head script
  before paint. JS-only controls are wrapped in `[data-requires-js]` (hidden under `.no-js`). With
  JS off, all content rows stay visible.

## Gotchas (already hit — don't reintroduce)

- **Scoped styles + html-level classes:** `.js` / `.no-js` live on `<html>`, outside any component.
  In an Astro scoped `<style>` they MUST be written `:global(.js) .x { }` / `:global(.no-js) .x { }`,
  otherwise Astro scopes them to a component element and the rule never matches. (This broke the
  mobile nav panel once.)
- **`aria-pressed`** wants a boolean / `"true"|"false"`, not `String(...)`. Pass the boolean expression
  directly — Astro renders it correctly.

## Decisions locked with the owner

- English content · self-hosted Inter (`@fontsource-variable/inter`) · `mailto:` contact only.
- Scope = spec-minimum: **no** publication detail pages, **no** search. Category + Upcoming/Past
  filters only, plus `?cat=`/`?when=` URL sync.
- Static / host-agnostic (`dist/` deploys to Vercel/Netlify/CF as-is).

## Still placeholder (see README "Replace before launch")

Real LinkedIn/Scholar links, experience/education, publications, events, resume PDF, hero portrait,
and the production `site` domain. All are clearly marked (`placeholder: true`, `status: placeholder`,
or REPLACE-ME comments).
