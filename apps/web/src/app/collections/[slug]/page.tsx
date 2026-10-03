import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, shopProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const products = shopProducts.filter((p) => p.categorySlug === slug);

  return (
    <div>
      <div className="relative h-[46vh] min-h-[340px] overflow-hidden">
        <Image
          src={collection.imageUrl}
          alt={`${collection.name} collection`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tar-green-deep/85 to-tar-green-deep/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-10 md:px-8">
          <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-white md:text-6xl">
            {collection.name}
          </h1>
          <p className="mt-2 text-lg text-white/80">{collection.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
