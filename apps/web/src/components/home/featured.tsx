import Link from "next/link";
import { featuredProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-24 md:px-10 md:py-36">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-tar-green-deep">
          Out of the vat this week
        </h2>
        <Link
          href="/shop"
          className="text-[13px] font-semibold uppercase tracking-[0.18em] text-tar-ink underline-offset-8 transition-colors hover:text-tar-orange hover:underline"
        >
          View all fabrics
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
