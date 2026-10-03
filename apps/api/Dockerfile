# TAR API — Cloudflare Containers (or any Node host)
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/
RUN pnpm install --filter @tar/api... --frozen-lockfile || pnpm install --filter @tar/api...
COPY apps/api apps/api
RUN cd apps/api && pnpm prisma generate && pnpm build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/prisma ./prisma
COPY --from=build /app/apps/api/package.json ./package.json
EXPOSE 4000
CMD ["node", "dist/main.js"]
