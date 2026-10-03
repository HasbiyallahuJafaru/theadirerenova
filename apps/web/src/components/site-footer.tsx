import Link from "next/link";
import { InstagramLogo, WhatsappLogo, Envelope } from "@phosphor-icons/react/dist/ssr";

export function SiteFooter() {
  return (
    <footer className="bg-tar-green-deep text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <span className="font-display text-3xl font-semibold tracking-tight">TAR</span>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-white/70">
            We tie, fold, stitch and dip every cloth ourselves, in Kaduna. When a piece
            is gone, there will never be another one like it.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-tar-orange hover:bg-tar-orange"
            >
              <InstagramLogo size={18} weight="light" />
            </a>
            <a
              href="https://wa.me/2340000000000"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-tar-orange hover:bg-tar-orange"
            >
              <WhatsappLogo size={18} weight="light" />
            </a>
            <a
              href="mailto:hello@theadirerenova.com"
              aria-label="Email"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-tar-orange hover:bg-tar-orange"
            >
              <Envelope size={18} weight="light" />
            </a>
          </div>
        </div>

        <nav aria-label="Shop">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/50">
            Shop
          </p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link href="/shop" className="text-white/80 hover:text-tar-orange">All fabrics</Link></li>
            <li><Link href="/collections/adire-eleko" className="text-white/80 hover:text-tar-orange">Adire Eleko</Link></li>
            <li><Link href="/collections/kampala" className="text-white/80 hover:text-tar-orange">Kampala</Link></li>
            <li><Link href="/collections/oniko" className="text-white/80 hover:text-tar-orange">Oniko</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/50">
            Company
          </p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link href="/about" className="text-white/80 hover:text-tar-orange">Our Craft</Link></li>
            <li><Link href="/track" className="text-white/80 hover:text-tar-orange">Track your order</Link></li>
            <li><Link href="/contact" className="text-white/80 hover:text-tar-orange">Contact</Link></li>
            <li><Link href="/faq" className="text-white/80 hover:text-tar-orange">FAQ &amp; Shipping</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/50">
            Studio
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/80">
            Kaduna, Nigeria
            <br />
            Mon to Sat, 9am to 6pm
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} The Adire Renova. All rights reserved.</p>
          <p>Secured payments by Paystack</p>
        </div>
      </div>
    </footer>
  );
}
