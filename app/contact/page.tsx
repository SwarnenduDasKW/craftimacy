import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/queries";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/utils/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Craftimacy for product questions, custom requests, and more.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const wa = buildWhatsAppUrl(settings?.whatsappNumber, generalEnquiryMessage());
  const mapUrl = settings?.googleMapsUrl
    ? mapEmbed(settings.googleMapsUrl, settings.address)
    : null;

  return (
    <div className="container-page py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">Let’s talk jewellery</h1>
        <p className="mt-4 text-sm text-muted">
          Have a question about a piece, a custom request, or just want to say hello? We’d love to hear from you.
        </p>
      </header>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-8">
          {wa && (
            <div>
              <h2 className="eyebrow">WhatsApp</h2>
              <div className="mt-3">
                <WhatsAppButton href={wa} label="Chat with us" />
              </div>
            </div>
          )}

          {settings?.phone && (
            <div>
              <h2 className="eyebrow">Phone</h2>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="mt-3 block font-display text-2xl hover:text-clay">
                {settings.phone}
              </a>
            </div>
          )}

          {settings?.email && (
            <div>
              <h2 className="eyebrow">Email</h2>
              <a href={`mailto:${settings.email}`} className="mt-3 block font-display text-2xl hover:text-clay">
                {settings.email}
              </a>
            </div>
          )}

          {settings?.address && (
            <div>
              <h2 className="eyebrow">Visit</h2>
              <p className="mt-3 whitespace-pre-line text-base text-charcoal/85">{settings.address}</p>
              {settings.googleMapsUrl && (
                <a href={settings.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs uppercase tracking-[0.22em] text-charcoal hover:text-clay">
                  Open in Google Maps →
                </a>
              )}
            </div>
          )}

          {settings?.openingHours && (
            <div>
              <h2 className="eyebrow">Hours</h2>
              <p className="mt-3 text-base text-charcoal/85">{settings.openingHours}</p>
            </div>
          )}

          <div>
            <h2 className="eyebrow">Follow</h2>
            <div className="mt-4">
              <SocialLinks settings={settings} />
            </div>
          </div>
        </div>

        {mapUrl && (
          <div className="min-h-[400px] overflow-hidden rounded-sm border border-ink/10">
            <iframe
              title="Craftimacy location"
              src={mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[400px] w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function mapEmbed(url: string, address?: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "www.google.com" && parsed.pathname.startsWith("/maps/embed")) {
      return url;
    }

    const place = parsed.pathname.match(/\/place\/([^/@]+)/)?.[1];
    const location =
      parsed.searchParams.get("q") ??
      parsed.searchParams.get("query") ??
      (place ? decodeURIComponent(place) : null) ??
      address?.trim();

    if (location) {
      return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
    }
  } catch {
    const fallback = address?.trim();
    if (fallback) {
      return `https://www.google.com/maps?q=${encodeURIComponent(fallback)}&output=embed`;
    }
  }

  return null;
}
