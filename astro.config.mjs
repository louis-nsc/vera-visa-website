import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://vera-visa.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'monthly',
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (url.pathname.includes('-chiang-mai/') || url.pathname === '/visa-agent-chiang-mai/') {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (url.pathname.startsWith('/category/')) {
          item.changefreq = 'monthly';
          item.priority = 0.5;
        } else {
          // Blog/guide articles
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
});
