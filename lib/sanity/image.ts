import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";
import type { SanityImageAsset } from "@/types";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageAsset) {
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageAsset | undefined,
  width: number,
  height?: number
): string | null {
  if (!source?.asset?._ref) return null;
  let b = urlFor(source).width(width).auto("format").fit("max");
  if (height) b = b.height(height);
  return b.url();
}