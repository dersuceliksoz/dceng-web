// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static output (default) — no adapter, so dist/ deploys as-is to Vercel/Netlify/Cloudflare Pages.
export default defineConfig({
  // Served from the custom domain root (GitHub Pages custom domain), so no `base` is needed —
  // a repo-scoped base like '/dceng-web' only applies to GitHub Pages *project site* URLs
  // (https://<user>.github.io/<repo>/), not to a custom domain serving from '/'.
  site: 'https://dersuceliksoz.com',
  integrations: [mdx()],
});
