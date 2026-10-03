import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, shopProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { AddToCart } from "./add-to-cart";

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? product.name : "Fabric" };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = shopProducts.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug,
  );

  // Gallery: the product's own image plus two others from the same collection.
  const gallery = [
    product.imageUrl,
    related[0]?.imageUrl ?? product.imageUrl,
    related[1]?.imageUrl ?? product.imageUrl,
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-10 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-[0.16em] text-tar-muted">
        <Link href="/shop" className="hover:text-tar-orange">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${product.categorySlug}`} className="hover:text-tar-orange">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={
                i === 0
                  ? "relative aspect-[4/5] overflow-hidden sm:col-span-2"
                  : "relative aspect-[4/5] overflow-hidden"
              }
            >
              <Image
                src={src}
                alt={`${product.name}, view ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
          <h1 className="font-display text-4xl font-medium tracking-[-0.02em] text-tar-ink md:text-[44px]">
            {product.name}
          </h1>

          <AddToCart product={product} />

          <details open className="group mt-10 border-t border-tar-sand pt-6">
            <summary className="flex cursor-pointer items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-tar-ink">
              Description
              <span className="text-xl font-light text-tar-orange transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-tar-muted">
              {product.description}
            </p>
          </details>

          {product.fabricStory && (
            <details className="group mt-2 border-t border-tar-sand pt-6">
              <summary className="flex cursor-pointer items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-tar-ink">
                The technique
                <span className="text-xl font-light text-tar-orange transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-tar-muted">
                {product.fabricStory}
              </p>
            </details>
          )}

          <details className="group mt-2 border-t border-tar-sand pt-6">
            <summary className="flex cursor-pointer items-center justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-tar-ink">
              Delivery &amp; care
              <span className="text-xl font-light text-tar-orange transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-tar-muted">
              100% cotton, dyed in Kaduna. Nationwide delivery in 2 to 5 days, confirmed
              on WhatsApp. Wash separately in cold water the first two times.
            </p>
          </details>

          <a
            href="https://wa.me/2340000000000"
            className="mt-8 inline-block text-[12px] font-medium uppercase tracking-[0.18em] text-tar-muted underline-offset-4 transition-colors hover:text-tar-orange hover:underline"
          >
            Ask a question
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28 md:mt-36">
          <h2 className="mb-12 font-display text-3xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-4xl">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
