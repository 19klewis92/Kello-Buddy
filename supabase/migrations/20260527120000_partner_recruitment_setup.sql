create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  company_name text not null check (char_length(trim(company_name)) >= 2),
  region text not null check (
    region in ('서울', '부산', '제주', '대구', '인천', '경기', '기타')
  ),
  business_type text not null check (
    business_type in ('헤어', '피부', '메이크업', '네일/속눈썹/왁싱', '바디/체형관리')
  ),
  phone text not null,
  phone_normalized text not null check (char_length(phone_normalized) between 9 and 11),
  email text not null,
  email_normalized text not null,
  source text not null default 'landing_page_cta',
  application_status text not null default '신규' check (
    application_status in ('신규', '연락완료', '검토중', '보류', '온보딩완료')
  ),
  admin_memo text,
  survey_completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists partner_applications_phone_normalized_key
  on public.partner_applications (phone_normalized);

create index if not exists partner_applications_created_at_idx
  on public.partner_applications (created_at desc);

drop trigger if exists set_partner_applications_updated_at on public.partner_applications;
create trigger set_partner_applications_updated_at
before update on public.partner_applications
for each row
execute function public.set_updated_at();

create table if not exists public.partner_surveys (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.partner_applications(id) on delete cascade,
  q1_foreigner_ratio text not null check (
    q1_foreigner_ratio in (
      '거의 없음 (월 1~2명 이하)',
      '가끔 있음 (월 3~10명)',
      '꾸준히 있음 (월 10~30명)',
      '매우 많음 (월 30명 이상)'
    )
  ),
  q2_difficulties text[] not null check (
    cardinality(q2_difficulties) between 1 and 2
    and q2_difficulties <@ array[
      '언어 소통 문제',
      '예약 관리의 번거로움',
      '가격 설명의 어려움',
      '노쇼(예약 취소) 문제',
      '결제 방식 문제',
      '특별히 없음'
    ]::text[]
    and not ('특별히 없음' = any(q2_difficulties) and cardinality(q2_difficulties) > 1)
  ),
  q3_inflow_path text not null check (
    q3_inflow_path in (
      '워크인(지나가다 방문)',
      'SNS 검색',
      '기존 고객 추천',
      '여행 플랫폼(OTA 등)',
      '거의 유입되지 않음'
    )
  ),
  q4_needed_for_expansion text not null check (
    q4_needed_for_expansion in (
      '다국어 예약 시스템',
      '정찰제 가격 안내',
      '해외 결제 시스템',
      '마케팅·홍보 지원',
      '외국인 고객 관리 지원'
    )
  ),
  q5_selection_criteria text not null check (
    q5_selection_criteria in (
      '합리적인 수수료',
      '우수한 고객 품질 (객단가 등)',
      '예약 및 관리 편의성',
      '외국인 응대 지원 (번역 등)',
      '실제 매출 증대 가능성'
    )
  ),
  q6_bad_case_memo text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists partner_surveys_created_at_idx
  on public.partner_surveys (created_at desc);

create or replace function public.mark_partner_application_survey_completed()
returns trigger
language plpgsql
as $$
begin
  update public.partner_applications
     set survey_completed_at = timezone('utc', now())
   where id = new.application_id;

  return new;
end;
$$;

drop trigger if exists mark_partner_application_survey_completed on public.partner_surveys;
create trigger mark_partner_application_survey_completed
after insert on public.partner_surveys
for each row
execute function public.mark_partner_application_survey_completed();

create table if not exists public.partner_shops (
  user_id uuid primary key references auth.users(id) on delete cascade,
  shop_name text not null,
  address text not null,
  phone text not null,
  menu_price text not null,
  image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_partner_shops_updated_at on public.partner_shops;
create trigger set_partner_shops_updated_at
before update on public.partner_shops
for each row
execute function public.set_updated_at();

comment on table public.partner_applications is '제휴업체 모집 신청서';
comment on column public.partner_applications.company_name is '업체명';
comment on column public.partner_applications.region is '지역';
comment on column public.partner_applications.business_type is '업종 카테고리';
comment on column public.partner_applications.phone is '전화번호';
comment on column public.partner_applications.email is '이메일';
comment on column public.partner_applications.source is '유입 경로';
comment on column public.partner_applications.application_status is '진행 상태';
comment on column public.partner_applications.admin_memo is '관리 메모';

comment on table public.partner_surveys is '제휴업체 모집 후속 설문';
comment on column public.partner_surveys.q1_foreigner_ratio is '현재 외국인 고객 비중';
comment on column public.partner_surveys.q2_difficulties is '응대 시 가장 어려운 점';
comment on column public.partner_surveys.q3_inflow_path is '현재 외국인 고객 유입 경로';
comment on column public.partner_surveys.q4_needed_for_expansion is '확대를 위해 가장 필요한 것';
comment on column public.partner_surveys.q5_selection_criteria is '제휴 플랫폼 선택 기준';
comment on column public.partner_surveys.q6_bad_case_memo is '불편 사례 메모';

comment on table public.partner_shops is '파트너 매장 프로필';

create or replace view public.partner_applications_admin_kr as
select
  pa.company_name as "업체명",
  pa.region as "지역",
  pa.business_type as "업종카테고리",
  pa.phone as "전화번호",
  pa.email as "이메일",
  pa.source as "유입경로",
  pa.application_status as "진행상태",
  case when pa.survey_completed_at is null then '미완료' else '완료' end as "설문완료여부",
  to_char(pa.created_at at time zone 'Asia/Seoul', 'YYYY-MM-DD HH24:MI') as "신청일시(한국)",
  pa.admin_memo as "관리메모",
  pa.id as "신청ID"
from public.partner_applications pa;

create or replace view public.partner_surveys_admin_kr as
select
  pa.company_name as "업체명",
  pa.region as "지역",
  pa.business_type as "업종카테고리",
  pa.phone as "전화번호",
  pa.email as "이메일",
  ps.q1_foreigner_ratio as "외국인고객비중",
  array_to_string(ps.q2_difficulties, ' / ') as "응대시어려움",
  ps.q3_inflow_path as "현재유입경로",
  ps.q4_needed_for_expansion as "확대에필요한것",
  ps.q5_selection_criteria as "플랫폼선택기준",
  coalesce(ps.q6_bad_case_memo, '') as "불편사례메모",
  to_char(ps.created_at at time zone 'Asia/Seoul', 'YYYY-MM-DD HH24:MI') as "설문일시(한국)",
  ps.id as "설문ID",
  ps.application_id as "신청ID"
from public.partner_surveys ps
join public.partner_applications pa
  on pa.id = ps.application_id;

create or replace view public.partner_recruitment_overview_kr as
select
  pa.company_name as "업체명",
  pa.region as "지역",
  pa.business_type as "업종카테고리",
  pa.phone as "전화번호",
  pa.email as "이메일",
  pa.source as "유입경로",
  pa.application_status as "진행상태",
  case when ps.id is null then '미완료' else '완료' end as "설문상태",
  coalesce(array_to_string(ps.q2_difficulties, ' / '), '') as "응대시어려움",
  coalesce(ps.q4_needed_for_expansion, '') as "가장필요한지원",
  to_char(pa.created_at at time zone 'Asia/Seoul', 'YYYY-MM-DD HH24:MI') as "신청일시(한국)",
  pa.id as "신청ID"
from public.partner_applications pa
left join public.partner_surveys ps
  on ps.application_id = pa.id;

grant usage on schema public to anon, authenticated, service_role;

revoke all on public.partner_applications from anon, authenticated;
revoke all on public.partner_surveys from anon, authenticated;
revoke all on public.partner_shops from anon;

grant insert on public.partner_applications to anon, authenticated;
grant insert on public.partner_surveys to anon, authenticated;
grant select, insert, update on public.partner_shops to authenticated;

grant select on public.partner_applications_admin_kr to authenticated, service_role;
grant select on public.partner_surveys_admin_kr to authenticated, service_role;
grant select on public.partner_recruitment_overview_kr to authenticated, service_role;

alter table public.partner_applications enable row level security;
alter table public.partner_surveys enable row level security;
alter table public.partner_shops enable row level security;

drop policy if exists "Public can insert partner applications" on public.partner_applications;
create policy "Public can insert partner applications"
on public.partner_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can insert partner surveys" on public.partner_surveys;
create policy "Public can insert partner surveys"
on public.partner_surveys
for insert
to anon, authenticated
with check (true);

drop policy if exists "Users can view own partner shop" on public.partner_shops;
create policy "Users can view own partner shop"
on public.partner_shops
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own partner shop" on public.partner_shops;
create policy "Users can insert own partner shop"
on public.partner_shops
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own partner shop" on public.partner_shops;
create policy "Users can update own partner shop"
on public.partner_shops
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kello_assets',
  'kello_assets',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Authenticated users can upload own shop images" on storage.objects;
create policy "Authenticated users can upload own shop images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'kello_assets'
  and (storage.foldername(name))[1] = 'shop_images'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "Authenticated users can update own shop images" on storage.objects;
create policy "Authenticated users can update own shop images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'kello_assets'
  and (storage.foldername(name))[1] = 'shop_images'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'kello_assets'
  and (storage.foldername(name))[1] = 'shop_images'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "Authenticated users can delete own shop images" on storage.objects;
create policy "Authenticated users can delete own shop images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'kello_assets'
  and (storage.foldername(name))[1] = 'shop_images'
  and (storage.foldername(name))[2] = auth.uid()::text
);
