# TOHFA_dev_pack_v2_8 — Alerts (Prometheus+Slack) + KPI Windows + Top PDF + Feature Flags

## الجديد في v2.8
- **تنبيهات Prometheus**: 5xx > 5% (5m) + **P95 latency** > 500ms (10m) — في `ops/prometheus/alerts.rules.yml`.
- **Alertmanager ↔ Slack**: قالب تكوين `ops/alertmanager/alertmanager.yml` (قناة #alerts، webhook من البيئة).
- **KPIs زمنية**: `/admin/metrics/windows` + بطاقات 5m/1h/24h على `/admin/dashboard`.
- **Top PDF** (المنتجات/المبدعين): `/admin/reports/top.pdf?days=30&limit=10` (Puppeteer).
- **Feature Flags**: محمل JSON/ENV + API `/admin/flags` و `/admin/flags/check?k=...` + **hook** على الويب.

## ربط سريع
1) **Prometheus + Alertmanager**
   - ضِف `ops/prometheus/alerts.rules.yml` إلى `rule_files` في prometheus.yml.
   - شغّل Alertmanager واتركه يقرأ `ops/alertmanager/alertmanager.yml`.
   - وفّر البيئة: `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...`

2) **API**
   - أضِف الكنترولرز/الخدمات:  
     `AdminMetricsWindowsController`, `TopReportPdfController`, `FlagsService`, `FlagsController`.
   - بيئة:
     ```
     FEATURE_FLAGS_FILE=ops/flags.json
     # أو
     FEATURE_FLAGS={"ui.new_dashboard":true}
     ```

3) **Web**
   - استخدم `useFlag('ui.new_dashboard')` لتفعيل/تعطيل الواجهات التجريبية.

## ملاحظات
- قاعدة تعبير 5xx والكمون P95 مستمدة من أفضل الممارسات (rate() + histogram_quantile). راجع المراجع في التوثيق.
- Puppeteer يستخدم `--no-sandbox` في الحاويات. وإذا رغبت ألوان شاشة كاملة: `page.emulateMediaType('screen')` قبل `page.pdf()`.

— Built at: 2025-11-08T19:58:51.204874Z
