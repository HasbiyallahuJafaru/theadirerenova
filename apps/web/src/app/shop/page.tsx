"use client";

import { useMemo, useState } from "react";
import { shopProducts, collections } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

type Sort = "newest" | "price-asc" | "price-desc";

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const products = useMemo(() => {
    let list = shopProducts.filter((p) => category === "all" || p.categorySlug === category);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceKobo - b.priceKobo);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceKobo - a.priceKobo);
    return list;
  }, [category, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-6xl">
          Every cloth on this page is one of one
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-tar-muted">
          What you see is the exact piece you get. When it sells, that pattern is gone
          for good, because no two bindings ever come out the same.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-tar-sand pb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
          {[{ slug: "all", name: "All" }, ...collections].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              aria-pressed={category === c.slug}
              className={
                category === c.slug
                  ? "rounded-full bg-tar-green px-5 py-2.5 text-[14px] font-medium text-white"
                  : "rounded-full border border-tar-sand px-5 py-2.5 text-[14px] font-medium text-tar-ink transition-colors hover:border-tar-green hover:text-tar-green"
              }
            >
              {c.name}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-[14px] text-tar-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-tar-sand bg-white px-4 py-2.5 text-[14px] text-tar-ink focus:border-tar-orange focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 4) * 0.06}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
