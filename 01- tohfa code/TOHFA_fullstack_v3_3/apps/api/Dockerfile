FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm i -g @nestjs/cli && npm i

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm run build || npx nest build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
CMD ["node","dist/main.js"]
