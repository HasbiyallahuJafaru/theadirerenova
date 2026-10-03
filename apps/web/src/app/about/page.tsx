import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Our Craft" };

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-14 md:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-tar-green-deep md:text-6xl">
              Slow cloth from <span className="italic text-tar-orange">Kaduna</span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-tar-muted">
              We started with one pit, two hands and a stubborn belief: that cloth tied
              and dipped the old way still belongs in a modern wardrobe. Nothing here is
              printed. Every pattern you see was made by keeping dye away from cloth,
              with raffia, thread, starch or a tight fold.
            </p>
            <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-tar-muted">
              Because the pattern lives in the bindings, no two cloths can ever match.
              That is not a flaw of the craft. It is the whole point.
            </p>
          </div>
          <Reveal className="relative min-h-[420px]">
            <div className="relative h-full overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/tar-about/1000/1200"
                alt="Adire cloth drying in the Kaduna studio"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-tar-green-deep py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <Reveal>
            <h2 className="max-w-[24ch] font-display text-4xl font-medium tracking-[-0.02em] md:text-5xl">
              How a piece of cloth becomes adire
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[
              {
                title: "Resist",
                body: "The cloth is folded, tied with raffia, or stitched with thread. Wherever the binding holds, dye cannot go. The pattern is decided before any colour touches the fabric.",
              },
              {
                title: "Dip",
                body: "The bound cloth goes into the vat, often more than once, with drying between dips. Our indigo ferments naturally, the way it has for generations.",
              },
              {
                title: "Reveal",
                body: "The bindings are cut away and the pattern appears for the first time. Even our most experienced dyers do not fully know what a cloth will look like until this moment.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="border-t border-white/20 pt-6">
                  <h3 className="font-display text-3xl font-medium">{step.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-white/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
