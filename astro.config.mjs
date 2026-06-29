import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  site: 'https://vera-visa.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '@ds': path.resolve(__dirname, '../Vera Visa Design System'),
      },
    },
    server: {
      fs: {
        // Allow imports from the sibling Design System directory
        allow: [path.resolve(__dirname, '..'), __dirname],
      },
    },
  },
});
