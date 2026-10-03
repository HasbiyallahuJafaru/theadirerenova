"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useCart, cartSubtotalKobo } from "@/lib/cart";
import { formatNaira } from "@/lib/catalog";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotalKobo(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-24 text-center md:px-8 md:py-32">
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
          Nothing in here yet
        </h1>
        <p className="mt-4 text-lg text-tar-muted">
          The vats were emptied this week and the lines are still fresh. Go find yours.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
        >
          Shop fabrics
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 md:px-8 md:py-20">
      <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Your cart
      </h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-tar-sand border-y border-tar-sand">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-5 py-6">
              <Link
                href={`/product/${item.productSlug}`}
                className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-tar-sand/40"
              >
                <Image src={item.imageUrl} alt={item.productName} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/product/${item.productSlug}`} className="font-display text-xl font-medium text-tar-ink hover:text-tar-orange">
                      {item.productName}
                    </Link>
                    <p className="mt-1 text-[14px] text-tar-muted">{item.variantName}</p>
                  </div>
                  <button
                    onClick={() => remove(item.variantId)}
                    aria-label={`Remove ${item.productName}`}
                    className="flex size-9 items-center justify-center rounded-full text-tar-muted transition-colors hover:bg-tar-orange-soft hover:text-tar-orange"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-tar-sand">
                    <button
                      onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex size-10 items-center justify-center text-tar-ink hover:text-tar-orange"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-[15px] font-medium">{item.quantity}</span>
                    <button
                      onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex size-10 items-center justify-center text-tar-ink hover:text-tar-orange"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[16px] font-semibold text-tar-ink">
                    {formatNaira(item.unitPriceKobo * item.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-tar-sand bg-white/60 p-8">
          <h2 className="font-display text-2xl font-medium text-tar-ink">Summary</h2>
          <div className="mt-6 space-y-3 text-[15px]">
            <div className="flex justify-between">
              <span className="text-tar-muted">Subtotal</span>
              <span className="font-medium">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-tar-muted">Delivery</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-8 block rounded-full bg-tar-orange px-8 py-4 text-center text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
          >
            Checkout
          </Link>
          <p className="mt-4 text-center text-[13px] text-tar-muted">
            Secure payment in naira via Paystack
          </p>
        </aside>
      </div>
    </div>
  );
}
