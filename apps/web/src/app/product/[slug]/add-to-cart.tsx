"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatNaira, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [variantIndex, setVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const variant = product.variants[variantIndex];
  const soldOut = variant.stock === 0;

  function handleAdd() {
    if (soldOut) return;
    add({
      variantId: `${product.slug}:${variant.name}`,
      productSlug: product.slug,
      productName: product.name,
      variantName: variant.name,
      unitPriceKobo: variant.priceKobo,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-6">
      <p className="text-[22px] font-medium text-tar-ink">
        {formatNaira(variant.priceKobo)}
      </p>

      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-tar-muted">
        Length
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose length">
        {product.variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => setVariantIndex(i)}
            aria-pressed={variantIndex === i}
            disabled={v.stock === 0}
            className={
              v.stock === 0
                ? "cursor-not-allowed border border-tar-sand px-5 py-2.5 text-[12px] uppercase tracking-[0.12em] text-tar-muted/50 line-through"
                : variantIndex === i
                  ? "border border-tar-green bg-tar-green px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
                  : "border border-tar-sand px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-tar-ink transition-colors hover:border-tar-green"
            }
          >
            {v.name}
          </button>
        ))}
      </div>

      {!soldOut && variant.stock <= 4 && (
        <p className="mt-3 text-[13px] text-tar-orange">
          Only {variant.stock} left in this length.
        </p>
      )}

      <div className="mt-8 space-y-3">
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className={
            soldOut
              ? "w-full cursor-not-allowed bg-tar-sand py-[18px] text-[13px] font-semibold uppercase tracking-[0.2em] text-tar-muted"
              : "w-full bg-tar-ink py-[18px] text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-tar-orange active:translate-y-[1px]"
          }
        >
          {soldOut ? "Sold out" : added ? "Added to cart" : "Add to cart"}
        </button>
        <button
          onClick={() => {
            if (!soldOut) router.push("/checkout");
          }}
          disabled={soldOut}
          className={
            soldOut
              ? "w-full cursor-not-allowed border border-tar-sand py-[18px] text-[13px] font-semibold uppercase tracking-[0.2em] text-tar-muted/50"
              : "w-full border border-tar-ink py-[18px] text-[13px] font-semibold uppercase tracking-[0.2em] text-tar-ink transition-colors duration-300 hover:border-tar-orange hover:text-tar-orange"
          }
        >
          Buy it now
        </button>
      </div>
    </div>
  );
}
