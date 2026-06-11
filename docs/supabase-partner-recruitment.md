# Kello Supabase 제휴업체 모집 설정

## 목적

이 설정은 `Kello Buddy` 랜딩 페이지에서 아래 흐름이 실제로 저장되도록 맞춘 것입니다.

- 제휴업체 신청 저장
- 후속 설문 저장
- 매장 프로필 저장
- 매장 이미지 업로드

## Supabase에서 보기 쉬운 위치

Supabase Studio에서 아래 뷰를 보면 한글 컬럼명으로 정리된 데이터를 쉽게 볼 수 있습니다.

- `partner_applications_admin_kr`
- `partner_surveys_admin_kr`
- `partner_recruitment_overview_kr`

## 원격 프로젝트에 적용하는 순서

1. Supabase 로그인

```bash
supabase login
```

2. 현재 프로젝트 연결

```bash
supabase link --project-ref emyseeqzqylytrciivxw
```

3. 마이그레이션 적용

```bash
supabase db push
```

## 적용 후 확인할 것

### 테이블

- `partner_applications`
- `partner_surveys`
- `partner_shops`

### 뷰

- `partner_applications_admin_kr`
- `partner_surveys_admin_kr`
- `partner_recruitment_overview_kr`

### 스토리지

- 버킷 이름: `kello_assets`

## 프런트엔드에서 필요한 공개 환경 변수

`.env.local`

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

`SUPABASE_SERVICE_ROLE_KEY`는 브라우저에서 쓰는 프런트 저장소에 오래 두지 않는 것을 권장합니다.
