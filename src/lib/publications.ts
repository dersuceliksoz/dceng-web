import type { CollectionEntry } from 'astro:content';

type Publication = CollectionEntry<'publications'>;
type Category = Publication['data']['category'];

/**
 * Category priority for the "All" view. Keyed by the enum *slugs* (the same
 * values used in data-attributes), so markup and sort never drift.
 */
export const CATEGORY_ORDER: Record<Category, number> = {
  'white-paper': 0,
  journal: 1,
  conference: 2,
  patent: 3,
  'engineering-note': 4,
};

/** Display labels live in their own map — never used as object keys. */
export const CATEGORY_LABELS: Record<Category, string> = {
  'white-paper': 'White Papers',
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  patent: 'Patents',
  'engineering-note': 'Engineering Notes',
};

/** Singular form, for badges that describe a single publication (e.g. the Home card). */
export const CATEGORY_LABELS_SINGULAR: Record<Category, string> = {
  'white-paper': 'White Paper',
  journal: 'Journal Article',
  conference: 'Conference Paper',
  patent: 'Patent',
  'engineering-note': 'Engineering Note',
};

/** Filter chips for the Publication Library, in display order. */
export const PUBLICATION_FILTERS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  ...(Object.keys(CATEGORY_ORDER) as Category[]).map((value) => ({
    value,
    label: CATEGORY_LABELS[value],
  })),
];

/**
 * Canonical "All" order: category priority ascending, then newest-first within
 * a category. Runs ONCE at build time; the client filter never re-sorts.
 */
export function sortPublicationsAll(items: Publication[]): Publication[] {
  return [...items].sort((a, b) => {
    const byCat = CATEGORY_ORDER[a.data.category] - CATEGORY_ORDER[b.data.category];
    return byCat !== 0 ? byCat : b.data.date.getTime() - a.data.date.getTime();
  });
}

/** Shared date formatter for list rows / cards. */
export function formatPubDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

/**
 * Home page's "Latest Publication" pick: prefer the explicitly pinned
 * `homeFeatured` entry; otherwise fall back to the newest by date (the
 * pre-existing automatic behaviour), so pages with no pin keep working.
 */
export function selectHomeFeatured(items: Publication[]): Publication | undefined {
  const pinned = items.find((p) => p.data.homeFeatured);
  if (pinned) return pinned;
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
}
