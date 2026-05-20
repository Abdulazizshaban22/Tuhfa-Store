# Embeddings with pgvector (Prisma + Postgres)

1) Generate migration file and paste SQL:
```bash
npx prisma migrate dev --name add-pgvector --create-only
# open prisma/migrations/<timestamp>_add-pgvector/migration.sql and paste contents of add_pgvector.sql
npx prisma migrate dev
```

2) In `prisma/schema.prisma`, add to `model Product`:
```prisma
embedding Unsupported("vector")?
```

3) Introspect to sync types:
```bash
npx prisma db pull && npx prisma generate
```

4) Upsert/update embedding using raw SQL:
```ts
await prisma.$executeRaw`UPDATE "Product" SET embedding = ${`[${vector.join(',')}]`}::vector WHERE "externalId" = ${externalId}`
```
