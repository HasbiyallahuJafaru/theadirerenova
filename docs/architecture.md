# TAR — Architecture

## Stack

| Concern | Choice |
|---|---|
| Storefront | Next.js 15 (App Router, RSC) on Cloudflare Workers via `@opennextjs/cloudflare` |
| API | NestJS 11 on Cloudflare Containers (fallback: any Node host; code identical) |
| Database | Supabase Postgres via Prisma (pgbouncer/pooled connection) |
| Auth | Supabase Auth (customers, email + phone OTP); NestJS JWT for admins |
| Payments | Paystack (NGN) — initialize → redirect → HMAC-verified webhook |
| Storage | Cloudflare R2 (S3-compatible) — product imagery + Instagram imports |
| Monorepo | pnpm workspaces + Turborepo; GitHub Actions CI |

## Data flow

1. Storefront reads products/gallery from NestJS API (RSC fetch, revalidated).
2. Cart lives client-side ( Zustand + localStorage); checkout posts to `POST /orders`.
3. `POST /payments/paystack/init` returns Paystack authorization URL → redirect.
4. Paystack calls `POST /payments/paystack/webhook` (x-paystack-signature HMAC SHA512) → order marked `paid`, stock decremented, confirmation email queued.
5. Admin uploads images directly to R2 via presigned URLs from `POST /uploads/presign`.

## Environments

- `.env` files per app (see each `apps/*/.env.example`); secrets injected via `wrangler secret` / container env in production.
- Never commit secrets; CI uses placeholders + build-only checks.

## Instagram import (one-time)

`scripts/instagram-sync` uses yt-dlp with browser cookies to download all posts from the public handle, uploads media to R2 `ig/<YYYY-MM-DD>/`, and upserts metadata into `instagram_posts` via Supabase REST. Admin can then convert posts into products from `/admin/instagram`.
