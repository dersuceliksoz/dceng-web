# Dersu Celiksoz — Personal Engineering Website

The personal brand site of **Dersu Celiksoz**, Systems & Control Engineer (Ankara, Türkiye).
A minimal, fast, diagram-driven engineering site: an About page, an Engineering portfolio, a
Publications library with filters, an Academy events section, and Contact.

- **Brand line:** Designing, modeling and validating control-driven engineering systems.
- **Stack:** [Astro 5](https://astro.build) · TypeScript (strict) · plain CSS with CSS variables · self-hosted Inter.
- **No** React, **no** Tailwind, **no** animation libraries. **Static** output (no server adapter).

---

## Quick start

**Prerequisites:** [Node.js](https://nodejs.org) **18 or newer** and npm (developed on Node 21 / npm 10).

```bash
npm install      # install dependencies (run this first, especially on a new machine)
npm run dev      # start the dev server at http://localhost:4321
npm run build    # type-check (astro check) + build the static site into dist/
npm run preview  # serve the built dist/ locally to verify the production build
```

The production output is a plain static folder, `dist/`, that can be deployed as-is.

---

## Moving to another computer

The project folder is fully portable. The heavy/generated folders are **not** stored in it
(they are recreated locally), so:

1. Copy the project folder **or** clone the git repository to the new machine.
   - You do **not** need to copy `node_modules/`, `dist/`, or `.astro/` — these are regenerated.
   - You **do** need `package.json` and `package-lock.json` (both are included) for a reproducible install.
2. On the new machine, run:
   ```bash
   npm install
   npm run dev      # or: npm run build
   ```

That's it — same site, any computer with Node 18+.

> If you zip-copy the folder *with* `node_modules`, delete `node_modules` on the new machine and
> re-run `npm install` (native binaries can differ between OSes/CPUs).

---

## Project structure

```
DersuSite/
├── astro.config.mjs          # static output, site URL, @astrojs/mdx
├── package.json              # deps + scripts (build = "astro check && astro build")
├── tsconfig.json             # extends astro/tsconfigs/strict
├── public/                   # favicon.svg, robots.txt (copied as-is)
├── src/
│   ├── content.config.ts     # Astro 5 Content Layer API (publications + events schemas)
│   ├── content/publications/ # one .md/.mdx per publication (frontmatter = fields, body = abstract)
│   ├── data/
│   │   ├── events.yaml        # Academy events (each entry needs a unique id)
│   │   ├── profile.ts         # identity, contact links, focus areas, tools, approach — EDIT ME
│   │   └── experience.ts      # experience + education for the Timeline — EDIT ME
│   ├── lib/                   # publications.ts + events.ts (sort/format helpers)
│   ├── layouts/Layout.astro   # HTML shell: head/meta, global CSS, font, Header/Footer
│   ├── components/            # 13 reusable .astro components
│   ├── pages/                 # index, about, engineering, publications, academy, contact
│   ├── scripts/               # nav.ts (mobile nav) + filters.ts (shared filter engine)
│   └── styles/global.css      # design tokens, reset, layout primitives, filter chips
└── .claude/launch.json        # dev-server config used by the preview tooling (optional)
```

---

## Editing content

**Add a publication** — create a new `.md` file in `src/content/publications/`:

```markdown
---
title: "Your title"
category: white-paper        # white-paper | journal | conference | patent | engineering-note
date: 2026-06-01
summary: "One-sentence summary shown in the list row."
venue: "Where it appeared"
doi: "10.xxxx/xxxxx"         # optional
url: "https://..."           # optional (used for the row link if no doi)
graphic: grid-plot           # control-loop | grid-plot | signal | nodes
featured: false              # true => shown in "Featured Work"
status: published            # published | draft | placeholder
tags: ["Tag A", "Tag B"]
---

The abstract / notes go here (Markdown body).
```

The library is sorted automatically: by category (White Papers → Journal → Conference →
Patents → Engineering Notes), then newest-first within each category.

**Add an event** — append to `src/data/events.yaml` (give each a unique `id`). Upcoming vs Past
is decided automatically from the date at build time.

**Edit identity / contact / tools / approach** — `src/data/profile.ts`.
**Edit experience & education** — `src/data/experience.ts`.

---

## Replace before launch (clearly-marked placeholders)

- [ ] Real **LinkedIn** + **Google Scholar/ORCID** links in `src/data/profile.ts` (currently `placeholder: true`)
- [ ] Real **experience & education** in `src/data/experience.ts`
- [ ] Real **publications** (the 6 files in `src/content/publications/` are `status: placeholder`)
- [ ] Real **events** in `src/data/events.yaml` (all `placeholder: true`)
- [ ] **Resume PDF** — the About "Download Resume" button is a disabled placeholder
- [ ] Real **portrait** — drop an `<img>` into `.hero__portrait` in `src/pages/index.astro`
- [ ] Production **domain** — set `site` in `astro.config.mjs` (placeholder: `https://dersuceliksoz.com`)

---

## Deploy

Static output works on any static host — no configuration needed:

| Host | Setup |
|------|-------|
| **Vercel** | Import repo; framework auto-detected; output `dist/` |
| **Netlify** | Build command `npm run build`, publish directory `dist` |
| **Cloudflare Pages** | Build command `npm run build`, output `dist` |

> Events' Upcoming/Past split is frozen at build time. To keep it fresh, trigger a periodic
> rebuild (e.g. a nightly scheduled deploy / build hook).

---

## Accessibility & progressive enhancement

Semantic HTML, one `<h1>` per page, visible focus rings, keyboard-accessible mobile nav
(`aria-expanded`, Escape closes + returns focus), `aria-live` filter counts, and
`prefers-reduced-motion` support. With JavaScript disabled, all content stays visible and the
JS-only controls (hamburger, filter chips) are hidden — no dead controls.
