import HeroSection from "../../components/Home/home-sections/HeroSection";
import ImpactSection from "../../components/Home/home-sections/ImpactSection";
import OurPurposeSection from "../../components/Home/home-sections/OurPurposeSection";
import ProblemsSection from "../../components/Home/home-sections/ProblemsSection";
import SolutionsSection from "../../components/Home/home-sections/SolutionsSection";
import CTASection from "../../components/Home/home-sections/CTASection";
import WhoAreWeSection from "../../components/Home/home-sections/WhoAreWeSection";
import Footer from "../../components/Home/home-sections/Footer";
import Header from "../../components/Home/home-sections/Header";
import TestimonialsSection from "../../components/Home/home-sections/TestimonialsSection";
import NewsletterSection from "../../components/Home/home-sections/NewsletterSection";
import HomeLayout from "./Layouts/HomeLayout";

export default function HomePage() {
  return (
    <HomeLayout>
      <Header />
      <HeroSection />
      <ProblemsSection />
      <SolutionsSection />
      <WhoAreWeSection />
      <OurPurposeSection />
      <ImpactSection />
      <CTASection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </HomeLayout>
  );
}
