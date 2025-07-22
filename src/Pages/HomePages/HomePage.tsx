import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeroSection from "../../components/Home/HeroSection";
import HomeLayout from "../Layouts/TheMainLayout";

export default function HomePage() {
  return (
    <HomeLayout>
      <Header />
      <HeroSection />
      <Footer />
    </HomeLayout>
  );
}
