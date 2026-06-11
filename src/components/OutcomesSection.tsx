import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Clock } from "lucide-react";
import KelloText from "./KelloText";

const outcomes = [
  {
    icon: TrendingUp,
    value: "예약 전환",
    label: "개선",
    desc: "외국인 고객의 예약 완료율을 높여 실질적인 매출로 연결합니다.",
  },
  {
    icon: ShieldCheck,
    value: "노쇼",
    label: "감소",
    desc: "선결제 기반으로 노쇼 리스크를 제로에 가깝게 줄입니다.",
  },
  {
    icon: Clock,
    value: "응대 시간",
    label: "절감",
    desc: "AI 자동 번역과 예약 시스템으로 응대 시간을 대폭 단축합니다.",
  },
];

const OutcomesSection = () => {
  return (
    <section className="py-24 bg-kello-blue-light relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kello-green/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">Outcomes</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            <KelloText /> 도입 후 기대 성과
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-kello-card border border-border text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
                <o.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl font-black text-foreground">{o.value}</span>
                <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1">
                  {o.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
