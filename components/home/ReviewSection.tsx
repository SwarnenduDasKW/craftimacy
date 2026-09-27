import type { SiteSettings } from "@/types";

export function ReviewSection({ settings }: { settings: SiteSettings | null }) {
  if (!settings?.googleReviewsUrl) return null;

  const hasRating = typeof settings.googleRating === "number";

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Loved by Our Customers</p>
        {hasRating ? (
          <>
            <div className="mt-6 flex items-center justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-6 w-6 fill-gold">
                  <path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L10 14.9 4.4 18.1l1.4-6.3L1 7.5l6.4-.6z" />
                </svg>
              ))}
            </div>
            <p className="mt-6 font-display text-5xl md:text-6xl">
              {settings.googleRating.toFixed(1)}
              <span className="ml-2 text-xl text-muted">/ 5</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Based on {settings.googleReviewCount ?? "our"} Google reviews
            </p>
          </>
        ) : (
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            See what our customers say
          </h2>
        )}

        <a
          href={settings.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-8"
        >
          Read our reviews on Google
        </a>
      </div>
    </section>
  );
}