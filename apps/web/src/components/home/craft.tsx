import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    title: "Bind it",
    body:
      "Raffia, thread, starch, or a fist of folds. Whatever the cloth is bound with, the dye cannot touch. The pattern is decided here, before any colour exists.",
  },
  {
    title: "Dip it",
    body:
      "Into the vat it goes, often three, four, five times, drying in the Kaduna sun between each dip. Our indigo is alive, fed and kept like a sourdough.",
  },
  {
    title: "Cut it open",
    body:
      "The bindings come off and the pattern shows itself for the first time. Not even the dyer knows exactly what was coming. That is the moment we work for.",
  },
];

export function CraftSection() {
  return (
    <section className="bg-tar-green-deep py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-4xl font-medium leading-[1.1] tracking-[-0.02em] md:text-[56px]">
                The cloth remembers{" "}
                <span className="italic text-tar-orange">every fold.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/70">
                Adire is older than the printing press, and it has survived because
                nothing printed can do what a binding does. The colour stops hard at
                the edge of a tied thread, soft and sharp at once, the way nothing
                machine-made ever is.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={0.15 + i * 0.1}>
                  <div className="border-t border-white/20 pt-5">
                    <h3 className="font-display text-2xl font-medium">{step.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="mt-12 inline-block rounded-full border border-white/25 px-8 py-4 text-[16px] font-medium transition-all duration-300 hover:border-tar-orange hover:bg-tar-orange"
              >
                Come see the vats
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl">
              <Image
                src="/ig/DdtLo4JItSX.jpg"
                alt="Hands tying adire cloth in the studio"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
