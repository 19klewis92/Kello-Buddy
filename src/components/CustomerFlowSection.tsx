import { motion } from "framer-motion";
import { Search, Calendar, CreditCard, Store, CheckCircle2 } from "lucide-react";
import KelloText from "./KelloText";

const steps = [
  {
    icon: Search,
    num: "1",
    title: <>매장 발견</>,
    desc: <>외국인이 여행 준비 중 <KelloText /> 플랫폼에서 예약 가능한 매장 발견</>,
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Calendar,
    num: "2",
    title: <>예약</>,
    desc: <><KelloText /> 플랫폼에서 날짜와 시술을 선택하고 간편하게 예약</>,
    color: "from-kello-gold to-accent",
  },
  {
    icon: CreditCard,
    num: "3",
    title: <>선결제</>,
    desc: <>현장 결제 부담 없고 노쇼 없는 100% <KelloText /> 선결제 완료</>,
    color: "from-rose-400 to-rose-600",
  },
  {
    icon: Store,
    num: "4",
    title: <>매장방문</>,
    desc: "예약한 시간에 맞춰 매장 방문",
    color: "from-kello-green to-emerald-600",
  },
  {
    icon: CheckCircle2,
    num: "5",
    title: <>서비스 완료</>,
    desc: <>서비스 완료 후 <KelloText />에서 업체로 결제</>,
    color: "from-purple-400 to-purple-600",
  },
];

const CustomerFlowSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-spring-purple relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kello-gold/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto relative z-10"
        >
          <span className="inline-block text-sm font-bold text-primary tracking-widest uppercase mb-4">How it works</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4 sm:mb-6 leading-tight break-keep">
            외국인 고객은 이렇게<br className="hidden sm:block" />매장을 찾습니다
          </h2>
        </motion.div>

        <div className="relative max-w-[1400px] mx-auto z-10 w-full px-2 sm:px-4">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0 opacity-50" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-3xl p-6 lg:p-5 xl:p-8 flex flex-col items-center text-center relative"
              >
                <div className={`w-12 h-12 rounded-full text-white font-black text-xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg mb-6 relative -mt-12 ring-4 ring-white shrink-0`}>
                  {step.num}
                </div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-md opacity-10 absolute top-10 pointer-events-none`}>
                </div>
                <step.icon className="h-10 w-10 text-primary mb-4 relative z-10 shrink-0" />
                <h3 className="text-lg sm:text-lg lg:text-base xl:text-xl font-black text-foreground mb-3 leading-snug break-keep">{step.title}</h3>
                {step.desc && (
                  <p className="text-muted-foreground font-bold leading-snug break-keep text-sm xl:text-base mt-auto">
                    {step.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFlowSection;
