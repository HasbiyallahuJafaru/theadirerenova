import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { collections } from "@/lib/catalog";
import { Reveal } from "@/components/reveal";

export function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-24 md:px-10 md:py-36">
      <div className="mb-16 max-w-2xl">
        <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-tar-green-deep">
          Four ways to hide the cloth from the dye
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-tar-muted">
          Every adire pattern comes from something standing between the cloth and the
          dye. Raffia, thread, starch, or a tight fold. Each one leaves a different mark.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-16" : ""}>
            <Link
              href={`/collections/${c.slug}`}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[4/6]">
                <Image
                  src={c.imageUrl}
                  alt={`${c.name} fabric`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tar-green-deep/85 via-tar-green-deep/15 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-display text-[28px] font-medium leading-none text-white">
                    {c.name}
                  </p>
                  <p className="mt-2 max-w-[24ch] text-[13px] leading-snug text-white/70">
                    {c.description}
                  </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-tar-orange group-hover:bg-tar-orange">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
