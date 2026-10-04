import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { instagramPosts } from "@/lib/instagram";
import { Reveal } from "@/components/reveal";

export function InstagramGallery() {
  const posts = instagramPosts.slice(0, 12);

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-24 md:px-10 md:py-36">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-tar-green-deep">
          Straight from our Instagram
        </h2>
        <a
          href="https://www.instagram.com/theadirerenova/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-tar-ink underline-offset-8 transition-colors hover:text-tar-orange hover:underline"
        >
          <InstagramLogo size={18} weight="light" />
          Follow @theadirerenova
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {posts.map((post, i) => (
          <Reveal key={post.igId} delay={(i % 4) * 0.06}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden"
              aria-label={post.caption.slice(0, 80) || "Instagram post"}
            >
              <Image
                src={post.image}
                alt={post.caption.slice(0, 100) || "Adire fabric from our Instagram"}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-tar-green-deep/0 transition-colors duration-500 group-hover:bg-tar-green-deep/25" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
