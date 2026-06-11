import { motion } from "framer-motion";
import KelloText from "./KelloText";

const rows = [
  { label: "외국인 응대", normal: "번역기 씨름", kello: "자동 번역 응대" },
  { label: "예약 관리", normal: "예약 확인 누락 위험", kello: "시스템 자동 관리" },
  { label: "결제 방식", normal: "현장 결제, 요금 분쟁 가능", kello: "정찰제 선결제, 깔끔한 정산" },
  { label: "노쇼 리스크", normal: "높음", kello: "제로 (선결제 완료)" },
  { label: "문화적 배려", normal: "개별 대응 어려움", kello: "고객 맞춤 안내 자동 제공" },
];

const EfficiencySection = () => {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">Comparison</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-background flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <span>일반 예약</span>
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground text-base md:text-lg font-black shadow-lg">VS</span>
            <span><KelloText /> 예약</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-[1fr_auto_1fr] gap-0 items-start"
        >
          {/* Left - 일반 예약 */}
          <div className="rounded-2xl bg-background/5 backdrop-blur-sm border border-background/10 overflow-hidden">
            <div className="p-4 md:p-6 text-center border-b border-background/10">
              <h3 className="text-lg md:text-xl font-bold text-background/60">일반 예약</h3>
            </div>
            <div className="divide-y divide-background/10">
              {rows.map((row) => (
                <div key={row.label} className="p-4 md:p-5 text-center">
                  <span className="block text-[10px] md:text-xs font-semibold text-background/40 uppercase tracking-wider mb-1">
                    [{row.label}]
                  </span>
                  <span className="text-background/50 text-xs md:text-sm">{row.normal}</span>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 text-center border-t border-background/10">
              <p className="text-background/30 text-sm italic">"그래서<br/>뭘 해야 하죠?"</p>
            </div>
          </div>

          {/* Center VS column */}
          <div className="flex flex-col items-center justify-center self-stretch py-16">
            <div className="w-px flex-1 bg-background/15" />
            <div
              className="my-3 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black text-primary-foreground text-sm md:text-base z-10"
              style={{
                background: "hsl(330 45% 55%)",
                boxShadow:
                  "0 0 15px hsl(330 45% 55% / 0.6), 0 0 40px hsl(330 45% 55% / 0.3), 0 0 80px hsl(340 60% 62% / 0.15)",
              }}
            >
              VS
            </div>
            <div className="w-px flex-1 bg-background/15" />
          </div>

          {/* Right - Kello (neon glow border) */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              boxShadow:
                "0 0 15px hsl(330 45% 55% / 0.4), 0 0 40px hsl(340 60% 62% / 0.2), 0 0 80px hsl(10 70% 65% / 0.1), inset 0 0 30px hsl(330 45% 55% / 0.05)",
            }}
          >
            {/* Neon border effect */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: "1.5px solid hsl(330 45% 55% / 0.6)",
                boxShadow:
                  "inset 0 0 20px hsl(330 45% 55% / 0.1), 0 0 8px hsl(330 45% 55% / 0.3)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, hsl(330 40% 30%) 0%, hsl(340 50% 40%) 50%, hsl(10 60% 50%) 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent" />

            <div className="relative z-10">
              <div className="p-4 md:p-6 text-center border-b border-primary-foreground/15">
                <h3 className="text-lg md:text-xl font-bold text-primary-foreground"><KelloText /> 예약</h3>
              </div>
              <div className="divide-y divide-primary-foreground/15">
                {rows.map((row) => (
                  <div key={row.label} className="p-4 md:p-5 text-center">
                    <span className="block text-[10px] md:text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider mb-1">
                      [{row.label}]
                    </span>
                    <span className="text-primary-foreground font-medium text-xs md:text-sm">{row.kello}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 md:p-6 text-center border-t border-primary-foreground/15">
                <p className="text-primary-foreground font-bold text-sm">"직접 연결하고,<br/>매출로 증명합니다."</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EfficiencySection;
