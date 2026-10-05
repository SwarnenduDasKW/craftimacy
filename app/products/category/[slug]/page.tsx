import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { SearchBox } from "@/components/products/SearchBox";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: category ? `${category.name} | Craftimacy` : "Category",
    description: category?.description ?? "Browse the Craftimacy collection.",
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, categories, products] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({ category: slug }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container-page py-14 md:py-20">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Collection</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{category.name}</h1>
        </div>
        <div className="w-full max-w-md md:ml-auto">
          <SearchBox />
        </div>
      </header>

      <div className="mb-10">
        <CategoryFilter categories={categories} activeSlug={category.slug.current} />
      </div>

      {category.description && (
        <p className="mb-10 max-w-2xl text-base text-charcoal/80">{category.description}</p>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
