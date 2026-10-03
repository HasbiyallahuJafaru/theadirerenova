import Image from "next/image";
import Link from "next/link";
import { featuredProducts, formatNaira } from "@/lib/catalog";
import { Reveal } from "@/components/reveal";

export function FeaturedProducts() {
  return (
    <section className="border-y border-tar-sand bg-white/50 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-5xl">
            Out of the vat this week
          </h2>
          <Link
            href="/shop"
            className="text-[15px] font-medium text-tar-orange underline-offset-4 transition-colors hover:text-tar-orange-deep hover:underline"
          >
            View all fabrics
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <Link href={`/product/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] text-tar-muted">{p.category}</p>
                    <p className="mt-0.5 font-display text-xl font-medium text-tar-ink">
                      {p.name}
                    </p>
                  </div>
                  <p className="pt-4 text-[15px] font-semibold text-tar-orange">
                    {formatNaira(p.priceKobo)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
