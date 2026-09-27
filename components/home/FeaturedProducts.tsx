import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Featured pieces</h2>
        </div>
        <Link
          href="/products"
          className="text-xs uppercase tracking-[0.22em] text-charcoal hover:text-clay"
        >
          View all →
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}