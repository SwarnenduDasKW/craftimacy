import { client } from "./client";
import type { Product, Category, SiteSettings, Homepage } from "@/types";

const productFields = `
  _id,
  title,
  slug,
  shortDescription,
  description,
  price,
  priceDisplayMode,
  category->{ _id, name, slug },
  images[]{ _type, asset, alt, caption, hotspot, crop },
  video,
  featured,
  available,
  sortOrder,
  seo
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      businessName, logo, tagline, phone, email, whatsappNumber,
      address, googleMapsUrl, googleReviewsUrl, googleRating, googleReviewCount,
      instagramUrl, facebookUrl, openingHours,
      defaultSeoTitle, defaultSeoDescription, defaultSocialImage
    }`,
    {},
    { next: { revalidate: 3600, tags: ["siteSettings"] } }
  );
}

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch(
    `*[_type == "homepage"][0]{
      heroTitle, heroSubtitle, heroImage, heroVideo,
      "featuredProducts": featuredProducts[]->{ ${productFields} },
      aboutHeading, aboutText, aboutImage,
      reviewSectionTitle, socialSectionTitle
    }`,
    {},
    { next: { revalidate: 300, tags: ["homepage"] } }
  );
}

export async function getProducts(opts?: { category?: string; search?: string }): Promise<Product[]> {
  const filters = [`_type == "product"`, `available != false`];
  const params: Record<string, unknown> = {};

  if (opts?.category) {
    filters.push(`category->slug.current == $category`);
    params.category = opts.category;
  }
  if (opts?.search) {
    filters.push(`title match $search + "*"`);
    params.search = opts.search;
  }

  return client.fetch(
    `*[${filters.join(" && ")}] | order(sortOrder asc, _createdAt desc){ ${productFields} }`,
    params,
    { next: { revalidate: 120, tags: ["products"] } }
  );
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && featured == true && available != false]
       | order(sortOrder asc, _createdAt desc)[0...$limit]{ ${productFields} }`,
    { limit },
    { next: { revalidate: 120, tags: ["products"] } }
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{ ${productFields} }`,
    { slug },
    { next: { revalidate: 60, tags: [`product:${slug}`] } }
  );
}

export async function getRelatedProducts(
  productId: string,
  categorySlug: string | undefined,
  limit = 4
): Promise<Product[]> {
  if (!categorySlug) return [];
  return client.fetch(
    `*[_type == "product" && _id != $productId && category->slug.current == $categorySlug && available != false]
       | order(_createdAt desc)[0...$limit]{ ${productFields} }`,
    { productId, categorySlug, limit },
    { next: { revalidate: 300, tags: ["products"] } }
  );
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category" && active != false] | order(sortOrder asc, name asc){
      _id, name, slug, description, image, sortOrder, active
    }`,
    {},
    { next: { revalidate: 600, tags: ["categories"] } }
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      _id, name, slug, description, image, sortOrder, active
    }`,
    { slug },
    { next: { revalidate: 600, tags: ["categories"] } }
  );
}

export async function getAllProductSlugs(): Promise<{ slug: string; updated: string }[]> {
  return client.fetch(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      "updated": _updatedAt
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "category" && defined(slug.current) && active != false]{
      "slug": slug.current
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}