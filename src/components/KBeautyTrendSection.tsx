import React, { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const CountUpText = ({ endValue, duration = 1.2, delay = 0.3, start = false, reset = false }: { endValue: number, duration?: number, delay?: number, start?: boolean, reset?: boolean }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (reset) {
      count.set(0);
    } else if (start) {
      const controls = animate(count, endValue, { 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      });
      return controls.stop;
    }
  }, [count, endValue, duration, delay, start, reset]);

  return <motion.span>{rounded}</motion.span>;
};

// ── Floating Decorative Elements ─────────────────────────────────────────────
const FloatingParticle = ({ children, delay = 0, x = 0, y = 0, duration = 4 }: { children: React.ReactNode, delay?: number, x?: number, y?: number, duration?: number }) => (
  <motion.div
    initial={{ x, y, opacity: 0, rotate: 0 }}
    animate={{ 
      y: [y, y - 20, y],
      rotate: [0, 10, -10, 0],
      opacity: [0.2, 0.5, 0.2]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none select-none"
  >
    {children}
  </motion.div>
);

const KBeautyTrendSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isResetPeriod, setIsResetPeriod] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => {
        if (prev === 3) {
          setIsResetPeriod(true);
          setTimeout(() => {
            setIsResetPeriod(false);
          }, 80); 
          return 0;
        }
        return prev + 1;
      });
    }, 2500); // Increased cycle speed: 2.5 seconds
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "전체 외국인 관광객 수",
      mainVal: "2024년 1,700만 명",
      subTitle: "방한 외래 관광객 수",
      content: (active: boolean, started: boolean, reset: boolean) => (
        <div className="w-full flex flex-col items-center justify-between h-full min-h-[140px] mt-auto">
          <div className="relative w-full h-[90px] sm:h-[100px] flex flex-grow items-end justify-center mb-3">
            <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible">
              {/* Main Curve */}
              <motion.path 
                d="M 0 55 Q 12 55, 24 52 T 48 45 T 72 35 T 96 20 T 120 5" 
                fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={reset ? { pathLength: 0, opacity: 0 } : (started ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 })}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: active ? 0.3 : 0 }}
              />
              
              {/* Data Points */}
              {[
                { x: 0,   y: 55, yr: "2021" },
                { x: 24,  y: 52, yr: "2022" },
                { x: 48,  y: 45, yr: "2023" },
                { x: 72,  y: 35, yr: "2024" },
                { x: 96,  y: 20, yr: "2025" },
                { x: 120, y: 5,  yr: "2026" }
              ].map((p, i) => (
                <g key={i}>
                  <motion.circle 
                    cx={p.x} cy={p.y} r="4" fill="#fff" stroke="hsl(var(--primary))" strokeWidth="2" className="drop-shadow-md" 
                    initial={{ scale: 0 }}
                    animate={reset ? { scale: 0 } : (started ? { scale: 1 } : { scale: 0 })}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: active ? 0.5 + (i * 0.1) : 0 }}
                  />
                  <text x={p.x} y="72" textAnchor="middle" className="text-[9px] fill-muted-foreground font-black font-sans">{p.yr}</text>
                </g>
              ))}

              {/* "?" Tooltip */}
              <foreignObject x="105" y="-18" width="30" height="30">
                <div className="w-full h-full flex items-center justify-center overflow-visible">
                  <motion.div 
                    className="bg-rose-500 text-white text-[11px] font-black rounded-full shadow-lg flex items-center justify-center relative aspect-square flex-shrink-0 shrink-0"
                    style={{ 
                      width: "22px", 
                      height: "22px",
                      minWidth: "22px",
                      minHeight: "22px",
                      transformOrigin: "center center" 
                    }}
                    initial={{ scale: 0, y: 10, rotate: -10 }}
                    animate={reset ? { scale: 0 } : (started ? { scale: 1, y: 0, rotate: 0 } : { scale: 0, y: 10, rotate: -10 })}
                    transition={{ type: "spring", delay: active ? 1.5 : 0, stiffness: 350, damping: 18 }}
                  >
                    <span className="relative z-10 flex items-center justify-center leading-none">?</span>
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rotate-45" />
                  </motion.div>
                </div>
              </foreignObject>
            </svg>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={reset ? { opacity: 0 } : (started ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 })}
            className="w-full flex justify-center pb-1"
          >
            <p className="text-[10px] sm:text-[11px] font-bold text-rose-500 italic bg-rose-50 py-1.5 px-4 rounded-full border border-rose-100 w-full text-center break-keep leading-tight shadow-sm">
              "2024년 1,700만명 &gt;&gt; 2026년 대폭 상승 추정"
            </p>
          </motion.div>
        </div>
      )
    },
    {
      title: "외국인 뷰티 이용자 수 및 비중",
      mainVal: "약 250만 명",
      subTitle: "뷰티 서비스 이용자 수",
      content: (active: boolean, started: boolean, reset: boolean) => (
        <div className="flex flex-col items-center w-full h-full justify-center min-h-[140px] mt-auto">
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#FDE2E8" strokeWidth="4" />
                <motion.circle
                  cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="4"
                  strokeDasharray="100 100" strokeDashoffset={100} strokeLinecap="round"
                  animate={reset ? { strokeDashoffset: 100 } : (started ? { strokeDashoffset: 85 } : { strokeDashoffset: 100 })}
                  transition={{ duration: 1.2, delay: active ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[16px] font-black text-rose-500">
                <CountUpText endValue={15} duration={1.2} delay={0.3} start={started} reset={reset} />%
              </div>
            </div>
            <div className="text-left">
              <p className="text-[12px] font-bold text-muted-foreground leading-tight mb-1">전체 관광객 중 비중</p>
              <p className="text-[28px] font-black text-rose-500 tracking-tight leading-none italic">
                약 <CountUpText endValue={15} duration={1.2} delay={0.3} start={started} reset={reset} />%
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "1인당 뷰티 목적 평균 지출",
      mainVal: "153만 원",
      subTitle: "결제 데이터 분석",
      content: (active: boolean, started: boolean, reset: boolean) => (
        <div className="space-y-3 w-full h-full flex flex-col justify-end min-h-[140px] mt-auto px-1 overflow-visible">
          <motion.div 
            initial={{ scale: 1, opacity: 0.6 }}
            animate={reset ? { scale: 1, opacity: 0.6 } : (started ? (active ? { 
              scale: [1, 1.08, 1],
              opacity: 1,
              borderColor: ["#FEE2E2", "#FCA5A5", "#FEE2E2"]
            } : { scale: 1, opacity: 1 }) : { scale: 1, opacity: 0.6 })}
            transition={{ duration: 0.8, delay: active ? 0.3 : 0, ease: "easeOut" }}
            className="flex items-center gap-3 bg-white p-3.5 rounded-2xl w-full border border-rose-50 shadow-sm"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-xl">💳</div>
            <div className="text-left flex-1">
              <p className="text-[11px] font-bold text-muted-foreground">외국인 뷰티 목적 결제액</p>
              <p className="text-[16px] font-black text-primary leading-tight">153만 원</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ scale: 1, opacity: 0.4 }}
            animate={reset ? { scale: 1, opacity: 0.4 } : (started ? (active ? { 
              scale: [1, 1.08, 1],
              opacity: 0.8,
            } : { scale: 1, opacity: 0.8 }) : { scale: 1, opacity: 0.4 })}
            transition={{ duration: 0.8, delay: active ? 1.0 : 0, ease: "easeOut" }}
            className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 w-full"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-xl">🛍️</div>
            <div className="text-left flex-1">
              <p className="text-[11px] font-bold text-muted-foreground">일반 여행객 전체 평균</p>
              <p className="text-[16px] font-black text-slate-500 leading-tight">399만 원</p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "이용객 및 매출 성장 곡선",
      mainVal: "폭발적 성장",
      subTitle: "뷰티 분야 매출 추이",
      content: (active: boolean, started: boolean, reset: boolean) => (
        <div className="w-[115%] h-full flex flex-col items-center justify-end pb-2 mt-auto relative">
          <motion.img 
            src="/beauty-growth.png.png" 
            alt="뷰티 소비 급상승" 
            initial={{ scale: 1.0, opacity: 0.25 }}
            animate={reset ? { scale: 1.0, opacity: 0.25 } : (started ? { 
              scale: active ? [1.05, 1.15, 1.1] : 1.1, 
              opacity: 1 
            } : { scale: 1.0, opacity: 0.25 })}
            transition={{ duration: 1.0, ease: "easeOut", delay: active ? 0.2 : 0 }}
            className="w-full h-auto max-h-[170px] sm:max-h-[190px] object-contain object-bottom drop-shadow-[0_12px_24px_rgba(217,54,68,0.15)] origin-bottom -mb-2"
          />
        </div>
      )
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FFF8F9] to-[#FFE8EF] relative overflow-hidden">
      <FloatingParticle delay={0} x={40} y={100} duration={6}>🌸</FloatingParticle>
      <FloatingParticle delay={1} x={300} y={50} duration={5}>✨</FloatingParticle>
      <FloatingParticle delay={2.5} x={-40} y={400} duration={7}>🌸</FloatingParticle>
      <FloatingParticle delay={3} x={100} y={-50} duration={6.5}>🌸</FloatingParticle>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-[1400px]">
        <ScrollReveal width="100%">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-primary font-black text-sm tracking-widest mb-3"
            >
              K-BEAUTY REVENUE TREND
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 break-keep leading-tight">
              글로벌 관광객 유입과 <br className="sm:hidden" /> <span className="text-primary italic">K-뷰티 소비 트렌드</span>
            </h2>
            <p className="text-lg sm:text-xl font-bold text-muted-foreground/80 break-keep">
              외국인 관광객의 뷰티 서비스 이용 현황 및 지출 분석
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {stats.map((s, i) => {
            const isActive = activeCardIndex === i && !isResetPeriod;
            const hasStarted = activeCardIndex >= i && !isResetPeriod;
            
            return (
              <ScrollReveal key={i} delay={i * 0.1} width="100%">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  }}
                  viewport={{ once: true, margin: "-120px", amount: 0.2 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 85, 
                    damping: 18, 
                    delay: i * 0.18 // Fine-tuned for Lottie-style stagger
                  }}
                  animate={isActive ? { 
                    scale: 1.04, 
                    y: -8,
                    boxShadow: "0 30px 60px rgba(217, 54, 68, 0.22)",
                    borderColor: "hsl(var(--primary))",
                    zIndex: 20
                  } : { 
                    scale: 1, 
                    y: 0,
                    boxShadow: "0 15px 30px rgba(217,54,68,0.06)",
                    borderColor: "rgba(255,255,255,1)",
                    zIndex: 10
                  }}
                  className="w-full h-[420px] flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 lg:p-8 border shadow-sm group relative"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-dot"
                      className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(217,54,68,0.6)]"
                    />
                  )}

                  <div className="flex flex-col items-center w-full mb-6">
                    <h3 className="text-[14px] font-black text-muted-foreground/70 mb-2 break-keep tracking-tight uppercase">
                      {s.title}
                    </h3>
                    <p className="text-[26px] sm:text-[32px] font-black text-rose-600 tracking-tighter leading-none whitespace-nowrap">
                      {s.mainVal}
                    </p>
                    <p className="text-[12px] font-bold text-muted-foreground/50 mt-3 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {s.subTitle}
                    </p>
                  </div>

                  <div className="w-full flex-grow flex flex-col items-center justify-end border-t border-slate-50 pt-6 mt-auto">
                    {s.content(isActive, hasStarted, isResetPeriod)}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-rose-200/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
};

export default KBeautyTrendSection;
