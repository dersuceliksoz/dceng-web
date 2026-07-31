/**
 * Prefixes a root-relative path (route or public asset) with the configured
 * `base` (import.meta.env.BASE_URL), so links/assets resolve correctly both in
 * dev (base "/") and under GitHub Pages' repo-scoped base ("/dceng-web/").
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  if (path === '/') return base;
  return base.replace(/\/$/, '') + path;
};
