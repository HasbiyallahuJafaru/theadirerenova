import { Reveal } from "@/components/reveal";

export function Newsletter() {
  return (
    <section className="border-t border-tar-sand bg-tar-green-soft py-20 md:py-28">
      <div className="mx-auto max-w-[720px] px-4 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-5xl">
            The good batches go first
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed text-tar-muted">
            A vat only gives a few great cloths at a time. When the best of a batch is
            out of the dye, you hear about it before it hits the shop.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full flex-1 rounded-full border border-tar-green/25 bg-white px-6 py-4 text-[15px] text-tar-ink placeholder:text-tar-muted/70 focus:border-tar-orange focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-tar-green px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-green-deep active:translate-y-0"
            >
              Notify me
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
