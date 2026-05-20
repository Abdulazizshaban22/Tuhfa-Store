# TOHFA KSA Seed v1
تاريخ الإنشاء: 2025-10-20

## المحتويات
- regions.csv — أقاليم السعودية (رموز وعواصم)
- craft_types.csv — أنواع الحِرف
- artisans.csv — 50 حرفيًا/ـة (بيانات تجريبية)
- products.csv — 200 منتج (جاهز/بالطلب/متحفي)
- exhibits.csv — 10 معارض IIIF (روابط أمثلة عامة — غيّرها لشركائك)
- workshops.csv — 30 ورشة
- passports.csv — جوازات التحف (QR/NFC/C2PA placeholders)

## الاستيراد (اقتراح)
- استورد regions ثم craft_types ثم artisans ثم exhibits ثم products ثم workshops ثم passports.
- إن كنت تستخدم Prisma: أنشئ سكربت seed لقراءة CSVs وإدخالها حسب مخططك.
- غيّر روابط IIIF إلى مسارات شريكك (iiif.tohfa.sa) قبل الإنتاج.

## تنبيهات
- الأسماء والبيانات هنا **تجريبية** ومحايدة — مناسبة للاختبار فقط.
- التواريخ مستقبلية لتسهيل الاختبار.
