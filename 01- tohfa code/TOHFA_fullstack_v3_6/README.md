
# TOHFA v3.6 — Full Scaffold (API + AI + Web + pgvector)

## المكوّنات
- **PostgreSQL + pgvector** (Docker): تخزين المنتجات والمتجهات.
- **API** (Node/Express): مسارات المنتجات، البحث الدلالي، Web3/NFC، PDPL placeholders.
- **AI** (FastAPI + SentenceTransformers): `/embed` يرجع متجه 384-d.
- **Web** (Next 14 RTL): تهيئة القاعدة + بحث "قطع مشابهة".

## التشغيل المختصر
1) قاعدة البيانات:
```bash
docker compose up -d
```

2) API:
```bash
cd apps/api
cp .env.example .env
npm i
npm run dev
# http://localhost:3001
```

3) AI:
```bash
cd ../ai
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py
# http://localhost:8079
```

4) تهيئة الجداول + بيانات:
```bash
# من واجهة الويب:
# http://localhost:3000/admin/setup  ← أنشئ الامتداد والجداول

# أو من سكربتات:
cd ../../scripts
cp .env.example .env
npm i
npm run seed
npm run embed
```

5) Web:
```bash
cd ../web
echo "NEXT_PUBLIC_API_BASE=http://localhost:3001" > .env.local
npm i
npm run dev
# http://localhost:3000
```

## نقاط امتثال/معايير
- **PDPL**: احترم الحقوق (الوصول/الحذف/التصدير) عبر `/api/pdpl/*` ثم اربطها بقناة معالجة داخلية.
- **Web NFC**: استخدام `NDEFReader.write/scan` في واجهات الإدارة.
- **EIP-712**: توليد/التحقق لتوقيع نوايا الشراء.
- **pgvector**: بحث متجهات (cosine) عبر `<->`/`<=>`.

Build time: 2025-11-08T20:33:08.581362Z
