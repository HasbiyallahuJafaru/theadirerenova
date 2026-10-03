"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const words = ["The", "dye", "goes", "where", "the", "hand", "allows."];

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative min-h-[calc(100dvh-72px)] overflow-hidden bg-tar-green-deep">
      {/* Video backdrop; falls back to a still if /hero.mp4 is missing.
          Drop an Instagram clip of the dyeing process at public/hero.mp4. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        style={{ opacity: videoReady && !videoFailed ? 1 : 0 }}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoFailed(true)}
        aria-hidden
      />
      {(!videoReady || videoFailed) && (
        <Image
          src="https://picsum.photos/seed/tar-hero/1600/1200"
          alt="Hand-dyed adire fabric spread out to dry"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-tar-green-deep/90 via-tar-green-deep/55 to-tar-green-deep/25" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-72px)] max-w-[1400px] items-center px-4 pb-16 pt-10 md:px-8">
        <div className="max-w-[640px]">
          <h1 className="font-display text-[clamp(3.25rem,8vw,6.75rem)] font-medium leading-[1.0] tracking-[-0.025em] text-white">
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
            className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/85"
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
              className="rounded-full bg-tar-orange px-9 py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep active:translate-y-0"
            >
              Shop fabrics
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/35 px-9 py-[18px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              See the craft
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
