import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Craft" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-tar-cream">
      <div className="flex items-center justify-between bg-tar-green-deep px-4 py-2 md:px-10">
        <a
          href="https://instagram.com"
          aria-label="Instagram"
          className="text-white/70 transition-colors hover:text-tar-orange"
        >
          <InstagramLogo size={14} weight="light" />
        </a>
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
          Naira payments by bank transfer or card at checkout
        </p>
        <span className="w-[14px]" aria-hidden />
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between border-b border-tar-sand/70 px-4 md:px-10">
        <Link
          href="/account"
          className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-tar-ink transition-colors hover:text-tar-orange md:block"
        >
          Account
        </Link>

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

        <div className="flex flex-1 items-center justify-end gap-5">
          <CartBadge />
        </div>
      </div>

      <nav
        className="border-b border-tar-sand/70 bg-tar-cream"
        aria-label="Primary navigation"
      >
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
    </header>
  );
}
