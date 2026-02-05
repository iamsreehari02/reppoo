import { getContent } from "@/lib/content";
import { HeroSection } from "@/components/hero-section";
import { HealthPotentialSection } from "@/components/health-potential-section";
import { SponsorsCarousel } from "@/components/sponsors-carousel";
import { SectionReveal } from "@/components/section-reveal";
import { CtaSection } from "@/components/cta-section";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";
import { getHeroServer } from "@/lib/api/server-hero";
import {
  getTestimonialsServer,
  getTestimonialPageServer,
} from "@/lib/api/server-testimonials";
import { getFaqSectionServer } from "@/lib/api/server-faq";
import { getHealthPotentialServer } from "@/lib/api/server-health-potential";
import { getSponsorsServer } from "@/lib/api/server-sponsors";

export default async function HomePage() {
  const [
    content,
    hero,
    testimonials,
    testimonialPage,
    faqSection,
    healthPotential,
    sponsors,
  ] = await Promise.all([
    getContent(),
    getHeroServer(),
    getTestimonialsServer(),
    getTestimonialPageServer(),
    getFaqSectionServer(),
    getHealthPotentialServer(),
    getSponsorsServer(),
  ]);

  const { footer } = content;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <main className="flex-1 bg-[#F9F9F9]">
        <HeroSection hero={hero} />

        <SectionReveal>
          <SponsorsCarousel sponsors={sponsors} />
        </SectionReveal>

        <SectionReveal>
          <HealthPotentialSection healthPotential={healthPotential} />
        </SectionReveal>

        <SectionReveal>
          <TestimonialsSection
            testimonials={testimonials}
            testimonialPage={testimonialPage}
          />
        </SectionReveal>

        {faqSection?.items?.length ? (
          <SectionReveal>
            <FaqSection faqSection={faqSection} />
          </SectionReveal>
        ) : null}

        <SectionReveal>
          <CtaSection />
        </SectionReveal>
      </main>

      <SectionReveal>
        <Footer footer={footer} />
      </SectionReveal>
    </div>
  );
}
