import Link from "next/link";
import type { SiteSettings } from "@/types";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink/10 bg-sand/40">
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.22em]">CRAFTIMACY</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {settings?.tagline ??
              "Handcrafted jewelry inspired by Indian artisans and craftsmanship."}
          </p>
        </div>

        <div>
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/products" className="hover:text-clay">Collection</Link></li>
            <li><Link href="/about" className="hover:text-clay">About</Link></li>
            <li><Link href="/contact" className="hover:text-clay">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Connect</h2>
          <div className="mt-4">
            <SocialLinks settings={settings} />
          </div>
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="mt-6 block text-sm text-muted hover:text-clay"
            >
              {settings.email}
            </a>
          )}
          {settings?.phone && (
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sm text-muted hover:text-clay"
            >
              {settings.phone}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} {settings?.businessName ?? "Craftimacy"}. All rights reserved.</p>
          <p>Site by <a href="https://www.linkedin.com/in/swarnendu-das-41479531/?isSelfProfile=true" className="hover:text-clay">ShawnDKW</a></p>
        </div>
      </div>
    </footer>
  );
}