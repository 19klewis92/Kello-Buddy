import { motion } from "framer-motion";
import { Zap, Star, MessageSquare, TicketPercent, CheckCircle2 } from "lucide-react";
import KelloText from "./KelloText";
import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: Zap,
    titleText: "2026년 이용료 0원",
    descText: "2026년까지 모든 서비스 이용료가 면제됩니다.",
  },
  {
    icon: Star,
    titleText: "우선 추천 및 홍보 혜택",
    descText: "고객 데이터 기반으로 AI 추천 서비스를 제공하고 외국인에게 업체를 홍보합니다.",
  },
  {
    icon: MessageSquare,
    titleText: null,
    titleNode: (
      <span className="break-keep">어려운 커뮤니케이션은{" "}<KelloText />에게</span>
    ),
    descText: null,
    descNode: (
      <span className="break-keep">외국인과의 어려운 상담 및 시술 관련 설명은{" "}<KelloText />에게 한국어로 전달해주세요.</span>
    ),
  },
] as const;

const CategoryIcon = ({ icon }: { icon: { name: string; src: string } }) => {
  let imageAnim = {};
  let overlays = null;

  switch (icon.name) {
    case "헤어":
      imageAnim = {
        animate: { rotate: [0, 1.5, -1, 0] },
        transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
      };
      overlays = (
         <motion.div 
          className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      );
      break;

    case "메이크업":
      imageAnim = {
        animate: { y: [0, -1.5, 0] },
        transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
      };
      overlays = (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen">
          <motion.div 
            className="absolute inset-y-0 -left-[100%] w-[200%] h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
            animate={{ x: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 1.5 }}
          />
          <motion.div
            className="absolute top-[25%] right-[25%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_8px_3px_rgba(255,255,255,1)]"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          />
        </div>
      );
      break;

    case "에스테틱":
      imageAnim = {
        animate: { scale: [1, 1.025, 1] },
        transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
      };
      overlays = (
        <motion.div 
          className="absolute inset-0 z-20 bg-white mix-blend-overlay pointer-events-none"
          animate={{ opacity: [0, 0.25, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      );
      break;

    case "네일":
      imageAnim = {
        animate: { y: [0, -2, 0] },
        transition: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
      };
      overlays = (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-overlay">
          <motion.div 
            className="absolute inset-y-0 -left-[100%] block h-full w-[200%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{ x: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", repeatDelay: 2 }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-[0_0_8px_3px_rgba(255,255,255,1)]"
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      );
      break;

    case "속눈썹":
      imageAnim = {
        animate: { scaleY: [1, 0.96, 1, 1, 1] },
        transition: { 
          repeat: Infinity, 
          duration: 4.5, 
          ease: "easeInOut", 
          times: [0, 0.03, 0.06, 0.5, 1] 
        }
      };
      overlays = (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen">
           <motion.div
            className="absolute top-[35%] right-[30%] w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.9)]"
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
          />
        </div>
      );
      break;
      
    default:
      break;
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4 shrink w-[18%] sm:w-32 md:w-44 lg:w-52 group">
      <motion.div 
        className="relative w-full aspect-square bg-white rounded-[1.2rem] sm:rounded-[2.5rem] shadow-sm cursor-pointer overflow-hidden ring-1 ring-black/5"
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.img 
          src={icon.src} 
          alt={icon.name} 
          className="w-full h-full object-cover relative z-10 origin-center" 
          onError={(e) => (e.currentTarget.style.display = 'none')} 
          {...imageAnim}
        />
        {overlays}
      </motion.div>
      <span className="text-amber-900 font-black text-[11px] sm:text-base md:text-xl tracking-tight mt-1 text-center break-keep group-hover:text-primary transition-colors duration-300">{icon.name}</span>
    </div>
  );
};

const EarlyBirdSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-spring-yellow relative overflow-hidden" id="benefits">
      {/* Decorative floral elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-kello-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-900 mb-8 break-keep leading-[1.15]">
              2026년은 <KelloText /> 뷰티 파트너에게<br className="hidden md:block" /> 
              <span className="text-primary border-b-4 border-primary">무료로 제공합니다.</span>
            </h2>
            <p className="text-xl md:text-2xl text-amber-900/80 font-bold leading-relaxed break-keep mb-4">
              제휴 매장이 <KelloText /> 서비스를 무료로 사용할 수 있습니다.
            </p>
            <div className="inline-flex items-center gap-2 py-3 px-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white font-black text-amber-900 shadow-sm mt-4">
              외국인 고객으로 매출상승의 기회, 바로 지금입니다 ✨
            </div>

            {/* K-Beauty Category Icons - Moved below */}
            <div className="flex justify-center items-start flex-nowrap gap-1.5 sm:gap-6 md:gap-10 lg:gap-12 mt-8 sm:mt-12 w-full max-w-[1400px] mx-auto px-2 sm:px-4">
              {[
                { name: "헤어", src: "/헤어.png" },
                { name: "메이크업", src: "/메이크업.png" },
                { name: "에스테틱", src: "/에스테틱.png" },
                { name: "네일", src: "/네일.png" },
                { name: "속눈썹", src: "/속눈썹.png" },
              ].map((icon) => (
                <CategoryIcon key={icon.name} icon={icon} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.15} className="flex">
              <div className="w-full glass-card rounded-[2.5rem] p-8 md:p-10 border-white bg-white/40 hover:-translate-y-2 transition-transform duration-500 group shadow-lg flex flex-col items-center text-center">
                {/* 아이콘 박스 - 3개 동일 */}
                <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <b.icon className="h-8 w-8 text-primary" strokeWidth={1.75} />
                </div>
                {/* 제목 - 최소 높이 고정으로 3개 기준선 통일 */}
                <div className="min-h-[3.5rem] flex items-center justify-center mb-4 w-full">
                  <h3 className="text-xl font-black text-amber-900 leading-snug break-keep text-center">
                    {'titleNode' in b ? b.titleNode : b.titleText}
                  </h3>
                </div>
                {/* 본문 - 최소 높이 고정으로 3개 기준선 통일 */}
                <div className="min-h-[5rem] flex items-center justify-center w-full">
                  <p className="text-amber-900/70 font-bold leading-relaxed break-keep text-base text-center">
                    {'descNode' in b ? b.descNode : b.descText}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EarlyBirdSection;
