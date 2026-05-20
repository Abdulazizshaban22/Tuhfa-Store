# TOHFA — Best App in the World Playbook
Generated: 2025-10-21 08:59

## 0. الرؤية
تحفة تصبح التطبيق الثقافي–التجاري الأكثر جودة وتأثيرًا عالميًا: تجربة فاخرة، ذكية، آمنة، وسريعة لكل مستخدم.

## 1. مبادئ المنتج
- **Zero Friction**: تسجيل دخول اختياري، شراء بضغطة، حفظ العنوان تلقائيًا (SPL).
- **Delight + Trust**: رسوميات أنيقة، ردود فعل فورية، شفافية في الشحن والرسوم.
- **Saudi‑first, Global‑ready**: RTL ممتاز، توطين كامل، عملات متعددة لاحقًا.
- **Offline‑first** في التطبيق، **Realtime‑first** في الويب (Streaming + hydration minimization).

## 2. تجربة المستخدم (UX)
- تنقّل سهل، بطاقات منتجات فاخرة، صور كبيرة، AR Quick Look على iOS، 3D Viewer للويب.
- ودجت "الملكية الرقمية" يوضح المالك، السجل، والسكّ على Polygon.
- صفحة الحرفي كـ "مجلة": قصة، فيديو قصير، منتجات، شارة أصالة (C2PA/NFT).

## 3. الوصولية (Accessibility) — WCAG 2.2 AA
- تباين ≥ 4.5:1 للأجسام النصية.
- دعم Screen Readers: ملصقات ARIA ووصف بديل للصور.
- التنقّل بلوحة المفاتيح (Web) والإيماءات الواضحة (Mobile).
- لغة: `lang="ar"` + `dir="rtl"` والتبديل الفوري للغات.

## 4. الأداء (Performance Budgets)
- **Web**: LCP ≤ **1.8s** (p75 على 4G), CLS ≤ 0.05, INP ≤ 200ms, TTFB ≤ 200ms.
- **Mobile**: وقت الإقلاع البارد ≤ 1.5s بعد شاشة Splash، حجم الحزمة ≤ 20MB (أول نسخة).
- صور: AVIF/WebP، غالبًا ≤ 200KB لكل صورة بطل، Lazy + Priority للحرجة.
- Prefetching/Partial Hydration/RSC، Edge Caching للصفحات العامة.

## 5. القياس (Analytics & North Star)
- **North Star**: معدل اقتناء التحف ذات "رحلة رقمية" مكتملة (شراء + NFT + تأكيد شحن).
- **أحداث أساسية**: `product_view`, `add_to_cart`, `checkout_started`, `payment_succeeded`, `nft_minted`, `spl_validated`.
- Cohorts: ذوق ثقافي/منطقة/حرفة.

## 6. الذكاء الاصطناعي (AI)
- Embeddings (MiniLM/CLIP) → pgvector (HNSW) للتوصيات.
- AI Curator: ترتيب معارض تلقائيًا + قصص صوتية قصيرة.
- AIMS/PDPL: شرح النموذج، تحكّم بالبيانات، زر "حذف بياناتي".

## 7. الأمان والخصوصية (PDPL + أمن)
- تصنيف البيانات (PII/Payment/NFT). تشفير at‑rest (RDS, S3) وin‑transit (TLS 1.2+).
- سياسة احتفاظ: أوامر 7 سنوات (ضريبية)، سجلات NFT دائمة، بيانات تتبّع 12 شهرًا.
- Incident: إخطار SDAIA خلال 72h + سجل أدلة.

## 8. الموثوقية (SRE)
- **SLOs**: توافر API 99.95% شهريًا، زمن استجابة p95 ≤ 300ms، أخطاء 5xx ≤ 0.2%.
- Error Budget Policy: عند الاستنزاف — تجميد الإصدارات غير الحرجة والبدء بمعالجة الأداء.
- مراقبة: Grafana/Loki/Prometheus + Alarms مخصّصة (p95, error rate, queue lag).

## 9. النمو (Growth)
- SEO (Structured Data) + قصص الحرفيين (فيديو قصير) + نظام ولاء رمزي (TOHFA Points).
- Referral: روابط إحالة، مكافآت للشراء الأول.
- B2B: قنوات للفنادق والمتاحف والموزعين.

## 10. خارطة طريق 90 يومًا
- أسبوع 1–2: تحسين LCP/INP + إدخال Analytics Schema.
- أسبوع 3–4: Tap SDK أصلي في التطبيق + SPL إنتاجي.
- أسبوع 5–6: AI Recs v1 + IIIF داخل التطبيق.
- أسبوع 7–8: NFT Ownership v2 + Dashboard الحرفي.
- أسبوع 9–10: Loyalty + Referral.
- أسبوع 11–12: Metaverse Gallery Promo + حملات PR.
