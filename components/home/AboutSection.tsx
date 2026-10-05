import Image from "next/image";
import Link from "next/link";
import type { Homepage } from "@/types";
import { imageUrl } from "@/lib/sanity/image";

export function AboutSection({ homepage }: { homepage: Homepage | null }) {
  const src = imageUrl(homepage?.aboutImage, 1200, 1400);

  return (
    <section className="border-t border-ink/5 bg-sand/40">
      <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:gap-16 md:py-28">
        <div className={src ? "" : "md:col-span-2"}>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">
            {homepage?.aboutHeading ?? "Craftsmanship that brings joy"}
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-charcoal/85">
            {homepage?.aboutText ??
              "Born from a young artisan’s dream in Kolkata, Craftimacy is a celebration of handmade artistry and Indian craftsmanship. Every piece is thoughtfully created by hand, bringing together unique designs, passion, and a personal touch to create jewelry made to be cherished and worn with joy."}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-charcoal underline-offset-8 hover:text-clay hover:underline"
          >
            Read our story →
          </Link>
        </div>

        {src && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={src}
              alt={homepage?.aboutImage?.alt ?? "Craftimacy craftsmanship"}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}