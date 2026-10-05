import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { SearchBox } from "@/components/products/SearchBox";
import { getCategories, getProducts } from "@/lib/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the Craftimacy collection of handcrafted jewelry.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ search: q }),
  ]);

  return (
    <div className="container-page py-14 md:py-20">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Collection</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Craftimacy pieces</h1>
        </div>
        <div className="w-full max-w-md md:ml-auto">
          <Suspense fallback={<div className="h-11 w-full border-b border-ink/10" aria-hidden="true" />}>
            <SearchBox />
          </Suspense>
        </div>
      </header>

      <div className="mb-10">
        <CategoryFilter categories={categories} />
      </div>

      <ProductGrid products={products} />
    </div>
  );
}