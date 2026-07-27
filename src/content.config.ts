/**
 * Astro 5 Content Layer API.
 * NOTE: this file MUST live at src/content.config.ts. The legacy path
 * src/content/config.ts silently enters compat mode and the glob/file
 * loaders behave differently.
 */
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** Publications — one MD/MDX file per entry (frontmatter = fields, body = abstract/notes). */
const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['white-paper', 'journal', 'conference', 'patent', 'engineering-note']),
    date: z.coerce.date(),
    authors: z.array(z.string()).default(['Dersu Celiksoz']),
    summary: z.string(),
    venue: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    graphic: z.enum(['control-loop', 'grid-plot', 'signal', 'nodes']).default('grid-plot'),
    featured: z.boolean().default(false),
    /** Explicit pin for the Home page's "Latest Publication" card — independent of `featured`. */
    homeFeatured: z.boolean().default(false),
    /** Optional shortened title/summary for the Home card only; full `title`/`summary` stay unchanged elsewhere. */
    homeTitle: z.string().optional(),
    homeSummary: z.string().optional(),
    status: z.enum(['published', 'draft', 'placeholder']).default('published'),
    tags: z.array(z.string()).default([]),
  }),
});

/** Events — single YAML array; file() requires a unique `id` on each entry. */
const events = defineCollection({
  loader: file('src/data/events.yaml'),
  schema: z.object({
    title: z.string(),
    type: z.enum(['webinar', 'course', 'talk', 'workshop', 'engineering-talk']),
    date: z.coerce.date(),
    location: z.string().default('Online'),
    status: z.enum(['upcoming', 'past']),
    registrationUrl: z.string().url().optional(),
    summary: z.string(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { publications, events };
