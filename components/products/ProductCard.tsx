import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { imageUrl } from "@/lib/sanity/image";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  const primary = product.images?.[0];
  const src = imageUrl(primary, 800, 1000);
  const alt = primary?.alt ?? product.title;
  const href = `/products/${product.slug.current}`;

  const showPrice =
    product.priceDisplayMode === "EXACT_PRICE" &&
    typeof product.price === "number";

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              Image coming soon
            </div>
          )}

          {product.featured && (
            <span className="absolute left-3 top-3 bg-cream/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
              New
            </span>
          )}
          {product.available === false && (
            <span className="absolute right-3 top-3 bg-ink/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream">
              Sold
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-display text-lg leading-snug text-ink group-hover:text-clay">
            {product.title}
          </h3>
          {product.category?.name && (
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
              {product.category.name}
            </p>
          )}
          <p className="mt-2 text-sm text-charcoal/80">
            {showPrice
              ? formatPrice(product.price!)
              : product.priceDisplayMode === "CONTACT_FOR_PRICE"
              ? "Contact for price"
              : product.shortDescription ?? "\u00A0"}
          </p>
        </div>
      </Link>
    </article>
  );
}