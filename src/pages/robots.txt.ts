import type { APIRoute } from 'astro';

export const prerender = true;

const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://vera-visa.com/sitemap-index.xml
`;

export const GET: APIRoute = () => {
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
