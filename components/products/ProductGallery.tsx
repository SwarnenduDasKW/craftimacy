"use client";

import Image from "next/image";
import { useState } from "react";
import type { SanityImageAsset } from "@/types";
import { imageUrl } from "@/lib/sanity/image";

export function ProductGallery({ images }: { images: SanityImageAsset[] }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const current = images[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
        <Image
          key={active}
          src={imageUrl(current, 1200, 1500)!}
          alt={current.alt ?? ""}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition ${
                  i === active ? "border-clay" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={imageUrl(img, 200, 250)!}
                  alt={img.alt ?? ""}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}