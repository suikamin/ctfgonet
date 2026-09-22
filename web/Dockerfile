# base
FROM node:26-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 開発環境
FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ビルド
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 実行環境
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
