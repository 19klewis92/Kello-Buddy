import { motion } from "framer-motion";
import { Lock, BadgePercent } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-kello-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            합리적인 수수료 구조
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-kello-card border border-border overflow-hidden">
            {/* Public summary */}
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
                <BadgePercent className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                예약 성사 수수료 기반 + 성장형 옵션
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                예약이 성사될 때만 수수료가 발생합니다.<br />
                고정비 부담 없이 매출에 연동되는 합리적인 구조입니다.
              </p>
            </div>

            {/* Locked detail */}
            <div className="bg-muted/50 border-t border-border p-6 flex items-center justify-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                상세 요금표는 파트너 신청 후 안내드립니다.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
