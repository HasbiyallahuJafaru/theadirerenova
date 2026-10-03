"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = ["The", "dye", "goes", "where", "the", "hand", "allows."];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100dvh-160px)] max-w-[1500px] items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.1fr_1fr] md:px-10 md:pb-24 md:pt-12">
        <div>
          <h1 className="font-display text-[clamp(3.25rem,8vw,6.75rem)] font-medium leading-[1.0] tracking-[-0.025em] text-tar-green-deep">
            {words.map((word, i) => (
              <motion.span
                key={word + i}
                className={
                  word === "hand" ? "mr-[0.28em] italic text-tar-orange" : "mr-[0.28em] inline-block"
                }
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-[48ch] text-lg leading-relaxed text-tar-muted"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Adire tied and dipped in our Kaduna studio. Run your hand across the
            raised lines where the raffia held. That texture is the signature, and
            no machine can copy it.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/shop"
              className="rounded-full bg-tar-orange px-9 py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep active:translate-y-0"
            >
              Shop fabrics
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-tar-green/30 px-9 py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-tar-green transition-all duration-300 hover:border-tar-green hover:bg-tar-green-soft"
            >
              See the craft
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative h-[420px] overflow-hidden rounded-2xl md:h-[560px]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
            <Image
              src="https://picsum.photos/seed/tar-hero/1000/1300"
              alt="Hand-dyed adire fabric spread out to dry"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
