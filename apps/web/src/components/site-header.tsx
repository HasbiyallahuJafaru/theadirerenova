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
    <header className="sticky top-0 z-40 border-b border-tar-sand bg-tar-cream/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-[28px] font-semibold tracking-tight text-tar-green-deep">
            TAR
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-tar-muted">
            The Adire Renova
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[15px] font-medium text-tar-ink transition-colors hover:text-tar-orange after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-tar-orange after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartBadge />
          <Link
            href="/shop"
            className="hidden rounded-full bg-tar-orange px-6 py-3 text-[15px] font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep hover:shadow-md md:block"
          >
            Shop fabrics
          </Link>
        </div>
      </div>
    </header>
  );
}
