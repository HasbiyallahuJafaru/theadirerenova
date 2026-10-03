// Mock catalog data — replaced by the NestJS API once it's wired.
// Images are picsum placeholders (seeded) standing in for the Instagram import.

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  priceKobo: number;
  imageUrl: string;
  description: string;
  fabricStory?: string;
  variants: { name: string; priceKobo: number; stock: number }[];
}

export function formatNaira(kobo: number): string {
  return `₦${(kobo / 100).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

const yards = (base: number) => [  { name: "2 yards", priceKobo: base, stock: 12 },
  { name: "4 yards", priceKobo: Math.round(base * 1.9), stock: 8 },
  { name: "6 yards", priceKobo: Math.round(base * 2.7), stock: 5 },
  { name: "8 yards", priceKobo: Math.round(base * 3.4), stock: 3 },
];

export const collections = [
  {
    slug: "adire-eleko",
    name: "Adire Eleko",
    description: "Patterns drawn on with starch, like ink from a pen",
    imageUrl: "/ig/Dd5-ykHCA2s.jpg",
  },
  {
    slug: "kampala",
    name: "Kampala",
    description: "Pleated tight, so the dye strikes in lightning lines",
    imageUrl: "/ig/DdqZ_GqoCUw.jpg",
  },
  {
    slug: "oniko",
    name: "Oniko",
    description: "Tied with raffia into circles the vat cannot reach",
    imageUrl: "/ig/Ddim_y2CIeT.jpg",
  },
  {
    slug: "alabere",
    name: "Alabere",
    description: "Stitched with needle and thread, days per cloth",
    imageUrl: "/ig/DdlZ-EVIo68.jpg",
  },
];

export const featuredProducts: Product[] = [
  {
    slug: "indigo-eleko",
    name: "Indigo Eleko",
    category: "Adire Eleko",
    categorySlug: "adire-eleko",
    priceKobo: 2200000,
    imageUrl: "/ig/Dd0yqmjiKEF.jpg",
    description:
      "The one people stop you to ask about. Deep, deep blue with white motifs drawn on freehand before the cloth ever meets the vat. Hold it up to the light and you can trace where the cassava starch held.",
    fabricStory:
      "Eleko is drawn, not tied. A woman sits with a feather stylus and paints every motif in cassava starch by hand. One six-yard piece takes her two full days, and if her hand shakes, the cloth remembers.",
    variants: yards(4500000),
  },
  {
    slug: "kampala-gold",
    name: "Kampala Gold",
    category: "Kampala",
    categorySlug: "kampala",
    priceKobo: 3500000,
    imageUrl: "/ig/Dd4f7AYIVBa.jpg",
    description:
      "Amber and gold running in sharp repeat lines. The pleats are crushed by hand before dipping, so the colour breaks across the cloth like sunlight through blinds. Drapes heavy, the way good cotton should.",
    variants: yards(5200000),
  },
  {
    slug: "oniko-rose",
    name: "Oniko Rose",
    category: "Oniko",
    categorySlug: "oniko",
    priceKobo: 1800000,
    imageUrl: "/ig/Dd8d7eViH6j.jpg",
    description:
      "Soft rose circles scattered over warm terracotta. Each ring is a pinch of cloth bound with raffia, and you can still feel the tiny peaks under your thumb where it was tied.",
    variants: yards(3200000),
  },
  {
    slug: "alabere-emerald",
    name: "Alabere Emerald",
    category: "Alabere",
    categorySlug: "alabere",
    priceKobo: 2200000,
    imageUrl: "/ig/DdYiOk2owAQ.jpg",
    description:
      "Emerald stitching over cream, fine as machine work but made entirely by hand. This is the patient cloth: the lines you see are threads pulled out one by one after the dye set.",
    fabricStory:
      "Alabere means stitched resist. The pattern is sewn into the cloth with plain thread, pulled tight, dyed, then the threads are removed one at a time to reveal the lines. A single error in the pulling can tear days of work.",
    variants: yards(5800000),
  },
];

export const shopProducts: Product[] = [
  ...featuredProducts,
  {
    slug: "eleko-midnight",
    name: "Eleko Midnight",
    category: "Adire Eleko",
    categorySlug: "adire-eleko",
    priceKobo: 2200000,
    imageUrl: "/ig/DdbKlUHiEUe.jpg",
    description:
      "Dipped so many times the blue goes almost black, with motifs in silver-white that seem to float. Looks formal enough for evening, wears soft enough for Saturday.",
    variants: yards(4800000),
  },
  {
    slug: "kampala-forest",
    name: "Kampala Forest",
    category: "Kampala",
    categorySlug: "kampala",
    priceKobo: 3500000,
    imageUrl: "/ig/DdimYVACFpw.jpg",
    description:
      "Deep green on green, the colour of the vat at full strength. The pleat lines run close together on this batch, which is the mark of a very patient folder.",
    variants: yards(5000000),
  },
  {
    slug: "oniko-sun",
    name: "Oniko Sun",
    category: "Oniko",
    categorySlug: "oniko",
    priceKobo: 1800000,
    imageUrl: "/ig/DdV-Y69CGq4.jpg",
    description:
      "Golden rings on a sand ground, open and airy. The lightest cloth we make, and the one that softens fastest with washing. By the third wash it feels like it has always been yours.",
    variants: yards(3000000),
  },
  {
    slug: "alabere-indigo-line",
    name: "Alabere Indigo Line",
    category: "Alabere",
    categorySlug: "alabere",
    priceKobo: 3500000,
    imageUrl: "/ig/Ddn4GuJIAB2.jpg",
    description:
      "Hairline white channels through the deepest indigo in our vats. From across the room it reads as texture; up close, every line is a thread that was sewn in and drawn out again.",
    variants: yards(6100000),
  },
];

export function getProduct(slug: string): Product | undefined {
  return shopProducts.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export const testimonials = [
  {
    quote:
      "I ordered one cloth to test them. Now my tailor asks me to bring TAR fabric for every occasion.",
    name: "Amina Yusuf",
    role: "Lagos",
  },
  {
    quote:
      "The alabere I bought feels nothing like the printed imitation in the market. You can feel the lines.",
    name: "Chidi Okafor",
    role: "Abuja",
  },
  {
    quote:
      "Twelve cloths for my sister's aso-ebi, dyed in one batch. They sat together like family.",
    name: "Fatima Bello",
    role: "Kaduna",
  },
];
