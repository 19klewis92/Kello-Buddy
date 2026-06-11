import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import KelloText from "./KelloText";
import { useState } from "react";
import { toast } from "sonner";
import SurveyDialog from "./SurveyDialog";
import ScrollReveal from "./ScrollReveal";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  PARTNER_CATEGORIES,
  PARTNER_REGIONS,
  INITIAL_PARTNER_APPLICATION_FORM,
  PartnerApplicationForm,
  buildPartnerApplicationInsertPayload,
  createApplicationId,
  mapSupabaseWriteError,
  validatePartnerApplicationForm,
} from "@/lib/partnerRecruitment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CTAFormSection = () => {
  const [form, setForm] = useState<PartnerApplicationForm>(INITIAL_PARTNER_APPLICATION_FORM);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [showBridge, setShowBridge] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  // 제출 시점의 기본정보를 스냅샷으로 보존 → SurveyDialog에 안정적으로 전달
  const [pendingBasicInfo, setPendingBasicInfo] = useState<typeof form | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      toast.error("Supabase 연결 정보가 아직 설정되지 않았습니다.");
      return;
    }

    const validatedForm = validatePartnerApplicationForm(form);
    if (!validatedForm.ok) {
      toast.error(validatedForm.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const newApplicationId = createApplicationId();
      console.log("Submitting to partner_applications at:", import.meta.env.VITE_SUPABASE_URL);
      const { error } = await supabase
        .from("partner_applications")
        .insert([buildPartnerApplicationInsertPayload(newApplicationId, validatedForm.value)]);

      if (error?.code === "23505") {
        toast.error("이미 신청이 접수된 연락처 또는 이메일입니다.");
        return;
      }

      if (error) {
        console.error("Partner Applications Insert Error:", error);
        throw error;
      }

      setApplicationId(newApplicationId);
      
      toast.success("신청 정보가 접수되었습니다!");

      setPendingBasicInfo({
        businessName: validatedForm.value.companyName,
        region: validatedForm.value.region,
        category: validatedForm.value.businessType,
        contact: validatedForm.value.phone,
        email: validatedForm.value.email,
      });
      setShowBridge(true);
    } catch (err: unknown) {
      console.error("Full Submission Exception:", err);
      toast.error(mapSupabaseWriteError(err, "신청 정보"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseBridge = (open: boolean) => {
    setShowBridge(open);
    if (!open) {
      // 팝업을 닫으면 입력 데이터 초기화
      setForm(INITIAL_PARTNER_APPLICATION_FORM);
    }
  };

  const handleStartSurvey = () => {
    setShowBridge(false);
    setSurveyOpen(true);
  };

  const handleSurveyComplete = () => {
    setForm(INITIAL_PARTNER_APPLICATION_FORM);
    setPendingBasicInfo(null);
    setSurveyOpen(false);
  };

  return (
    <section id="cta" className="py-16 sm:py-24 bg-card relative overflow-hidden border-t border-border">
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto px-4 sm:px-6 max-w-[1800px] relative z-10">
        <ScrollReveal width="100%">
          <div className="w-full mx-auto">
            <div className="text-center mb-16 max-w-5xl mx-auto">
              <span className="inline-block text-base sm:text-lg lg:text-xl font-bold text-primary tracking-widest uppercase mb-4">Partner Application</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-6 break-keep leading-tight">
                지금 <KelloText />와 함께<br />
                새로운 매출을 만들어보세요
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-medium break-keep mt-4 sm:mt-6">
                <KelloText />와 함께 외국인 고객을 매장으로 연결하세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] px-5 py-10 sm:p-10 md:p-14 lg:p-20 space-y-5 sm:space-y-8 relative z-10 w-full max-w-4xl mx-auto shadow-2xl">
              {!isSupabaseConfigured && (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive">
                  현재 Supabase 연결 정보가 없어 신청이 저장되지 않습니다. `.env.local`의 공개 키를 먼저 확인해주세요.
                </div>
              )}

              <div>
                <label className="block text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                  업체명<span className="text-destructive ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 서울뷰티살롱"
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  className="w-full px-5 py-3 sm:py-4 rounded-2xl border border-input bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-base sm:text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                    지역<span className="text-destructive ml-1">*</span>
                  </label>
                  <select
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="w-full px-5 py-3 sm:py-4 rounded-2xl border border-input bg-background/50 backdrop-blur-sm text-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-base sm:text-lg"
                  >
                    <option value="">선택</option>
                    {PARTNER_REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                    업종<span className="text-destructive ml-1">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-5 py-3 sm:py-4 rounded-2xl border border-input bg-background/50 backdrop-blur-sm text-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-base sm:text-lg"
                  >
                    <option value="">선택</option>
                    {PARTNER_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                  연락처<span className="text-destructive ml-1">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-5 py-3 sm:py-4 rounded-2xl border border-input bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-base sm:text-lg"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                  이메일 주소<span className="text-destructive ml-1">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-3 sm:py-4 rounded-2xl border border-input bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all text-base sm:text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isSupabaseConfigured}
                className="w-full bg-gradient-accent text-accent-foreground font-black py-4 sm:py-5 rounded-2xl text-lg sm:text-xl shadow-kello-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
                {isSubmitting ? "제출 중..." : "외국인 고객 받고 매출 올리기"}
              </button>
            </form>

            {/* 브릿지 팝업: 가독성 좋고 따뜻한 안내 */}
            <Dialog open={showBridge} onOpenChange={handleCloseBridge}>
              <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                <div className="bg-gradient-to-br from-rose-50 via-white to-white p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
                      <CheckCircle2 className="w-12 h-12 text-rose-500" />
                    </div>
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-black text-foreground break-keep">신청해 주셔서 감사합니다.<br />곧 연락드리겠습니다. ✨</DialogTitle>
                      <DialogDescription className="text-base font-bold text-muted-foreground pt-1 leading-relaxed break-keep">
                        설문에 참여해주시면 더 나은 서비스 제공에<br />큰 도움이 됩니다.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <button
                      onClick={handleStartSurvey}
                      className="w-full bg-gradient-to-r from-[#FFD66B] via-[#FFC021] to-[#FFAB00] hover:brightness-105 text-[#422C00] font-black py-5 rounded-2xl text-lg shadow-[0_10px_30px_rgba(255,171,0,0.3)] hover:scale-[1.03] transition-all flex items-center justify-center gap-2 group border border-[#FFD66B]/50"
                    >
                      <span className="drop-shadow-sm font-black">☕ 커피쿠폰 받고 설문조사하기</span>
                    </button>
                    
                    <button 
                      onClick={() => handleCloseBridge(false)}
                      className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      다음에 하기
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {pendingBasicInfo && (
              <SurveyDialog
                open={surveyOpen}
                onOpenChange={setSurveyOpen}
                basicInfo={pendingBasicInfo}
                applicationId={applicationId}
                onComplete={handleSurveyComplete}
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTAFormSection;
