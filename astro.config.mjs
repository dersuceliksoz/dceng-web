// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static output (default) — no adapter, so dist/ deploys as-is to Vercel/Netlify/Cloudflare Pages.
export default defineConfig({
  // Deployed to GitHub Pages as a project site: https://dersuceliksoz.github.io/dceng-web/
  // TODO: replace with the real production domain (and drop `base`) if/when a custom domain is set up.
  site: 'https://dersuceliksoz.github.io',
  base: '/dceng-web',
  integrations: [mdx()],
});
