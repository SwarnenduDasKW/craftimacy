import type { Metadata } from "next";
import { getHomepage, getSiteSettings } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import Image from "next/image";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Craftimacy and the handcrafted jewelry story behind every piece.",
};

export default async function AboutPage() {
  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  const image = imageUrl(homepage?.aboutImage, 1200, 1200);

  return (
    <div className="container-page py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">
            {homepage?.aboutHeading ?? "Crafted with intention"}
          </h1>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/85">
            <p>
              {homepage?.aboutText ??
                "Craftimacy was born from the dream, ambition, and determination of a young woman from Kolkata, West Bengal. What began as a passion for beautiful handcrafted jewelry grew into a journey of creativity, courage, and perseverance. With her own hands and an unwavering belief in her craft, she designs and creates every piece herself — one piece at a time, with patience, care, and attention to detail. Every creation carries a little part of her journey: the simplicity of handmade artistry, the richness of Indian craftsmanship, and the joy of creating something truly unique. Craftimacy is more than a collection of jewelry; it is the story of one young artisan who turned her passion into a craft, and her dream into something she can share with the world."}
            </p>
            <p>
              From statement earrings to everyday favorites, every piece is selected to feel expressive, meaningful, and beautifully wearable.
            </p>
          </div>

          {settings?.businessName && (
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="eyebrow">Craftimacy</p>
              <p className="mt-2 text-lg font-medium text-ink">{settings.businessName}</p>
            </div>
          )}
        </div>

        {image && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={image}
              alt={homepage?.aboutImage?.alt ?? "Craftimacy craftsmanship"}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
