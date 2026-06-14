import ContactInformationSection from "../components/layout/ContactInformationSection";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import HeroSection from "../components/layout/HeroSection";
import OurServicesSection from "../components/layout/OurServicesSection";
import PortifolioSection from "../components/layout/PortfolioSection";

export default function LandingPage() {
  return (
  <div className="bg-off-white relative">
      <Header />
      <HeroSection />
      <OurServicesSection />
      <PortifolioSection />
      <ContactInformationSection />
      <Footer />
    </div>
  )
}