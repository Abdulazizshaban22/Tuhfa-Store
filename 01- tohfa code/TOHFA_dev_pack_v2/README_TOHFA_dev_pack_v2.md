# TOHFA_dev_pack_v2 (Auth + Orders + Payments + AI + Prisma Patch + Web stubs)

ضع هذه الملفات داخل مستودعك (نفس المسارات النسبية المقترحة).
ثم:
1) حدّث prisma/schema.prisma بإضافة المحتوى في `apps/api/prisma/schema.patch.prisma` (ادمجه يدويًا).
2) أنشئ مجلد ترحيل: ضع `migration_pgvector.sql` داخل prisma/migrations/20251108_pgvector_init/ ثم `prisma migrate dev`.
3) شغّل seed:
   ```bash
   pnpm prisma db seed --schema=apps/api/prisma/schema.prisma
   ```
4) داخل `apps/api`, ثبّت الحزم:
   ```bash
   pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt node-fetch stripe
   pnpm add -D @types/bcrypt @types/node-fetch
   ```
5) ضف `AuthModule`, `OrdersModule`, `PaymentsModule` إلى `AppModule`.
6) عرّف المتغيّرات في .env.api.local: `JWT_SECRET`, مفاتيح Stripe أو Tap.
7) جرّب التدفق: تسجيل → تسجيل دخول → حفظ JWT → إنشاء أمر → الانتقال لصفحة الدفع.

> ملاحظة: جدول `ProductEmbedding_real` هو الجدول الفعلي من نوع vector(384). يمكن الوصول إليه عبر SQL خام عبر Prisma.$queryRaw.
