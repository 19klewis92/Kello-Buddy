import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CustomerFlowSection from "@/components/CustomerFlowSection";
import SolutionSection from "@/components/SolutionSection";
import RevenueGraphSection from "@/components/RevenueGraphSection";

import FAQSection from "@/components/FAQSection";
import SocialProofSection from "@/components/SocialProofSection";

import CTAFormSection from "@/components/CTAFormSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Header from "@/components/Header";
import CherryBlossoms from "@/components/CherryBlossoms";
import FloatingPromo from "@/components/FloatingPromo";
import KBeautyTrendSection from "@/components/KBeautyTrendSection";
import EarlyBirdSection from "@/components/EarlyBirdSection";
import AppPreviewSection from "@/components/AppPreviewSection";

const Index = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <CherryBlossoms />
      <Header />
      <FloatingPromo />
      <HeroSection />
      <KBeautyTrendSection />
      <div>
        <RevenueGraphSection />
      </div>

      <div className="py-12 md:py-20 text-center flex items-center justify-center bg-gradient-to-b from-transparent to-spring-pink relative z-20">
        <h2 className="text-[27px] sm:text-4xl md:text-5xl lg:text-7xl font-black text-rose-500 tracking-tight drop-shadow-md">
          하.지.만!
        </h2>
      </div>

      <div id="service">
        <ProblemSection />
        <CustomerFlowSection />

      </div>

      <AppPreviewSection />
      <EarlyBirdSection />

      <SocialProofSection />
      <div id="faq">
        <FAQSection />
      </div>

      <div id="apply">
        <CTAFormSection />
      </div>
      <Footer />
      <FloatingContact />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
