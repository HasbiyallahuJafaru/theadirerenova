import Image from "next/image";
import Link from "next/link";
import { formatNaira, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-tar-green-deep/0 transition-colors duration-500 group-hover:bg-tar-green-deep/10" />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <p className="font-display text-[22px] font-medium leading-tight text-tar-ink">
          {product.name}
        </p>
        <p className="shrink-0 text-[13px] font-medium tracking-[0.04em] text-tar-muted transition-colors group-hover:text-tar-orange">
          {formatNaira(product.priceKobo)}
        </p>
      </div>
    </Link>
  );
}
