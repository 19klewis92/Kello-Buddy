import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import KelloText from "./KelloText";

const AboutSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-kello-coral/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 text-transparent bg-clip-text" style={{ backgroundImage: "var(--kello-gradient-hero)" }}>About Kello</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              가족의 불편함에서 시작된
              <br />
              진정성 있는 서비스
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-2xl p-8 shadow-kello-card border border-border">
              <div className="w-14 h-14 mb-4 -ml-1">
                <img src="/kello_k_icon.png" alt="K" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">진정성</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                외국인 가족이 한국에서 겪은 불편함에서 출발했습니다. 
                언어 장벽과 인증 문제로 좋은 서비스를 이용하지 못하는 
                관광객의 경험을 직접 목격하고, 이를 해결하기 위해 <KelloText />를 만들었습니다.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-kello-card border border-border">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">신뢰</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                10년 사업 경력의 대표자와 AI 전문가 팀이 함께 만듭니다.
                기술적 전문성과 현장 경험을 바탕으로, 사장님과 관광객 모두에게 
                신뢰할 수 있는 인프라를 구축합니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
