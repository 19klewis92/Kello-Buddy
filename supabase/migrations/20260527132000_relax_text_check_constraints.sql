alter table public.partner_applications
  drop constraint if exists partner_applications_region_check,
  drop constraint if exists partner_applications_business_type_check;

alter table public.partner_surveys
  drop constraint if exists partner_surveys_q1_foreigner_ratio_check,
  drop constraint if exists partner_surveys_q2_difficulties_check,
  drop constraint if exists partner_surveys_q3_inflow_path_check,
  drop constraint if exists partner_surveys_q4_needed_for_expansion_check,
  drop constraint if exists partner_surveys_q5_selection_criteria_check;

alter table public.partner_surveys
  add constraint partner_surveys_q2_difficulties_count_check
  check (cardinality(q2_difficulties) between 1 and 2);
