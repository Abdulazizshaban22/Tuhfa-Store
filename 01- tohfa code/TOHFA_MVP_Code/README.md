# TOHFA MVP — Backend (NestJS + Prisma) & Frontend (Next.js)
Generated: 2025-10-21 00:17

## Quick Start (Docker)
```bash
cd TOHFA_MVP
docker compose up --build
# web: http://localhost:3000
# api: http://localhost:4000
# db:  5432 (pgvector)
```

## Local Dev
- Backend:
  ```bash
  cd backend
  cp .env.example .env
  npm i
  npx prisma generate
  npm run dev
  ```

- Frontend:
  ```bash
  cd frontend
  cp .env.example .env
  npm i
  npm run dev
  ```

## Notes
- Prisma schema includes optional pgvector extension (commented column). Enable once you add embeddings.
- API endpoints:
  - `GET /products?take=&skip=&q=&craft=`
  - `GET /products/:externalId`
  - `GET /artisans`, `GET /artisans/handle/:handle`
  - `GET /exhibits`, `GET /exhibits/:externalId`
