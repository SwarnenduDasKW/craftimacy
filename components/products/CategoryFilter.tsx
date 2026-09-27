import Link from "next/link";
import type { Category } from "@/types";

export function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  if (!categories.length) return null;

  return (
    <nav aria-label="Categories" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max items-center gap-3">
        <li>
          <Link
            href="/products"
            className={`inline-block whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
              !activeSlug
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-charcoal hover:border-ink"
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((cat) => {
          const active = activeSlug === cat.slug.current;
          return (
            <li key={cat._id}>
              <Link
                href={`/products/category/${cat.slug.current}`}
                className={`inline-block whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 text-charcoal hover:border-ink"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}