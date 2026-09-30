import { DoctorsSection } from "../components/doctors-section";
import { FAQSection } from "../components/faq-section";
import { HeroSection } from "../components/hero-section";
import { HowItWorksSection } from "../components/work-section";
import { LocationSection } from "../components/location-section";
import { AppPromoSection } from "../components/promo-section";
import { ReviewsSection } from "../components/reviews-section";

export function HomePage() {
  return (
    <div className="w-full bg-white">
      <HeroSection />

      <DoctorsSection />

      <HowItWorksSection />

      <LocationSection />

      <ReviewsSection />

      <FAQSection />

      <AppPromoSection />
    </div>
  );
}