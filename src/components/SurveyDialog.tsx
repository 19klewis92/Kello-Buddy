import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import KelloText from "./KelloText";
import { supabase } from "@/lib/supabase";
import {
  INITIAL_PARTNER_SURVEY_ANSWERS,
  PartnerApplicationForm,
  PartnerSurveyAnswers,
  SURVEY_Q1_OPTIONS,
  SURVEY_Q2_OPTIONS,
  SURVEY_Q3_OPTIONS,
  SURVEY_Q4_OPTIONS,
  SURVEY_Q5_OPTIONS,
  SurveyQ1Value,
  SurveyQ2Value,
  SurveyQ3Value,
  SurveyQ4Value,
  SurveyQ5Value,
  buildPartnerSurveyInsertPayload,
  mapSupabaseWriteError,
  validatePartnerSurveyAnswers,
} from "@/lib/partnerRecruitment";

export interface SurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId?: string | null;
  basicInfo?: PartnerApplicationForm;
  onComplete?: () => void;
}

const SurveyDialog = ({
  open,
  onOpenChange,
  applicationId,
  basicInfo,
  onComplete,
}: SurveyDialogProps) => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<PartnerSurveyAnswers>(INITIAL_PARTNER_SURVEY_ANSWERS);
  const [submitted, setSubmitted] = useState(false);

  const handleQ2Toggle = (value: SurveyQ2Value) => {
    setAnswers((prev) => {
      const current = prev.q2;

      // "특별히 없음"은 단독 선택만 허용
      if (value === "특별히 없음") {
        return {
          ...prev,
          q2: current.includes("특별히 없음") ? [] : ["특별히 없음"],
        };
      }

      // 다른 항목을 누르면 "특별히 없음" 제거
      let next = current.filter((v) => v !== "특별히 없음");

      // 이미 선택된 항목이면 해제
      if (next.includes(value)) {
        next = next.filter((v) => v !== value);
        return { ...prev, q2: next };
      }

      // 최대 2개 선택 제한
      if (next.length >= 2) {
        toast.error("최대 2개까지만 선택할 수 있습니다.");
        return prev;
      }

      return {
        ...prev,
        q2: [...next, value],
      };
    });
  };

  const canNext = () => {
    if (step === 0) return !!answers.q1;
    if (step === 1) return answers.q2.length > 0;
    if (step === 2) return !!answers.q3;
    if (step === 3) return !!answers.q4;
    if (step === 4) return !!answers.q5;
    if (step === 5) return true;
    return false;
  };

  const submitSurvey = async () => {
    if (!applicationId) {
      toast.error("신청 정보가 먼저 접수되어야 설문을 저장할 수 있습니다.");
      return;
    }

    const validatedAnswers = validatePartnerSurveyAnswers(answers);
    if (!validatedAnswers.ok) {
      toast.error(validatedAnswers.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("partner_surveys")
        .insert([buildPartnerSurveyInsertPayload(applicationId, validatedAnswers.value)]);

      if (error) {
        console.error("Survey Insert Error:", error);
        throw error;
      }

      toast.success("설문에 참여해 주셔서 감사합니다!");
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Survey submission failed:", err);
      toast.error(mapSupabaseWriteError(err, "설문 응답"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (isSubmitting) return;

    if (step < 5) {
      setStep((prev) => prev + 1);
      return;
    }

    submitSurvey();
  };

  const handleClose = () => {
    if (isSubmitting) return;

    onOpenChange(false);

    setTimeout(() => {
      setStep(0);
      setSubmitted(false);
      setAnswers(INITIAL_PARTNER_SURVEY_ANSWERS);
      if (submitted && onComplete) onComplete();
    }, 300);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center py-8 text-center gap-4">
            <CheckCircle className="h-16 w-16 text-primary" />
            <DialogTitle className="text-2xl font-bold">감사합니다!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg mt-2">
              소중한 의견을 반영하여 곧 연락드리겠습니다.
            </DialogDescription>
            <button
              onClick={handleClose}
              className="mt-4 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              닫기
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            사장님이 <KelloText />에 바라는 서비스
          </DialogTitle>
          <DialogDescription>
            간단한 설문에 답해주시면 더 나은 서비스를 만드는 데 큰 도움이 됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-1 mb-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"
                }`}
            />
          ))}
        </div>

        <div className="py-2 space-y-4 min-h-[200px]">
          {step === 0 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                1. 현재 외국인 고객 비중은 어느 정도입니까?
              </p>
              <RadioGroup
                value={answers.q1}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, q1: v as SurveyQ1Value }))
                }
              >
                {SURVEY_Q1_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} id={`q1-${opt.value}`} />
                    <Label
                      htmlFor={`q1-${opt.value}`}
                      className="cursor-pointer flex-1 text-sm"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                2. 외국인 고객 응대 시 가장 어려운 점은? (최대 2개)
              </p>
              {SURVEY_Q2_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={`q2-${opt.value}`}
                    checked={answers.q2.includes(opt.value)}
                    onCheckedChange={() => handleQ2Toggle(opt.value)}
                  />
                  <Label
                    htmlFor={`q2-${opt.value}`}
                    className="cursor-pointer flex-1 text-sm"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                3. 현재 외국인 고객은 주로 어떻게 유입됩니까?
              </p>
              <RadioGroup
                value={answers.q3}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, q3: v as SurveyQ3Value }))
                }
              >
                {SURVEY_Q3_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} id={`q3-${opt.value}`} />
                    <Label
                      htmlFor={`q3-${opt.value}`}
                      className="cursor-pointer flex-1 text-sm"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                4. 외국인 고객 확대를 위해 가장 필요한 것은?
              </p>
              <RadioGroup
                value={answers.q4}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, q4: v as SurveyQ4Value }))
                }
              >
                {SURVEY_Q4_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} id={`q4-${opt.value}`} />
                    <Label
                      htmlFor={`q4-${opt.value}`}
                      className="cursor-pointer flex-1 text-sm"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                5. 제휴 플랫폼을 선택할 때 가장 중요하게 생각하시는 기준은?
              </p>
              <RadioGroup
                value={answers.q5}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, q5: v as SurveyQ5Value }))
                }
              >
                {SURVEY_Q5_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={opt.value} id={`q5-${opt.value}`} />
                    <Label
                      htmlFor={`q5-${opt.value}`}
                      className="cursor-pointer flex-1 text-sm"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <p className="font-semibold text-sm">
                6. 외국인 고객 응대 경험 중 가장 기억에 남는 불편 사례는?
              </p>
              <Textarea
                placeholder="자유롭게 작성해주세요 (선택사항)"
                value={answers.q6}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, q6: e.target.value }))
                }
                className="min-h-[120px] rounded-xl text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              disabled={isSubmitting}
              className="flex-1 border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted/50 transition-colors text-sm disabled:opacity-40"
            >
              이전
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canNext() || isSubmitting}
            className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : step < 5 ? (
              "다음"
            ) : (
              <>
                <Send className="h-4 w-4" />
                제출하기
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyDialog;
