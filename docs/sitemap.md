# TAR — Site Map & Information Architecture

## Storefront (`apps/web`)

```
/                       Home — hero, value strip, featured collections, product grid, IG gallery, testimonials, newsletter
/shop                   All fabrics — filters (category, price, fabric type), sort, quick-view
/collections/[slug]     Curated collection landing (e.g. "Indigo Nights", "Kampala Classics")
/product/[slug]         Product detail — gallery, variants (yard length), fabric story, related
/about                  Our Craft — the adire dyeing process, the Kaduna studio story
/contact                Contact — phone/WhatsApp, email, studio address, form
/faq                    FAQ & shipping info
/cart                   Cart page (also available as slide-over drawer)
/checkout               Delivery details → Paystack payment
/order/[reference]      Order confirmation & tracking (public via reference)
/track                  Look up an order by its TAR-XXXXXX reference
```

Guest checkout: no customer accounts. Shoppers enter their details at checkout,
pay via Paystack, and track orders by reference. (Supabase Auth is not used for
customers; admin auth remains JWT via the API.)
```

## Admin (`apps/web/admin`)

```
/admin                  Dashboard — sales stats, recent orders, low-stock alerts
/admin/products         Products list
/admin/products/new     Create product (R2 image upload, variants, pricing)
/admin/products/[id]    Edit product
/admin/orders           Orders & fulfillment status
/admin/inventory        Stock levels
/admin/instagram        IG gallery manager — convert posts → products
/admin/coupons          Coupons
/admin/customers        Customers
```

## API (`apps/api`, NestJS)

```
API_PREFIX = /api/v1

POST   /auth/admin/login              Admin login (JWT)
POST   /auth/otp/send                Customer phone OTP (Supabase)
POST   /auth/otp/verify              Verify OTP
GET    /products                     Public list (filter, sort, paginate)
GET    /products/:slug               Public detail + variants
GET    /categories                   Public categories + collections
POST   /orders                       Create order (checkout)
GET    /orders/:reference            Order status (public via reference)
POST   /payments/paystack/init       Initialize Paystack transaction
POST   /payments/paystack/webhook    Paystack webhook (HMAC verified)
GET    /instagram/posts              Public IG gallery
POST   /uploads/presign              Presigned R2 upload (admin)
Admin  /admin/products|orders|inventory|coupons|customers|instagram/*  (guarded CRUD)
GET    /docs                         Swagger
```

## Principles

1. **Two audiences, one repo**: shopper experience is read-optimized and public; admin is guarded and write-heavy. Never share state.
2. **Slug-first public URLs** — every public resource addressed by slug, never by id.
3. **Order reference over id** — customers see human-readable references (e.g. `TAR-7K3QF2`).
4. **The API is the single source of truth** — the web app holds no business logic beyond presentation state (cart UI).
5. **Progressive disclosure** — deep pages (fabric story, process) live one click from the product, never clutter the buying path.
