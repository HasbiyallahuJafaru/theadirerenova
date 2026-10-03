import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Craft" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-tar-sand/70 bg-tar-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-4 md:px-10">
        <nav className="hidden flex-1 items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium uppercase tracking-[0.2em] text-tar-ink transition-colors hover:text-tar-orange"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="The Adire Renova, home"
          className="flex flex-1 flex-col items-center leading-none md:flex-none"
        >
          <span className="font-display text-[30px] font-semibold tracking-[0.04em] text-tar-green-deep">
            TAR
          </span>
          <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.34em] text-tar-muted md:block">
            The Adire Renova
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2">
          <CartBadge />
          <Link
            href="/shop"
            className="ml-2 rounded-full bg-tar-ink px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-tar-orange"
          >
            Shop fabrics
          </Link>
        </div>
      </div>

      <nav
        className="flex items-center justify-center gap-6 border-t border-tar-sand/70 py-3 md:hidden"
        aria-label="Mobile"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-tar-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
