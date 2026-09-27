import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.defaultSeoTitle ?? "Craftimacy — Handcrafted Jewelry from Indian Artisans";
  const description =
    settings?.defaultSeoDescription ??
    "Discover handcrafted oxidised silver jewelry inspired by Indian artisans and craftsmanship. Each piece is made to bring joy.";

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s · Craftimacy" },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: settings?.businessName ?? "Craftimacy",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header settings={settings} />
        <main id="main" className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}