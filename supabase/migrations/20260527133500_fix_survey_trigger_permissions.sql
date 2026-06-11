create or replace function public.mark_partner_application_survey_completed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.partner_applications
     set survey_completed_at = timezone('utc', now())
   where id = new.application_id;

  return new;
end;
$$;
