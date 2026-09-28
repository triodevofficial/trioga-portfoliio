import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IntroScript, Loader } from "@/components/Loader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Trioga designs and engineers high-performance websites, web apps, mobile apps and custom software for ambitious businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Web, Mobile & Software Development Studio`,
    template: `%s · ${BRAND.name}`,
  },
  description,
  applicationName: BRAND.name,
  keywords: [
    "software development company",
    "web development",
    "mobile app development",
    "custom software",
    "Next.js development",
    "UI/UX design",
    "SaaS development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: BRAND.name,
    title: `${BRAND.name} — Digital products, engineered to perform`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Digital products, engineered to perform`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/trioga-mark.svg`,
  description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <IntroScript />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Loader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
