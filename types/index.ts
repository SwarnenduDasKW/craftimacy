export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface PortableTextBlock {
  _type: "block";
  _key: string;
  children: { _type: string; _key: string; text: string; marks: string[] }[];
  style?: string;
  markDefs?: { _key: string; _type: string; href?: string }[];
}

export type PriceDisplayMode = "EXACT_PRICE" | "CONTACT_FOR_PRICE" | "HIDDEN";

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  description?: PortableTextBlock[];
  price?: number;
  priceDisplayMode?: PriceDisplayMode;
  category?: Category;
  images: SanityImageAsset[];
  video?: { url?: string; poster?: SanityImageAsset };
  featured?: boolean;
  available?: boolean;
  sortOrder?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: SanityImageAsset;
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: SanityImageAsset;
  sortOrder?: number;
  active?: boolean;
}

export interface SiteSettings {
  businessName: string;
  logo?: SanityImageAsset;
  tagline?: string;
  phone?: string;
  email?: string;
  whatsappNumber?: string;
  address?: string;
  googleMapsUrl?: string;
  googleReviewsUrl?: string;
  googleRating?: number;
  googleReviewCount?: number;
  instagramUrl?: string;
  facebookUrl?: string;
  openingHours?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSocialImage?: SanityImageAsset;
}

export interface Homepage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImageAsset;
  heroVideo?: { url?: string; poster?: SanityImageAsset };
  featuredProducts?: Product[];
  aboutHeading?: string;
  aboutText?: string;
  aboutImage?: SanityImageAsset;
  reviewSectionTitle?: string;
  socialSectionTitle?: string;
}