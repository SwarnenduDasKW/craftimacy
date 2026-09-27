import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutSection } from "@/components/home/AboutSection";
import { ReviewSection } from "@/components/home/ReviewSection";
import { SocialSection } from "@/components/home/SocialSection";
import {
  getHomepage,
  getSiteSettings,
  getFeaturedProducts,
} from "@/lib/sanity/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [homepage, settings, featured] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
    getFeaturedProducts(8),
  ]);

  const products = homepage?.featuredProducts?.length
    ? homepage.featuredProducts
    : featured;

  return (
    <>
      <HeroSection homepage={homepage} settings={settings} />
      <FeaturedProducts products={products} />
      <AboutSection homepage={homepage} />
      <ReviewSection settings={settings} />
      <SocialSection settings={settings} title={homepage?.socialSectionTitle} />
    </>
  );
}