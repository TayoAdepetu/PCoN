import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/Home/HeroSection";
import HomeLayout from "../Layouts/TheMainLayout";
import OurPurposeSection from "../../components/Home/OurPurposeSection";
import ImpactSection from "../../components/Home/ImpactSection";

export default function HomePage() {
  return (
    <HomeLayout>
      <Header />
      <HeroSection />
      <OurPurposeSection/>
      <ImpactSection/>
      <Footer />
    </HomeLayout>
  );
}
