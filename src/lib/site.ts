/** Public site origin, used for canonical URLs, sitemap and structured data. Set in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://trioga.com").replace(/\/$/, "");
