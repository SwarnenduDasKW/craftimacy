import Image from "next/image";
import Link from "next/link";
import type { Homepage, SiteSettings } from "@/types";
import { imageUrl } from "@/lib/sanity/image";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/utils/whatsapp";

export function HeroSection({
  homepage,
  settings,
}: {
  homepage: Homepage | null;
  settings: SiteSettings | null;
}) {
  const image = homepage?.heroImage;
  const src = imageUrl(image, 1920, 1080);
  const wa = buildWhatsAppUrl(settings?.whatsappNumber, generalEnquiryMessage());

  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={image?.alt ?? "Handcrafted jewelry from Craftimacy"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-charcoal via-ink to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/60" />
      </div>

      <div className="container-page relative flex min-h-[78vh] flex-col justify-end pb-16 pt-24 md:min-h-[85vh] md:pb-24 md:pt-32">
        <p className="eyebrow text-cream/70">Craftimacy</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          {homepage?.heroTitle ?? "Handcrafted jewelry inspired by Indian artisans"}
        </h1>
        {homepage?.heroSubtitle && (
          <p className="mt-6 max-w-xl text-base text-cream/80 md:text-lg">
            {homepage.heroSubtitle}
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/products" className="btn bg-cream text-ink hover:bg-sand">
            Explore Collection
          </Link>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-cream/40 text-cream hover:bg-cream hover:text-ink"
            >
              WhatsApp Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}