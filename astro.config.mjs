// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static output (default) — no adapter, so dist/ deploys as-is to Vercel/Netlify/Cloudflare Pages.
export default defineConfig({
  // TODO: replace with the real production domain before the first deploy.
  // Used for canonical URLs, Open Graph, and sitemap.
  site: 'https://dersuceliksoz.com',
  integrations: [mdx()],
});
