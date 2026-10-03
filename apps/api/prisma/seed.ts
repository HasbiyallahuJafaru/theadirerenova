// Seeds categories, collections, the storefront products, and the first admin user.
// Run: pnpm --filter @tar/api db:seed
import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    // .env optional; real env vars win anyway
  }
}

function hashPassword(password: string): string {
  const salt = randomBytes(8).toString('hex');
  return `${salt}:${scryptSync(password, salt, 32).toString('hex')}`;
}

const yards = (base: number) => [
  { name: '2 yards', priceKobo: base, stock: 12 },
  { name: '4 yards', priceKobo: Math.round(base * 1.9), stock: 8 },
  { name: '6 yards', priceKobo: Math.round(base * 2.7), stock: 5 },
  { name: '8 yards', priceKobo: Math.round(base * 3.4), stock: 3 },
];

const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

loadEnv();
const prisma = new PrismaClient();

const categories = [
  { slug: 'adire-eleko', name: 'Adire Eleko', position: 0 },
  { slug: 'kampala', name: 'Kampala', position: 1 },
  { slug: 'oniko', name: 'Oniko', position: 2 },
  { slug: 'alabere', name: 'Alabere', position: 3 },
];

const products = [
  {
    slug: 'indigo-eleko',
    name: 'Indigo Eleko',
    category: 'adire-eleko',
    basePriceKobo: 4500000,
    featured: true,
    image: img('tar-p1'),
    description:
      'The one people stop you to ask about. Deep, deep blue with white motifs drawn on freehand before the cloth ever meets the vat.',
    story:
      'Eleko is drawn, not tied. A woman sits with a feather stylus and paints every motif in cassava starch by hand. One six-yard piece takes her two full days.',
  },
  {
    slug: 'kampala-gold',
    name: 'Kampala Gold',
    category: 'kampala',
    basePriceKobo: 5200000,
    featured: true,
    image: img('tar-p2'),
    description:
      'Amber and gold running in sharp repeat lines. Drapes heavy, the way good cotton should.',
    story: null,
  },
  {
    slug: 'oniko-rose',
    name: 'Oniko Rose',
    category: 'oniko',
    basePriceKobo: 3200000,
    featured: true,
    image: img('tar-p3'),
    description:
      'Soft rose circles scattered over warm terracotta. You can still feel the tiny peaks under your thumb where it was tied.',
    story: null,
  },
  {
    slug: 'alabere-emerald',
    name: 'Alabere Emerald',
    category: 'alabere',
    basePriceKobo: 5800000,
    featured: true,
    image: img('tar-p4'),
    description:
      'Emerald stitching over cream, fine as machine work but made entirely by hand.',
    story:
      'Alabere means stitched resist. The threads are removed one at a time after the dye sets, and a single slip can tear days of work.',
  },
  {
    slug: 'eleko-midnight',
    name: 'Eleko Midnight',
    category: 'adire-eleko',
    basePriceKobo: 4800000,
    featured: false,
    image: img('tar-p5'),
    description:
      'Dipped so many times the blue goes almost black, with motifs in silver-white that seem to float.',
    story: null,
  },
  {
    slug: 'kampala-forest',
    name: 'Kampala Forest',
    category: 'kampala',
    basePriceKobo: 5000000,
    featured: false,
    image: img('tar-p6'),
    description:
      'Deep green on green, the colour of the vat at full strength.',
    story: null,
  },
  {
    slug: 'oniko-sun',
    name: 'Oniko Sun',
    category: 'oniko',
    basePriceKobo: 3000000,
    featured: false,
    image: img('tar-p7'),
    description:
      'Golden rings on a sand ground, open and airy. The lightest cloth we make.',
    story: null,
  },
  {
    slug: 'alabere-indigo-line',
    name: 'Alabere Indigo Line',
    category: 'alabere',
    basePriceKobo: 6100000,
    featured: false,
    image: img('tar-p8'),
    description:
      'Hairline white channels through the deepest indigo in our vats. Every line is a thread sewn in and drawn out again.',
    story: null,
  },
];

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, create: c, update: c });
  }

  for (const p of products) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: p.category } });
    const variants = yards(p.basePriceKobo).map((v, i) => ({
      ...v,
      sku: `${p.slug.toUpperCase().replace(/-/g, '')}-${i + 1}`,
      isDefault: i === 0,
    }));
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        fabricStory: p.story,
        categoryId: category.id,
        basePriceKobo: p.basePriceKobo,
        isFeatured: p.featured,
        images: { create: { url: p.image, alt: p.name } },
        variants: { create: variants },
      },
      update: {
        description: p.description,
        fabricStory: p.story,
        basePriceKobo: p.basePriceKobo,
        isFeatured: p.featured,
      },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@theadirerenova.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'change-me-now';
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      name: 'TAR Admin',
    },
    update: {},
  });

  const counts = {
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
    variants: await prisma.productVariant.count(),
    admins: await prisma.adminUser.count(),
  };
  console.log('Seeded:', counts, `admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
