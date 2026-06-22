import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CustomerFlowSection from "@/components/CustomerFlowSection";
import SolutionSection from "@/components/SolutionSection";
import RevenueGraphSection from "@/components/RevenueGraphSection";

import FAQSection from "@/components/FAQSection";
import SocialProofSection from "@/components/SocialProofSection";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CherryBlossoms from "@/components/CherryBlossoms";
import KBeautyTrendSection from "@/components/KBeautyTrendSection";
import EarlyBirdSection from "@/components/EarlyBirdSection";
import AppPreviewSection from "@/components/AppPreviewSection";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <CherryBlossoms />
      <Header />
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

      <Footer />

      {/* 하단 중앙 고정 플로팅 버튼 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm sm:max-w-md px-4">
        <a
          href="https://partner.wekello.com/"
          className="flex items-center justify-center gap-2 w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-3.5 sm:py-4 px-6 rounded-full shadow-[0_8px_30px_rgba(251,113,133,0.3)] transition-all hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg border border-rose-300/20"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          외국인 고객 받고 매출 올리기
        </a>
      </div>
    </div>
  );
};

export default Index;
