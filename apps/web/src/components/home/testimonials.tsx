import { testimonials } from "@/lib/catalog";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-24 md:px-10 md:py-36">
      <h2 className="mb-16 font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium tracking-[-0.02em] text-tar-green-deep">
        What people say when they feel it
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col justify-between">
              <blockquote className="font-display text-[22px] font-medium leading-snug text-tar-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-tar-sand pt-4 text-[15px]">
                <span className="font-medium text-tar-ink">{t.name}</span>
                <span className="text-tar-muted">, {t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
