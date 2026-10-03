"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { CartBadge } from "@/components/cart-badge";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Craft" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-tar-cream">
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between border-b border-tar-sand/70 px-4 md:px-10">
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-full text-tar-ink transition-colors hover:bg-tar-orange-soft hover:text-tar-orange md:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
          <Link
            href="/track"
            className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-tar-ink transition-colors hover:text-tar-orange md:block"
          >
            Track order
          </Link>
        </div>

        <Link
          href="/"
          aria-label="The Adire Renova, home"
          className="flex flex-col items-center leading-none"
        >
          <span className="font-display text-[30px] font-semibold tracking-[0.04em] text-tar-green-deep">
            TAR
          </span>
          <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.34em] text-tar-muted md:block">
            The Adire Renova
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <CartBadge />
        </div>
      </div>

      <nav className="hidden border-b border-tar-sand/70 bg-tar-cream md:block" aria-label="Primary navigation">
        <ul className="mx-auto flex max-w-[1500px] items-center justify-center gap-10 px-4 py-4 md:px-10">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[12px] font-medium uppercase tracking-[0.2em] text-tar-ink transition-colors hover:text-tar-orange"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[76px] z-50 bg-tar-cream md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation" className="px-6 py-10">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-tar-sand py-5 font-display text-4xl font-medium text-tar-green-deep transition-colors hover:text-tar-orange"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32, duration: 0.3 }}
                >
                  <Link
                    href="/track"
                    className="block border-b border-tar-sand py-5 font-display text-4xl font-medium text-tar-green-deep transition-colors hover:text-tar-orange"
                  >
                    Track order
                  </Link>
                </motion.li>
              </ul>
              <Link
                href="/shop"
                className="mt-10 block rounded-full bg-tar-orange py-[18px] text-center text-[13px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                Shop fabrics
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
