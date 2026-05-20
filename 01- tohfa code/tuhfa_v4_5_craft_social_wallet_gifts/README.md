
# Tuhfa v4.5 — Craft Social + Wallet + Corporate Gifts (Build 2025-11-09)

يشمل هذا الإصدار وحدات جديدة فوق v4.4.1:

## 1) Craft Social
- **/social**: خلاصة منشورات + نشر سريع.
- **/api/social/**: مسارات feed/post (قابلة للوصل على DB).
- جداول: `users`, `posts`, `stories` (انظر `db/migrations/001_social.sql`).

## 2) Tuhfa Wallet
- **/wallet**: عرض المقتنيات والشهادات (NFT Certificates).
- **/wallet/sell**: إدراج لإعادة البيع (off-chain أو on-chain).
- **/api/wallet/**: `assets`, `listing`.
- عقد `contracts/TuhfaERC721Royalty.sol` يدعم **EIP-2981** للرويالتي (للإنتاج استخدم OpenZeppelin).

## 3) Corporate Gifts Hub
- **/gifts**: كتالوج وبناء حزمة هدايا مؤسسية.
- **/api/gifts/**: `catalog`, `bundle` (يولّد شهادة **JSON-LD** + رابط QR).
- جداول: `gift_products`, `gift_bundles`.

## 4) NFC / XMP / Certificates
- الشهادة المولدة يمكن ترميزها داخل NFC عبر NDEF (Web NFC / React Native NFC).
- لوسوم داخل ملفات GLB استخدم امتداد **KHR_xmp_json_ld** (أداة Khronos Metadata CLI للمساعدة).

## 5) التوصيات والمعايير
- **ERC-721** (NFT) + **EIP-2981** (Royalties).
- **WalletConnect / Reown AppKit** للربط بالمحافظ على React Native.
- **Web NFC** + **react-native-nfc-manager** لكتابة NDEF.
- **KHR_xmp_json_ld** لغرس بيانات الأصالة داخل GLB.

## الخطوات التالية
1. ربط `/api/*` بقاعدة بيانات Postgres الفعلية (Prisma/Nest أو مباشرة).
2. وصل **Tap/HyperPay** للفوترة في هدايا الشركات أو إعادة البيع بالريال.
3. ربط **WalletConnect AppKit** على الموبايل لإظهار المقتنيات على-chain.
4. تشغيل Batch Indexer لتوليد متجهات الصور وتفعيل "Similar Pieces".

> متوافق مع حزمة v4.4.1 (نفس Docker Compose). أدرج المجلد `apps/web` ضمن مشروعك الحالي أو استخدمه كأساس مشروع جديد.
