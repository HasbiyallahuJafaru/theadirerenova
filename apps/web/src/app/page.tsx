import { Hero } from "@/components/home/hero";
import { ValueMarquee } from "@/components/home/marquee";
import { CollectionsGrid } from "@/components/home/collections";
import { FeaturedProducts } from "@/components/home/featured";
import { CraftSection } from "@/components/home/craft";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/ig-gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueMarquee />
      <CollectionsGrid />
      <FeaturedProducts />
      <CraftSection />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
