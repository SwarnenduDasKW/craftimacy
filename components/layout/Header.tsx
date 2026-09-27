import Link from "next/link";
import type { SiteSettings } from "@/types";
import { MobileNavigation } from "./MobileNavigation";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generalEnquiryMessage, buildWhatsAppUrl } from "@/lib/utils/whatsapp";

const NAV = [
  { href: "/products", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings | null }) {
  const wa = buildWhatsAppUrl(settings?.whatsappNumber, generalEnquiryMessage());

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-[0.28em] md:text-2xl">
            CRAFTIMACY
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.22em] text-charcoal hover:text-clay"
            >
              {item.label}
            </Link>
          ))}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.22em] text-charcoal hover:text-clay"
            >
              WhatsApp
            </a>
          )}
        </nav>

        <div className="hidden md:block">
          {wa && <WhatsAppButton href={wa} label="Chat" size="sm" />}
        </div>

        <MobileNavigation nav={NAV} whatsappHref={wa} />
      </div>
    </header>
  );
}