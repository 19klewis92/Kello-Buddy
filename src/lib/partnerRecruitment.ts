export const PARTNER_REGIONS = [
  "서울",
  "부산",
  "제주",
  "대구",
  "인천",
  "경기",
  "기타",
] as const;

export const PARTNER_CATEGORIES = [
  "헤어",
  "피부",
  "메이크업",
  "네일/속눈썹/왁싱",
  "바디/체형관리",
] as const;

export const SURVEY_Q1_OPTIONS = [
  { label: "거의 없음 (월 1~2명 이하)", value: "거의 없음 (월 1~2명 이하)" },
  { label: "가끔 있음 (월 3~10명)", value: "가끔 있음 (월 3~10명)" },
  { label: "꾸준히 있음 (월 10~30명)", value: "꾸준히 있음 (월 10~30명)" },
  { label: "매우 많음 (월 30명 이상)", value: "매우 많음 (월 30명 이상)" },
] as const;

export const SURVEY_Q2_OPTIONS = [
  { label: "언어 소통 문제", value: "언어 소통 문제" },
  { label: "예약 관리의 번거로움", value: "예약 관리의 번거로움" },
  { label: "가격 설명의 어려움", value: "가격 설명의 어려움" },
  { label: "노쇼(예약 취소) 문제", value: "노쇼(예약 취소) 문제" },
  { label: "결제 방식 문제", value: "결제 방식 문제" },
  { label: "특별히 없음", value: "특별히 없음" },
] as const;

export const SURVEY_Q3_OPTIONS = [
  { label: "워크인(지나가다 방문)", value: "워크인(지나가다 방문)" },
  { label: "SNS 검색", value: "SNS 검색" },
  { label: "기존 고객 추천", value: "기존 고객 추천" },
  { label: "여행 플랫폼(OTA 등)", value: "여행 플랫폼(OTA 등)" },
  { label: "거의 유입되지 않음", value: "거의 유입되지 않음" },
] as const;

export const SURVEY_Q4_OPTIONS = [
  { label: "다국어 예약 시스템", value: "다국어 예약 시스템" },
  { label: "정찰제 가격 안내", value: "정찰제 가격 안내" },
  { label: "해외 결제 시스템", value: "해외 결제 시스템" },
  { label: "마케팅·홍보 지원", value: "마케팅·홍보 지원" },
  { label: "외국인 고객 관리 지원", value: "외국인 고객 관리 지원" },
] as const;

export const SURVEY_Q5_OPTIONS = [
  { label: "합리적인 수수료", value: "합리적인 수수료" },
  { label: "우수한 고객 품질 (객단가 등)", value: "우수한 고객 품질 (객단가 등)" },
  { label: "예약 및 관리 편의성", value: "예약 및 관리 편의성" },
  { label: "외국인 응대 지원 (번역 등)", value: "외국인 응대 지원 (번역 등)" },
  { label: "실제 매출 증대 가능성", value: "실제 매출 증대 가능성" },
] as const;

export type PartnerRegion = (typeof PARTNER_REGIONS)[number];
export type PartnerCategory = (typeof PARTNER_CATEGORIES)[number];
export type SurveyQ1Value = (typeof SURVEY_Q1_OPTIONS)[number]["value"];
export type SurveyQ2Value = (typeof SURVEY_Q2_OPTIONS)[number]["value"];
export type SurveyQ3Value = (typeof SURVEY_Q3_OPTIONS)[number]["value"];
export type SurveyQ4Value = (typeof SURVEY_Q4_OPTIONS)[number]["value"];
export type SurveyQ5Value = (typeof SURVEY_Q5_OPTIONS)[number]["value"];

export type PartnerApplicationForm = {
  businessName: string;
  region: string;
  category: string;
  contact: string;
  email: string;
};

export type PartnerSurveyAnswers = {
  q1: SurveyQ1Value | "";
  q2: SurveyQ2Value[];
  q3: SurveyQ3Value | "";
  q4: SurveyQ4Value | "";
  q5: SurveyQ5Value | "";
  q6: string;
};

export type ValidatedPartnerApplication = {
  companyName: string;
  region: string;
  businessType: string;
  phone: string;
  phoneNormalized: string;
  email: string;
  emailNormalized: string;
};

export type ValidatedPartnerSurveyAnswers = {
  q1: SurveyQ1Value;
  q2: SurveyQ2Value[];
  q3: SurveyQ3Value;
  q4: SurveyQ4Value;
  q5: SurveyQ5Value;
  q6: string | null;
};

export type DatabaseErrorLike = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

export const INITIAL_PARTNER_APPLICATION_FORM: PartnerApplicationForm = {
  businessName: "",
  region: "",
  category: "",
  contact: "",
  email: "",
};

export const INITIAL_PARTNER_SURVEY_ANSWERS: PartnerSurveyAnswers = {
  q1: "",
  q2: [],
  q3: "",
  q4: "",
  q5: "",
  q6: "",
};

const ALLOWED_Q1 = new Set<string>(SURVEY_Q1_OPTIONS.map((option) => option.value));
const ALLOWED_Q2 = new Set<string>(SURVEY_Q2_OPTIONS.map((option) => option.value));
const ALLOWED_Q3 = new Set<string>(SURVEY_Q3_OPTIONS.map((option) => option.value));
const ALLOWED_Q4 = new Set<string>(SURVEY_Q4_OPTIONS.map((option) => option.value));
const ALLOWED_Q5 = new Set<string>(SURVEY_Q5_OPTIONS.map((option) => option.value));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(rawPhone: string) {
  return rawPhone.replace(/\D/g, "");
}

export function normalizeEmail(rawEmail: string) {
  return rawEmail.trim().toLowerCase();
}

export function createApplicationId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function validatePartnerApplicationForm(form: PartnerApplicationForm) {
  const businessName = form.businessName.trim();
  const region = form.region.trim();
  const category = form.category.trim();
  const phone = form.contact.trim();
  const phoneNormalized = normalizePhone(phone);
  const email = form.email.trim();
  const emailNormalized = normalizeEmail(email);

  if (businessName.length < 2) {
    return { ok: false as const, message: "업체명을 2자 이상 입력해주세요." };
  }

  if (!PARTNER_REGIONS.includes(region as PartnerRegion)) {
    return { ok: false as const, message: "지역을 목록에서 선택해주세요." };
  }

  if (!PARTNER_CATEGORIES.includes(category as PartnerCategory)) {
    return { ok: false as const, message: "업종 카테고리를 목록에서 선택해주세요." };
  }

  if (phoneNormalized.length < 9 || phoneNormalized.length > 11) {
    return { ok: false as const, message: "전화번호를 다시 확인해주세요." };
  }

  if (!EMAIL_REGEX.test(emailNormalized)) {
    return { ok: false as const, message: "이메일 주소 형식이 올바르지 않습니다." };
  }

  return {
    ok: true as const,
    value: {
      companyName: businessName,
      region,
      businessType: category,
      phone,
      phoneNormalized,
      email,
      emailNormalized,
    },
  };
}

export function validatePartnerSurveyAnswers(answers: PartnerSurveyAnswers) {
  if (!answers.q1 || !ALLOWED_Q1.has(answers.q1)) {
    return { ok: false as const, message: "Q1 응답을 선택해주세요." };
  }

  if (answers.q2.length < 1 || answers.q2.length > 2) {
    return { ok: false as const, message: "Q2는 1~2개를 선택해주세요." };
  }

  if (!answers.q2.every((value) => ALLOWED_Q2.has(value))) {
    return { ok: false as const, message: "Q2 응답이 올바르지 않습니다." };
  }

  if (!answers.q3 || !ALLOWED_Q3.has(answers.q3)) {
    return { ok: false as const, message: "Q3 응답을 선택해주세요." };
  }

  if (!answers.q4 || !ALLOWED_Q4.has(answers.q4)) {
    return { ok: false as const, message: "Q4 응답을 선택해주세요." };
  }

  if (!answers.q5 || !ALLOWED_Q5.has(answers.q5)) {
    return { ok: false as const, message: "Q5 응답을 선택해주세요." };
  }

  return {
    ok: true as const,
    value: {
      q1: answers.q1,
      q2: answers.q2,
      q3: answers.q3,
      q4: answers.q4,
      q5: answers.q5,
      q6: answers.q6.trim() || null,
    },
  };
}

export function buildPartnerApplicationInsertPayload(
  applicationId: string,
  validatedForm: ValidatedPartnerApplication,
  source = "landing_page_cta",
) {
  return {
    id: applicationId,
    company_name: validatedForm.companyName,
    region: validatedForm.region,
    business_type: validatedForm.businessType,
    phone: validatedForm.phone,
    phone_normalized: validatedForm.phoneNormalized,
    email: validatedForm.email,
    email_normalized: validatedForm.emailNormalized,
    source,
  };
}

export function buildPartnerSurveyInsertPayload(
  applicationId: string,
  validatedAnswers: ValidatedPartnerSurveyAnswers,
) {
  return {
    application_id: applicationId,
    q1_foreigner_ratio: validatedAnswers.q1,
    q2_difficulties: validatedAnswers.q2,
    q3_inflow_path: validatedAnswers.q3,
    q4_needed_for_expansion: validatedAnswers.q4,
    q5_selection_criteria: validatedAnswers.q5,
    q6_bad_case_memo: validatedAnswers.q6,
  };
}

function coerceDatabaseError(error: unknown): DatabaseErrorLike | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const candidate = error as DatabaseErrorLike;
  return {
    code: candidate.code ?? null,
    message: candidate.message ?? null,
    details: candidate.details ?? null,
    hint: candidate.hint ?? null,
  };
}

export function mapSupabaseWriteError(error: unknown, entityLabel: string) {
  const databaseError = coerceDatabaseError(error);

  if (!databaseError) {
    return `${entityLabel} 저장 중 알 수 없는 오류가 발생했습니다.`;
  }

  const combinedMessage = [
    databaseError.code,
    databaseError.message,
    databaseError.details,
    databaseError.hint,
  ]
    .filter(Boolean)
    .join(" ");

  if (databaseError.code === "23505") {
    return `${entityLabel}가 이미 접수되어 있습니다. 중복 여부를 확인해주세요.`;
  }

  if (databaseError.code === "42P01" || /schema cache|Could not find the table/i.test(combinedMessage)) {
    return `${entityLabel} 저장용 Supabase 테이블이 아직 준비되지 않았습니다.`;
  }

  if (databaseError.code === "42501" || /permission|policy|row-level security/i.test(combinedMessage)) {
    return `${entityLabel} 저장 권한이 아직 설정되지 않았습니다.`;
  }

  if (databaseError.code === "23503") {
    return `${entityLabel}와 연결된 신청 정보가 올바르지 않습니다.`;
  }

  return `${entityLabel} 저장 중 오류가 발생했습니다: ${databaseError.message ?? "알 수 없는 오류"}`;
}
