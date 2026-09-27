import { AppPromoSection } from "@/features/home/components/promo-section";
import { DoctorsSection } from "@/features/home/components/doctors-section";
import { FAQSection } from "@/features/home/components/faq-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HowItWorksSection } from "@/features/home/components/work-section";
import { LocationSection } from "@/features/home/components/location-section";
import { ReviewsSection } from "@/features/home/components/reviews-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <LocationSection />
      <DoctorsSection />
      <ReviewsSection />
      <FAQSection />
      <AppPromoSection />
    </>
  );
}