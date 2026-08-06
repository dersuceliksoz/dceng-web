/**
 * Global JSON-LD identity graph: one Person + one WebSite entity, rendered
 * once per real page by Layout.astro. Every field is sourced directly from
 * src/data/profile.ts — nothing here should drift independently of it.
 */
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
