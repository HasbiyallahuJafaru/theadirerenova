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
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-tar-ink transition-colors group-hover:text-tar-orange">
          {product.name}
        </p>
        <p className="mt-1 text-[12px] tracking-[0.04em] text-tar-muted">
          from {formatNaira(product.priceKobo)}
        </p>
      </div>
    </Link>
  );
}
