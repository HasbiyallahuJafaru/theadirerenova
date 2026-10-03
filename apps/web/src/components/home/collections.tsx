import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { collections } from "@/lib/catalog";
import { Reveal } from "@/components/reveal";

export function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-5xl">
          Four ways to hide the cloth from the dye
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-tar-muted">
          Every adire pattern comes from something standing between the cloth and the
          dye. Raffia, thread, starch, or a tight fold. Each one leaves a different mark.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-12" : ""}>
            <Link
              href={`/collections/${c.slug}`}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={c.imageUrl}
                  alt={`${c.name} fabric`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tar-green-deep/80 via-tar-green-deep/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-display text-2xl font-medium text-white">{c.name}</p>
                  <p className="mt-1 text-[13px] text-white/75">{c.description}</p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-300 group-hover:bg-tar-orange">
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
