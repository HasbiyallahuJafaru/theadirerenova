import Image from "next/image";
import Link from "next/link";
import { formatNaira, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-tar-sand/40">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] text-tar-muted">{product.category}</p>
          <p className="mt-0.5 font-display text-xl font-medium text-tar-ink">{product.name}</p>
        </div>
        <p className="pt-4 text-[15px] font-semibold text-tar-orange">
          {formatNaira(product.priceKobo)}
        </p>
      </div>
    </Link>
  );
}
