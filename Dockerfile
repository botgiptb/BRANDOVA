# syntax=docker/dockerfile:1

# ==========================================
# 1. Base Image
# ==========================================
FROM node:20-alpine AS base

# Install libc6-compat for compatibility with alpine libc
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# 2. Dependencies Stage
# ==========================================
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# 3. Builder Stage
# ==========================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ==========================================
# 4. Production Runner Stage
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure persistent directories exist with write permissions for non-root user
# - /app/data: JSON data store (store.json for tickets, analytics, page views)
# - /app/public/workimage: Uploaded portfolio work images
RUN mkdir -p /app/data /app/public/workimage && \
    chown -R nextjs:nodejs /app/data /app/public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
