
insert into museums (id, name, region) values
  ('00000000-0000-0000-0000-000000000001','متحف التحف السعودية','الرياض')
on conflict do nothing;

insert into sellers (id, display_name, verified) values
  ('00000000-0000-0000-0000-000000000011','حِرفي نجد', true)
on conflict do nothing;

insert into assets (id,title,description,seller_id,museum_id,price_sar,media_url,glb_url)
values
 ('TUHFA-0001','سدو نجدي','منسوج يدويًا بخيوط الصوف','00000000-0000-0000-0000-000000000011','00000000-0000-0000-0000-000000000001', 950.00,
  'https://example.com/sadu.jpg','https://example.com/sadu.glb')
on conflict do nothing;

insert into daily_metrics (day, sales_count, revenue_sar, visitors)
select d::date, (random()*50)::int, (random()*3000)::int, (random()*600)::int
from generate_series(current_date-13, current_date, interval '1 day') as s(d)
on conflict do nothing;
