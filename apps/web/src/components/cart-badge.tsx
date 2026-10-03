"use client";

import Link from "next/link";
import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/lib/cart";

export function CartBadge() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <Link
      href="/cart"
      aria-label={`Cart${count ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
      className="relative flex size-11 items-center justify-center rounded-full text-tar-ink transition-colors hover:bg-tar-orange-soft hover:text-tar-orange"
    >
      <ShoppingBag size={22} weight="light" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-tar-orange text-[11px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
