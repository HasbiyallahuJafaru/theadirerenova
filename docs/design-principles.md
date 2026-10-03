# TAR — Design Principles & System

## Identity

**The Adire Renova (TAR)** — hand-dyed adire fabrics from Kaduna, Nigeria. The design must feel *artisanal and premium*, never corporate. Think: a modern atelier, not a marketplace.

## Palette (orange / green / white)

| Token | Hex | Use |
|---|---|---|
| `--tar-orange` | `#E8590C` | Primary actions, sale accents, links |
| `--tar-orange-deep` | `#C2410C` | Hover / pressed states |
| `--tar-orange-soft` | `#FFF0E4` | Tinted backgrounds, badges |
| `--tar-green` | `#1F5E3D` | Brand secondary, headings on light, success |
| `--tar-green-deep` | `#123D27` | Footer, dark sections |
| `--tar-green-soft` | `#E8F3EC` | Tinted backgrounds |
| `--tar-cream` | `#FAF7F2` | Page background (warm off-white, never pure #FFF) |
| `--tar-ink` | `#1C1917` | Body text |
| `--tar-sand` | `#E7DED2` | Dividers, borders, subtle fills |

**Rule**: green dominates large surfaces (footer, dark sections, hero overlay); orange is the *spark* — buttons, prices, highlights. Cream is the canvas. Never 50/50 orange/green in one section.

## Typography

- **Display**: Fraunces (serif, opsz) — headlines, editorial moments. Use italic for accent words.
- **Body/UI**: Inter (or Geist) — clean, generous line-height (1.6).
- Scale: fluid `clamp()`-based; hero at `clamp(2.75rem, 6vw, 5rem)`.

## Motion language (Framer Motion)

- **Enter**: staggered fade+rise (12px, 400ms, ease-out `[0.22, 1, 0.36, 1]`), triggered on scroll into view.
- **Hero**: slow parallax on imagery, staggered word reveal on headline.
- **Micro**: buttons lift 2px + shadow on hover; product cards zoom image 1.05 with 500ms; cart drawer springs (`stiffness 300, damping 30`).
- **Page transitions**: subtle — fade + 8px rise, never block navigation.
- **Restraint rule**: motion reveals hierarchy; if everything moves, nothing is premium. Durations 200–500ms only.

## Premium feel checklist

- Generous whitespace: sections breathe (≥ `6rem` vertical rhythm desktop).
- Full-bleed imagery, large product photos (4:5), subtle grain/texture overlay on hero + dark sections.
- Thin 1px `--tar-sand` borders instead of shadows for structure; shadows reserved for floating elements (drawer, modals).
- Prices in ₦ with thousands separators; small-caps eyebrow labels above headings.
- Marquee value-strip: "Hand-dyed in Kaduna • 100% cotton • Nationwide delivery".
- Custom wordmark "TAR" in Fraunces + "The Adire Renova" in small caps beneath.

## Layout reference (approved)

ShopLuxe-style structure — split hero with script accent, category/collection grid, 4-up product cards, promo panels, rich dark footer — re-skinned in the TAR palette with elevated motion.
