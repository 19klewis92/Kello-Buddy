import { motion } from "framer-motion";
import { Globe, Phone, TicketPercent, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import KelloText from "./KelloText";
import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="bg-white flex flex-col w-full relative">
      {/* Top Image Area */}
      <div className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[55vh]">
        <img 
          src="/Kello_image.png" 
          alt="KELLO 브랜드 이미지" 
          className="w-full h-full object-cover"
        />
        {/* Soft gradient to blend with the white background below */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>

      {/* Content Area Below the Video - Subtle background contrast */}
      <div className="w-full bg-gradient-to-b from-white to-rose-50/30">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 pb-16 pt-8 sm:pb-24 sm:pt-12 md:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >


            <ScrollReveal delay={0.4}>
              <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.3] mb-10 sm:mb-16 break-keep text-center flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4 px-4">
                  <span className="text-black">
                    <span className="text-primary">K</span> - beauty의 첫 H<span className="text-primary">e</span><span className="text-primary">ll</span><span className="text-primary">o</span>
                  </span>
                  <img 
                    src="/content.png" 
                    alt="Kello Hand" 
                    className="h-8 w-8 sm:h-24 sm:w-24 md:h-28 md:w-28 drop-shadow-lg animate-bounce-subtle shrink-0"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <span className="block text-black px-4 mt-2 sm:mt-6 sm:text-auto break-keep">
                  이제, 외국인 손님이<br className="sm:hidden" /> <span className="text-primary">매출</span>이 됩니다
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="text-sm sm:text-base md:text-xl text-black/70 leading-snug md:leading-relaxed mb-10 font-bold max-w-4xl mx-auto break-keep px-4 flex flex-col items-center justify-center gap-1.5 md:gap-2">
                <p>다국어 AI 번역, 100% 선결제, 노쇼 제로,</p>
                <p>영어를 못해도, 외국인 고객을 받을 수 있습니다.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <button
                onClick={() => window.dispatchEvent(new Event('open-promo-popup'))}
                className="inline-flex items-center gap-2 bg-gradient-accent text-accent-foreground font-bold px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5 rounded-full text-base md:text-xl shadow-kello-glow hover:scale-105 transition-transform relative z-10 w-full sm:w-auto justify-center"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6" />
                외국인 고객 받고 매출 올리기
              </button>
            </ScrollReveal>

            <ScrollReveal delay={1.0}>
              <div className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground/60 tracking-tight"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary/70" />
                <span>신청 1분 <span className="mx-1 text-foreground/30">·</span> 확인 후 순차 연락 <span className="mx-1 text-foreground/30">·</span> DM 문의 가능</span>
              </div>
            </ScrollReveal>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
