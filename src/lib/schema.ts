/**
 * Global JSON-LD identity graph: one Person + one WebSite entity, rendered
 * once per real page by Layout.astro. Every field is sourced directly from
 * src/data/profile.ts — nothing here should drift independently of it.
 */
import type { CollectionEntry } from 'astro:content';
import { profile } from '../data/profile';

/**
 * Restrained subject-matter list — quotes, verbatim, the four "Technical
 * Focus" section titles on Home (src/pages/index.astro `focus` array), which
 * are the same four core discipline pillars repeated as "Capabilities" on
 * Engineering. Deliberately not sourced from `profile.domains`, which lists
 * served industries (Automotive, Aerospace, ...), not subject matter.
 */
const KNOWS_ABOUT = ['System Design', 'Modeling & Simulation', 'Control Systems', 'Verification & Validation'];

/**
 * Builds the shared { Person, WebSite } JSON-LD graph. `siteUrl` should be
 * Astro's own `Astro.site` so the graph always matches astro.config.mjs's
 * `site` value instead of a second hardcoded domain constant.
 */
export function buildSiteGraph(siteUrl: URL) {
  const base = siteUrl.href; // e.g. "https://dersuceliksoz.com/"
  const personId = `${base}#person`;
  const websiteId = `${base}#website`;

  const linkedin = profile.contacts.find((c) => c.channel === 'linkedin');
  const sameAs = linkedin?.href ? [linkedin.href] : [];

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: base,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ankara',
      addressCountry: 'Türkiye',
    },
    sameAs,
    knowsAbout: KNOWS_ABOUT,
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: base,
    name: profile.name,
    description: profile.brandLine,
    inLanguage: 'en',
    publisher: { '@id': personId },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [person, website],
  };
}

/**
 * Page-specific { @context, @graph: Event[] } block for Academy's real,
 * non-placeholder events. Deliberately separate from `buildSiteGraph()` and
 * rendered only on the Academy page — `organizer` references the global
 * graph's Person by `@id` only, so Person is never duplicated across the
 * two JSON-LD blocks that end up on that page.
 */
export function buildEventsGraph(siteUrl: URL, events: CollectionEntry<'events'>[]) {
  const base = siteUrl.href;
  const personId = `${base}#person`;
  const academyUrl = `${base}academy/`;

  const eventEntities = events
    .filter((event) => !event.data.placeholder)
    .map((event) => {
      const { data } = event;
      const isOnline = data.location === 'Online';

      return {
        '@type': 'Event',
        '@id': `${academyUrl}#event-${event.id}`,
        name: data.title,
        description: data.summary,
        startDate: data.date.toISOString().slice(0, 10),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: isOnline
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
        location: isOnline
          ? { '@type': 'VirtualLocation', url: academyUrl }
          : { '@type': 'Place', name: data.location },
        url: academyUrl,
        organizer: { '@id': personId },
      };
    });

  if (eventEntities.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': eventEntities,
  };
}
