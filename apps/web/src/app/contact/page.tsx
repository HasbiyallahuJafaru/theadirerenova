import { InstagramLogo, WhatsappLogo, Envelope, MapPin } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const field =
    "w-full rounded-xl border border-tar-sand bg-white px-5 py-3.5 text-[15px] text-tar-ink placeholder:text-tar-muted/70 focus:border-tar-orange focus:outline-none";
  const label = "block text-[14px] font-medium text-tar-ink";

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 md:px-8 md:py-20">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-6xl">
          Talk to us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-tar-muted">
          Questions about a fabric, a bulk order for aso-ebi, or delivery? WhatsApp is
          fastest.
        </p>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <form className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" required className={`${field} mt-2`} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="contact-phone" className={label}>Phone or email</label>
              <input id="contact-phone" name="contact" required className={`${field} mt-2`} placeholder="How do we reach you?" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className={label}>Message</label>
            <textarea id="message" name="message" required rows={6} className={`${field} mt-2`} placeholder="Tell us what you need." />
          </div>
          <button
            type="submit"
            className="rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
          >
            Send message
          </button>
        </form>

        <aside className="h-fit space-y-6 rounded-2xl border border-tar-sand bg-white/60 p-8">
          <a href="https://wa.me/2340000000000" className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-tar-green-soft text-tar-green">
              <WhatsappLogo size={20} />
            </span>
            <span className="text-[15px]">
              <span className="block font-medium">WhatsApp</span>
              <span className="text-tar-muted">Fastest for orders</span>
            </span>
          </a>
          <a href="https://instagram.com" className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-tar-green-soft text-tar-green">
              <InstagramLogo size={20} />
            </span>
            <span className="text-[15px]">
              <span className="block font-medium">Instagram</span>
              <span className="text-tar-muted">See fresh dye batches</span>
            </span>
          </a>
          <a href="mailto:hello@theadirerenova.com" className="flex items-center gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-tar-green-soft text-tar-green">
              <Envelope size={20} />
            </span>
            <span className="text-[15px]">
              <span className="block font-medium">Email</span>
              <span className="text-tar-muted">hello@theadirerenova.com</span>
            </span>
          </a>
          <div className="flex items-center gap-4 border-t border-tar-sand pt-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-tar-green-soft text-tar-green">
              <MapPin size={20} />
            </span>
            <span className="text-[15px]">
              <span className="block font-medium">Studio</span>
              <span className="text-tar-muted">Kaduna, Nigeria. Visits by appointment.</span>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
