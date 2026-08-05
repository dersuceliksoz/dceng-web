/**
 * Prefixes a root-relative path (route or public asset) with the configured
 * `base` (import.meta.env.BASE_URL) from astro.config.mjs. Currently a no-op
 * prefix (base "/"), since the site is served from a custom domain's root —
 * kept so links/assets would still resolve correctly if a repo-scoped base
 * (e.g. GitHub Pages project-site "/dceng-web/") is ever reintroduced.
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  if (path === '/') return base;
  return base.replace(/\/$/, '') + path;
};
