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
    <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-10 md:py-20">
      <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-none tracking-[-0.02em] text-tar-green-deep">
        Products
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-tar-sand pb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
          {[{ slug: "all", name: "All" }, ...collections].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              aria-pressed={category === c.slug}
              className={
                category === c.slug
                  ? "text-[12px] font-semibold uppercase tracking-[0.16em] text-tar-orange"
                  : "text-[12px] font-medium uppercase tracking-[0.16em] text-tar-muted transition-colors hover:text-tar-ink"
              }
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[12px] uppercase tracking-[0.14em] text-tar-muted">
            {products.length} products
          </span>
          <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-tar-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border-none bg-transparent text-[12px] font-medium uppercase tracking-[0.14em] text-tar-ink focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 4) * 0.06}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
