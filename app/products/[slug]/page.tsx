import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getProductBySlug, getRelatedProducts, getSiteSettings } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/utils/whatsapp";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.title ?? "Product",
    description: product?.shortDescription ?? "Craftimacy product",
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const settings = await getSiteSettings();
  const related = await getRelatedProducts(product._id, product.category?.slug?.current, 4);
  const wa = buildWhatsAppUrl(settings?.whatsappNumber, productEnquiryMessage(product.title));

  const mainImage = product.images?.[0];
  const heroImage = mainImage ? imageUrl(mainImage, 1400, 1400) : null;
  const gallery = product.images?.slice(1) ?? [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="container-page py-14 md:py-20">
      <div className="mb-8 text-sm uppercase tracking-[0.2em] text-muted">
        <Link href="/products" className="hover:text-clay">Collection</Link>
        {product.category?.name && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/products/category/${product.category.slug.current}`} className="hover:text-clay">
              {product.category.name}
            </Link>
          </>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {heroImage && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10">
              <Image
                src={heroImage}
                alt={mainImage?.alt ?? product.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((image, index) => {
                const src = imageUrl(image, 900, 900);
                if (!src) return null;
                return (
                  <div key={`${image.asset?._ref ?? index}`} className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10">
                    <Image
                      src={src}
                      alt={image.alt ?? `${product.title} detail ${index + 1}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow">{product.category?.name ?? "Jewelry"}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            {product.priceDisplayMode === "EXACT_PRICE" && typeof product.price === "number" ? (
              <p className="font-display text-3xl">{formatPrice(product.price)}</p>
            ) : product.priceDisplayMode === "CONTACT_FOR_PRICE" ? (
              <p className="font-display text-2xl">Contact for price</p>
            ) : (
              <p className="font-display text-2xl">Price on request</p>
            )}
          </div>

          {product.shortDescription && (
            <p className="mt-5 text-base text-charcoal/80">{product.shortDescription}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">
                Enquire on WhatsApp
              </a>
            )}
            <Link href="/products" className="btn-outline">
              Continue shopping
            </Link>
          </div>

          {product.description && (
            <div className="mt-10 border-t border-ink/10 pt-8">
              <h2 className="eyebrow">Details</h2>
              <div className="mt-4 prose prose-sm max-w-none text-charcoal/85">
                <PortableText value={product.description} />
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">You may also like</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">More from this collection</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item._id} href={`/products/${item.slug.current}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/10 bg-sand">
                  {(() => {
                    const src = imageUrl(item.images?.[0], 700, 700);
                    if (!src) return null;
                    return (
                      <Image
                        src={src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1220px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform group-hover:scale-[1.03]"
                      />
                    );
                  })()}
                </div>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
