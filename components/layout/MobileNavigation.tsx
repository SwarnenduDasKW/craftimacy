"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function MobileNavigation({
  nav,
  whatsappHref,
}: {
  nav: { href: string; label: string }[];
  whatsappHref: string | null;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="sr-only">Menu</span>
        <div className="relative h-4 w-6">
          <span
            className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[7px] h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 top-[14px] h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 top-16 z-50 border-t border-ink/5 bg-cream px-6 py-8 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-2xl text-ink"
              >
                {item.label}
              </Link>
            ))}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-[#25D366]"
              >
                WhatsApp
              </a>
            )}
          </nav>
        </div>
      )}
    </>
  );
}