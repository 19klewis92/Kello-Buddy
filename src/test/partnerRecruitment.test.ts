import { describe, expect, it } from "vitest";
import {
  INITIAL_PARTNER_APPLICATION_FORM,
  INITIAL_PARTNER_SURVEY_ANSWERS,
  buildPartnerApplicationInsertPayload,
  buildPartnerSurveyInsertPayload,
  mapSupabaseWriteError,
  validatePartnerApplicationForm,
  validatePartnerSurveyAnswers,
} from "@/lib/partnerRecruitment";

describe("partner recruitment helpers", () => {
  it("validates and normalizes a partner application", () => {
    const result = validatePartnerApplicationForm({
      ...INITIAL_PARTNER_APPLICATION_FORM,
      businessName: "  서울 뷰티 살롱  ",
      region: "서울",
      category: "헤어",
      contact: "010-1234-5678",
      email: " Hello@Kello.kr ",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.value).toEqual({
      companyName: "서울 뷰티 살롱",
      region: "서울",
      businessType: "헤어",
      phone: "010-1234-5678",
      phoneNormalized: "01012345678",
      email: "Hello@Kello.kr",
      emailNormalized: "hello@kello.kr",
    });
  });

  it("rejects an invalid phone number", () => {
    const result = validatePartnerApplicationForm({
      ...INITIAL_PARTNER_APPLICATION_FORM,
      businessName: "서울 뷰티 살롱",
      region: "서울",
      category: "헤어",
      contact: "010",
      email: "hello@kello.kr",
    });

    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ message: "전화번호를 다시 확인해주세요." });
  });

  it("builds the application insert payload with normalized fields", () => {
    const validated = validatePartnerApplicationForm({
      businessName: "서울 뷰티 살롱",
      region: "서울",
      category: "헤어",
      contact: "010-1234-5678",
      email: "hello@kello.kr",
    });

    expect(validated.ok).toBe(true);
    if (!validated.ok) {
      return;
    }

    expect(buildPartnerApplicationInsertPayload("app-1", validated.value)).toEqual({
      id: "app-1",
      company_name: "서울 뷰티 살롱",
      region: "서울",
      business_type: "헤어",
      phone: "010-1234-5678",
      phone_normalized: "01012345678",
      email: "hello@kello.kr",
      email_normalized: "hello@kello.kr",
      source: "landing_page_cta",
    });
  });

  it("validates partner survey answers and keeps readable text values", () => {
    const validated = validatePartnerSurveyAnswers({
      ...INITIAL_PARTNER_SURVEY_ANSWERS,
      q1: "거의 없음 (월 1~2명 이하)",
      q2: ["언어 소통 문제", "가격 설명의 어려움"],
      q3: "SNS 검색",
      q4: "다국어 예약 시스템",
      q5: "합리적인 수수료",
      q6: "  가격 안내가 가장 어렵습니다.  ",
    });

    expect(validated.ok).toBe(true);
    if (!validated.ok) {
      return;
    }

    expect(buildPartnerSurveyInsertPayload("app-1", validated.value)).toEqual({
      application_id: "app-1",
      q1_foreigner_ratio: "거의 없음 (월 1~2명 이하)",
      q2_difficulties: ["언어 소통 문제", "가격 설명의 어려움"],
      q3_inflow_path: "SNS 검색",
      q4_needed_for_expansion: "다국어 예약 시스템",
      q5_selection_criteria: "합리적인 수수료",
      q6_bad_case_memo: "가격 안내가 가장 어렵습니다.",
    });
  });

  it("maps missing table errors into a clear Korean message", () => {
    const message = mapSupabaseWriteError(
      {
        code: "42P01",
        message: "Could not find the table 'public.partner_applications' in the schema cache",
      },
      "신청 정보",
    );

    expect(message).toContain("Supabase 테이블이 아직 준비되지 않았습니다.");
  });
});
