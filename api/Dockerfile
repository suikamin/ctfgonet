# base
FROM node:26-alpine AS base
WORKDIR /app

# 開発環境
FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# ビルド環境
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# 本番実行環境
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN mkdir -p /app/public/uploads && chown -R node:node /app/public/uploads

USER node

EXPOSE 5000

CMD ["node", "dist/server.js"]