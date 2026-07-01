import LandingFaqSection from "@/components/landing/LandingFaqSection";
import LandingFinalSection from "@/components/landing/LandingFinalSection";
import LandingGetStartedSection from "@/components/landing/LandingGetStartedSection";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingHowItWorksSection from "@/components/landing/LandingHowItWorksSection";
import LandingProblemSection from "@/components/landing/LandingProblemSection";
import LandingProgramPreviewSection from "@/components/landing/LandingProgramPreviewSection";
import LandingProgramsSection from "@/components/landing/LandingProgramsSection";
import LandingTestimonialsSection from "@/components/landing/LandingTestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Porn Recovery, Kegel Training & Child Protection Guidance | Fitraat",
  description:
    "Build healthy habits with guided porn recovery, kegel exercise training, and child protection guidance for families. Start your free assessment on Fitraat.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fitraat",
  url: "https://fitraat.com",
  description:
    "A learning platform for porn recovery, kegel exercise guidance, and parents child digital safety support.",
};

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <LandingHeader />
      <main id="main-content" className="pb-20 md:pb-0">
        <LandingHero />
        <LandingProblemSection />
        <LandingProgramsSection />
        <LandingHowItWorksSection />
        <LandingTestimonialsSection />
        <LandingProgramPreviewSection />
        <LandingGetStartedSection />
        <LandingFaqSection />
        <LandingFinalSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
