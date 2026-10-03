"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag } from "@phosphor-icons/react/dist/ssr";
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
    <div className="mt-8">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-tar-muted">
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
                ? "cursor-not-allowed rounded-full border border-tar-sand px-5 py-2.5 text-[14px] text-tar-muted/50 line-through"
                : variantIndex === i
                  ? "rounded-full bg-tar-green px-5 py-2.5 text-[14px] font-medium text-white"
                  : "rounded-full border border-tar-sand px-5 py-2.5 text-[14px] font-medium text-tar-ink transition-colors hover:border-tar-green hover:text-tar-green"
            }
          >
            {v.name}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={handleAdd}
          disabled={soldOut}
          className={
            soldOut
              ? "cursor-not-allowed rounded-full bg-tar-sand px-8 py-4 text-[16px] font-medium text-tar-muted"
              : "flex items-center gap-2 rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep hover:shadow-md active:translate-y-0"
          }
        >
          {added ? (
            <>
              <Check size={20} weight="bold" /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={20} weight="light" />
              {soldOut ? "Sold out" : `Add to cart, ${formatNaira(variant.priceKobo)}`}
            </>
          )}
        </button>
        <button
          onClick={() => {
            if (!soldOut) router.push("/checkout");
          }}
          disabled={soldOut}
          className={
            soldOut
              ? "cursor-not-allowed text-[15px] text-tar-muted/50"
              : "text-[15px] font-medium text-tar-green underline-offset-4 hover:underline"
          }
        >
          Buy now
        </button>
      </div>
      {!soldOut && variant.stock <= 4 && (
        <p className="mt-3 text-[14px] text-tar-orange">
          Only {variant.stock} left in this length.
        </p>
      )}
    </div>
  );
}
