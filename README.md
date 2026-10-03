# The Adire Renova (TAR)

Premium e-commerce monorepo for hand-dyed adire fabrics from Kaduna, Nigeria.

- `apps/web` — Next.js 15 storefront + admin
- `apps/api` — NestJS API (products, orders, Paystack, uploads)
- `packages/*` — shared types, config, UI design system
- `scripts/instagram-sync` — one-time Instagram → Cloudflare R2 import (yt-dlp)
- `docs/` — sitemap, design principles, architecture

## Getting started

```bash
pnpm install
cp .env.example apps/api/.env   # fill values
cp .env.example apps/web/.env.local
pnpm db:generate && pnpm db:migrate
pnpm dev                        # web :3000, api :4000
```

See `docs/architecture.md` for the full picture.
