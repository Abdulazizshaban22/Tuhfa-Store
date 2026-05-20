# Prisma Seed — TOHFA KSA

**تاريخ:** 2025-10-21

## المتطلبات
- Prisma + @prisma/client
- Typescript + ts-node
- csv-parse/sync
- قاعدة PostgreSQL و `.env` مضبوط (DATABASE_URL)

## التثبيت
```bash
npm i -D typescript ts-node csv-parse
npm i @prisma/client prisma
npx prisma generate
```

## تشغيل الـSeed
1) فك ضغط **TOHFA_KSA_Seed_v1.zip** وضع الـCSVs في `./seeds/ksa/` داخل مشروعك *(أو عيّن متغير البيئة SEED_DIR)*.
2) نفّذ:
```bash
export SEED_DIR=./seeds/ksa
npx prisma db push   # أو migrate
node --loader ts-node/esm prisma/seed.ts
# أو:
# npx ts-node prisma/seed.ts
```
> إذا كان الـschema يستخدم أسماء مختلفة للموديلات/الحقول، عدّل المابينغ داخل `seed.ts` (دوال seed*).

## ملاحظات
- السكربت يستخدم upsert لعدم تكرار الإدخالات (externalId/code كمفاتيح).
- يدعم ربط المنتجات بالحرفي + نوع الحرفة + (اختياري) المعرض.
- الورش تدعم مستضيف حرفي أو معرض (host_type).
