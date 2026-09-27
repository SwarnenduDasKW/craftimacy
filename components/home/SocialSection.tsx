import type { SiteSettings } from "@/types";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function SocialSection({
  settings,
  title,
}: {
  settings: SiteSettings | null;
  title?: string;
}) {
  if (!settings) return null;
  return (
    <section className="border-t border-ink/5 bg-sand/40">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <p className="eyebrow">Follow Along</p>
        <h2 className="font-display text-3xl md:text-4xl">
          {title ?? "Follow Craftimacy"}
        </h2>
        <p className="max-w-lg text-sm text-muted">
          New arrivals, artisan stories and behind-the-scenes — shared on social.
        </p>
        <div className="mt-2">
          <SocialLinks settings={settings} />
        </div>
      </div>
    </section>
  );
}