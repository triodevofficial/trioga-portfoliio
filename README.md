# trioga-portfoliio

Company website for **Trioga** — a software studio building websites, web apps, mobile apps and custom platforms.

Built with Next.js 16 (App Router, fully static), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

| What | Where |
| --- | --- |
| Homepage text, services, FAQ, stats, contact email | `src/content/home.ts` |
| Portfolio products (cards, `/work`, `/work/[slug]` pages) | `src/content/work.ts` |
| Brand colours & logo geometry | `src/lib/brand.ts` |

To use a real screenshot for a product, put it in `public/work/` and set `image: "/work/<file>"` on that product.

## Brand assets

```bash
npm run brand:names -- orbitron   # rebuild the wordmark from a typeface (see public/brand/name-options)
npm run brand                     # regenerate logo files in public/brand/ and the favicon
```

## Before launch

- Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, sitemap and structured data).
- Replace the placeholder contact email in `src/content/home.ts`.
