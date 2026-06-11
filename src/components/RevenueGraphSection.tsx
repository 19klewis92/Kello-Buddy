import { motion } from "framer-motion";
import KelloText from "./KelloText";
import { TrendingUp } from "lucide-react";

const simulationData = [
  { guests: "월 5명", revenue: "+75만 원", percentage: 22 },
  { guests: "월 10명", revenue: "+150만 원", percentage: 45 },
  { guests: "월 20명", revenue: "+300만 원", percentage: 70 },
  { guests: "월 30명", revenue: "+450만 원", percentage: 95 },
];

const RevenueGraphSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Side: Text Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-left"
          >
            <span className="inline-block text-sm font-bold text-[#D93644] mb-5">
              매출 시뮬레이션
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-black text-[#222] mb-6 leading-[1.3] break-keep">
              한달에 딱 <span className="text-[#D93644]">10명</span>만 늘어도,<br />
              <span className="text-[#D93644]">매출</span> 앞자리가 바뀝니다.
            </h2>
            <div className="max-w-md">
              <p className="text-[15px] md:text-[16px] text-[#A0A0A0] font-medium mb-8 leading-relaxed break-keep">
                뷰티를 찾는 외국인 관광객은 단순 시술이 아닌 프리미엄 패키지를 선호합니다. <br className="hidden md:block" />
                외국인 고객 몇 명만 늘어도 매출이 증가합니다.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F8F9FA] rounded-[10px] text-[#444] shadow-sm">
              <TrendingUp className="w-4 h-4 text-[#D93644]" />
              <span className="text-[15px] font-bold">
                예상 외국인 평균 객단가: <span className="text-[#222]">15만 원</span>
              </span>
            </div>
          </motion.div>

          {/* Right Side: Simulation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[48%]"
          >
            <div className="bg-[#F8F9FB] rounded-[24px] p-6 sm:p-8 md:p-10 border border-[#E9ECEF] flex flex-col h-full">
              <h3 className="text-[16px] font-bold text-[#666] mb-8">
                <KelloText />로 인한 월 추가 수익
              </h3>

              <div className="flex justify-around items-end h-[220px] sm:h-[240px] md:h-[280px] w-full pt-4">
                {simulationData.map((item, index) => (
                  <div key={item.guests} className="flex flex-col items-center h-full w-full group">
                    {/* Chart Body */}
                    <div className="relative flex flex-col justify-end items-center h-full w-full border-b-2 border-[#E9ECEF]">
                      {/* Floating Revenue Label */}
                      <motion.div 
                        className="absolute w-full flex justify-center pb-2 sm:pb-3 pointer-events-none"
                        style={{ bottom: `${item.percentage}%` }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: "easeOut" }}
                      >
                        <span className="text-[13px] sm:text-[16px] md:text-[19px] text-[#D93644] font-black whitespace-nowrap tracking-tighter">
                          {item.revenue}
                        </span>
                      </motion.div>

                      {/* Bar Fill */}
                      <motion.div
                        className="w-[32px] sm:w-[46px] md:w-[56px] bg-gradient-to-t from-[#c92a37] to-[#f44b5b] rounded-t-xl group-hover:brightness-110 transition-all duration-300"
                        style={{ height: `${item.percentage}%`, transformOrigin: "bottom" }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.9, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    
                    {/* X-Axis Label */}
                    <div className="mt-3 sm:mt-4 flex flex-col items-center">
                      <span className="text-[12px] sm:text-[14px] md:text-[15px] font-bold text-[#666] whitespace-nowrap tracking-tight">{item.guests}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 text-center sm:text-left border-t border-[#E9ECEF]/60">
                <p className="text-[11px] sm:text-[13px] text-[#A0A0A0] font-medium leading-relaxed break-keep">
                  * 외국인 관광객 프리미엄 시술 평균 객단가 15만 원 적용 기준
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RevenueGraphSection;
