/**
 * Editable site content types.
 * Admin panel edits these; when backend is ready, swap API in lib/content and API routes.
 */

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface HeroSection {
  heading: string;
  subheading: string;
  /** Optional: part of heading to show with accent underline (e.g. "AI Health Coach") */
  highlightHeading?: string;
  paragraph: string;
  ctaText: string;
  ctaLink: string;
  /** Optional: second CTA label (e.g. "Download") */
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  /** Optional: social proof text (e.g. "59,182 Happy Users") */
  userCountText?: string;
  /** Optional: from backend – left, center, right hero images */
  imageLeftUrl?: string;
  imageCenterUrl?: string;
  imageRightUrl?: string;
}

export interface SiteContent {
  hero: HeroSection;
  testimonials: {
    sectionTitle: string;
    sectionParagraph: string;
    /** Optional tagline shown under author in each testimonial (e.g. "Empowered by AI Wellness Journeys") */
    tagline?: string;
    list: Testimonial[];
  };
  /** FAQ / accordion section. Optional for backwards compatibility with existing content. */
  faq?: {
    sectionTitle: string;
    sectionParagraph: string;
    items: { question: string; answer: string }[];
  };
  footer: Footer;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin";
  url: string;
}

export interface Footer {
  /** Short description under the logo */
  description: string;
  /** Contact email */
  email: string;
  /** Company column */
  company: { heading: string; links: FooterLink[] };
  /** App column (e.g. Download iOS/Android) */
  app: { heading: string; links: FooterLink[] };
  /** Legal column (Privacy, Terms) */
  legal: { heading: string; links: FooterLink[] };
  /** Copyright line */
  copyright: string;
  /** Social links (icon + url) */
  social: FooterSocialLink[];
}
