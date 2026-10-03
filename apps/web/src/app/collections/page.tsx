import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/catalog";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-6xl">
          Collections
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-tar-muted">
          Same vat, different hands. Each collection is one way of keeping the dye out.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08} className={i % 2 === 1 ? "md:mt-14" : ""}>
            <Link href={`/collections/${c.slug}`} className="group relative block overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={c.imageUrl}
                  alt={`${c.name} fabric`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tar-green-deep/80 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-3xl font-medium text-white">{c.name}</p>
                <p className="mt-1 text-[15px] text-white/75">{c.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
