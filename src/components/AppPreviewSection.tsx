import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Languages,
  CreditCard,
  ChartColumn,
  ArrowRight,
  Star,
} from "lucide-react";

// ── 탭 정의 ──────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "reservation",
    label: "예약 관리",
    Icon: CalendarCheck,
    title: "예약을\n한눈에 관리",
    desc: "외국인 고객 예약 현황을 실시간으로 확인하고, 일정 충돌 없이 효율적으로 관리하세요.",
    screen: (
      <ReservationScreen />
    ),
  },
  {
    id: "translate",
    label: "자동 번역",
    Icon: Languages,
    title: "언어 장벽\n완전 제거",
    desc: "영어, 일본어, 중국어 등 주요 언어로 자동 번역되어 고객과 막힘 없이 소통할 수 있습니다.",
    screen: (
      <TranslateScreen />
    ),
  },
  {
    id: "payment",
    label: "선결제",
    Icon: CreditCard,
    title: "노쇼 걱정\n이제 그만",
    desc: "예약 시 선결제를 받아 노쇼를 원천 차단하고, 안정적인 매출을 확보하세요.",
    screen: (
      <PaymentScreen />
    ),
  },
  {
    id: "analytics",
    label: "매출 분석",
    Icon: ChartColumn,
    title: "외국인 고객\n매출 한눈에",
    desc: "국적별, 서비스별 매출 데이터를 실시간으로 확인하고 마케팅 전략에 활용하세요.",
    screen: (
      <AnalyticsScreen />
    ),
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── 메인 섹션 ─────────────────────────────────────────────────────────────────
const AppPreviewSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>("reservation");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((tab) => tab.id === prev);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex].id;
      });
    }, 2000); // 2초마다 자동 전환

    return () => clearInterval(interval);
  }, [activeTab]); // activeTab이 바뀔 때마다 타이머 리셋

  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 md:py-28 bg-charcoal-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-bold text-sm mb-3">앱 출시 전 미리보기</p>
          <h2
            className="text-4xl md:text-[46px] font-bold text-charcoal-900 leading-tight mb-4"
            style={{ wordBreak: "keep-all" }}
          >
            사장님 전용 앱 하나로
            <br />
            <span className="text-primary">외국인 매출</span>을 관리하세요
          </h2>
          <p
            className="text-charcoal-400 text-lg"
            style={{ wordBreak: "keep-all" }}
          >
            예약부터 결제, 소통까지 — Kello 앱에서 모두 해결됩니다.
          </p>
        </motion.div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Text + Tab Buttons ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 order-2 lg:order-1"
          >
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-rose-500/20"
                        : "bg-white text-charcoal-500 border border-charcoal-100 hover:border-primary/30"
                    }`}
                  >
                    <tab.Icon className="w-4 h-4" aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <h3
                  className="text-4xl md:text-[46px] font-bold text-charcoal-900 leading-tight mb-4 whitespace-pre-line"
                  style={{ wordBreak: "keep-all" }}
                >
                  {current.title}
                </h3>
                <p
                  className="text-charcoal-500 text-base md:text-lg leading-relaxed mb-6"
                  style={{ wordBreak: "keep-all" }}
                >
                  {current.desc}
                </p>
                <button 
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-rose-600 transition-colors"
                >
                  무료로 시작하기{" "}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 shrink-0"
          >
            <div className="relative mx-auto" style={{ width: 336 }}>
              {/* Glow decorations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-purple-400/10 blur-2xl pointer-events-none" />

              {/* Phone Frame */}
              <div
                className="rounded-[40px] border-[6px] border-charcoal-800 bg-charcoal-50 shadow-2xl overflow-hidden"
                style={{ height: 696 }}
              >
                {/* Notch */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-28 h-6 bg-charcoal-800 rounded-b-2xl z-10" />

                {/* Screen */}
                <div className="h-full pt-6 flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-5 pt-3 pb-2">
                        <span className="text-[11px] font-semibold text-charcoal-900">
                          9:41
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-2 rounded-sm bg-charcoal-900" />
                        </div>
                      </div>

                      {/* App header */}
                      <div className="px-5 pb-4 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">
                              K
                            </span>
                          </div>
                          <span className="text-sm font-bold text-charcoal-900">
                            Kello Business
                          </span>
                        </div>
                        <p className="text-lg font-bold text-charcoal-900 mt-3">
                          {current.label}
                        </p>
                      </div>

                      {/* Screen content */}
                      <div className="flex-1 px-4 flex flex-col gap-3 overflow-hidden">
                        {current.screen}
                      </div>

                      {/* Bottom Nav */}
                      <div className="px-4 py-4 mt-auto">
                        <div className="flex items-center justify-around py-2 bg-charcoal-50 rounded-xl">
                          <CalendarCheck
                            className={`w-5 h-5 ${activeTab === "reservation" ? "text-primary" : "text-charcoal-300"}`}
                            aria-hidden="true"
                          />
                          <Languages
                            className={`w-5 h-5 ${activeTab === "translate" ? "text-primary" : "text-charcoal-300"}`}
                            aria-hidden="true"
                          />
                          <ChartColumn
                            className={`w-5 h-5 ${activeTab === "analytics" ? "text-primary" : "text-charcoal-300"}`}
                            aria-hidden="true"
                          />
                          <Star
                            className={`w-5 h-5 ${activeTab === "payment" ? "text-primary" : "text-charcoal-300"}`}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-center text-sm text-charcoal-500 mt-4 font-medium">(예시)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Screen Components ─────────────────────────────────────────────────────────

function AnalyticsScreen() {
  const data = [
    { flag: "🇺🇸", country: "USA", bookings: "42 bookings", revenue: "₩3,570,000", growth: "+23%" },
    { flag: "🇯🇵", country: "Japan", bookings: "38 bookings", revenue: "₩3,040,000", growth: "+18%" },
    { flag: "🇨🇳", country: "China", bookings: "27 bookings", revenue: "₩2,430,000", growth: "+31%" },
  ];
  return (
    <>
      {data.map((item, i) => (
        <motion.div
          key={item.country}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-semibold text-charcoal-900">
                  {item.flag} {item.country}
                </span>
              </div>
              <p className="text-xs text-charcoal-500 leading-relaxed truncate">
                {item.bookings}
              </p>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-xs font-semibold text-charcoal-900">
                {item.revenue}
              </p>
              <p className="text-[11px] font-medium mt-0.5 text-primary">
                {item.growth}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

function ReservationScreen() {
  const reservations = [
    { time: "10:00", name: "Sarah M.", service: "헤어 컬러", flag: "🇺🇸", status: "확정" },
    { time: "13:30", name: "Yuki T.", service: "클래식 펌", flag: "🇯🇵", status: "확정" },
    { time: "15:00", name: "Lin W.", service: "두피 케어", flag: "🇨🇳", status: "대기" },
  ];
  return (
    <>
      {reservations.map((r, i) => (
        <motion.div
          key={r.time}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-base">{r.flag}</span>
              <div>
                <p className="text-[13px] font-bold text-charcoal-900">{r.name}</p>
                <p className="text-[11px] text-charcoal-400">{r.time} · {r.service}</p>
              </div>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                r.status === "확정"
                  ? "bg-green-50 text-green-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {r.status}
            </span>
          </div>
        </motion.div>
      ))}
    </>
  );
}

function TranslateScreen() {
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
      >
        <p className="text-[11px] text-charcoal-400 mb-1">고객 메시지 (영어)</p>
        <p className="text-[13px] font-semibold text-charcoal-900">"Can I get a perm and color treatment?"</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-rose-50 rounded-xl p-3.5 border border-rose-100 shadow-sm"
      >
        <div className="flex items-center gap-1 mb-1">
          <Languages className="w-3 h-3 text-primary" />
          <p className="text-[11px] text-primary font-semibold">자동 번역 (한국어)</p>
        </div>
        <p className="text-[13px] font-semibold text-charcoal-900">펌과 컬러 시술 받을 수 있을까요?</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
      >
        <p className="text-[11px] text-charcoal-400 mb-1">답장 (자동 번역 발송)</p>
        <p className="text-[13px] font-semibold text-charcoal-900">"네, 가능합니다! 예약을 잡아드릴게요 😊"</p>
        <p className="text-[11px] text-charcoal-400 mt-1">→ "Yes, we can! Let me book your appointment 😊"</p>
      </motion.div>
    </div>
  );
}

function PaymentScreen() {
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-charcoal-900">헤어 컬러 + 트리트먼트</p>
          <span className="text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">선결제 완료</span>
        </div>
        <p className="text-lg font-black text-primary">₩180,000</p>
        <p className="text-[11px] text-charcoal-400 mt-1">🇺🇸 Sarah M. · 예약 시 결제 완료</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-3.5 border border-charcoal-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-charcoal-900">클래식 펌</p>
          <span className="text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">선결제 완료</span>
        </div>
        <p className="text-lg font-black text-primary">₩120,000</p>
        <p className="text-[11px] text-charcoal-400 mt-1">🇯🇵 Yuki T. · 예약 시 결제 완료</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-rose-50 rounded-xl p-3 border border-rose-100"
      >
        <p className="text-[11px] text-primary font-semibold">💡 노쇼 0건 달성</p>
        <p className="text-[11px] text-charcoal-500 mt-0.5">이번 달 선결제로 노쇼 없는 운영을 유지했어요!</p>
      </motion.div>
    </div>
  );
}

export default AppPreviewSection;
