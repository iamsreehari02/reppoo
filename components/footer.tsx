import Image from "next/image";
import Link from "next/link";
import type { Footer as FooterType, FooterSocialLink } from "@/types/content";

const SOCIAL_ICON_SRC: Record<FooterSocialLink["platform"], string> = {
  facebook: "/fb.svg",
  twitter: "/twitter.svg",
  instagram: "/insta.svg",
  linkedin: "/linkedin.svg",
};

export function Footer({ footer }: { footer: FooterType }) {
  const { description, email, company, app, legal, copyright, social } = footer;

  return (
    <footer
      className="bg-white border-t border-neutral-200"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top section: left block + gap + right block (justify-between) */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: logo + description + email */}
          <div className="max-w-sm shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              aria-label="Reppoo home"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={125}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p
              className="mt-4 text-sm text-neutral-600 leading-relaxed"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              {description}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-block text-sm font-medium text-neutral-900 hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              {email}
            </a>
          </div>

          {/* Right: Company, App, Legal columns grouped */}
          <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-12 sm:justify-end">
            <nav aria-label="Company links">
              <h3
                className="text-sm font-semibold text-neutral-900 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                {company.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {company.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="App links">
              <h3
                className="text-sm font-semibold text-neutral-900 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                {app.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {app.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Legal links">
              <h3
                className="text-sm font-semibold text-neutral-900 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                {legal.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {legal.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright + social */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-sm text-neutral-600 order-2 sm:order-1"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              {copyright}
            </p>
            <div
              className="flex items-center gap-2 order-1 sm:order-2"
              aria-label="Social links"
            >
              {social.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={platform}
                >
                  <img
                    src={SOCIAL_ICON_SRC[platform]}
                    alt={platform}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
