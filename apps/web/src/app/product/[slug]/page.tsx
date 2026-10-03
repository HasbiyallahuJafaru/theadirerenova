import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, shopProducts, formatNaira } from "@/lib/catalog";
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

  const gallery = [
    product.imageUrl,
    product.imageUrl.replace("800/1000", "900/1100"),
    product.imageUrl.replace("800/1000", "1000/900"),
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-[14px] text-tar-muted">
        <Link href="/shop" className="hover:text-tar-orange">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${product.categorySlug}`} className="hover:text-tar-orange">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-tar-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-tar-sand/40 sm:col-span-2">
            <Image
              src={gallery[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {gallery.slice(1).map((src, i) => (
            <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-tar-sand/40">
              <Image
                src={src}
                alt={`${product.name}, view ${i + 2}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[15px] text-tar-muted">{product.category}</p>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
            {product.name}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-tar-orange">
            {formatNaira(product.variants[0].priceKobo)}
            <span className="ml-2 align-middle text-[14px] font-normal text-tar-muted">
              from, per length
            </span>
          </p>

          <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-tar-muted">
            {product.description}
          </p>

          <AddToCart product={product} />

          {product.fabricStory && (
            <div className="mt-10 border-t border-tar-sand pt-6">
              <h2 className="font-display text-2xl font-medium text-tar-ink">The technique</h2>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-tar-muted">
                {product.fabricStory}
              </p>
            </div>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-tar-sand pt-6 text-[15px]">
            <div>
              <dt className="text-tar-muted">Material</dt>
              <dd className="mt-1 font-medium">100% cotton</dd>
            </div>
            <div>
              <dt className="text-tar-muted">Made in</dt>
              <dd className="mt-1 font-medium">Kaduna, Nigeria</dd>
            </div>
            <div>
              <dt className="text-tar-muted">Delivery</dt>
              <dd className="mt-1 font-medium">2 to 5 days nationwide</dd>
            </div>
            <div>
              <dt className="text-tar-muted">Payment</dt>
              <dd className="mt-1 font-medium">Paystack, pay in naira</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-tar-sand pt-14 md:mt-32">
          <h2 className="mb-10 font-display text-3xl font-medium tracking-[-0.02em] text-tar-green-deep">
            More {product.category.toLowerCase()}
          </h2>
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
