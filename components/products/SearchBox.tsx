"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <form onSubmit={onSubmit} role="search" className="w-full max-w-md">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search the collection…"
          className="w-full border-b border-ink/25 bg-transparent py-3 pr-10 text-sm placeholder:text-muted focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-charcoal hover:text-clay"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
      </div>
    </form>
  );
}