"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [reference, setReference] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ref = reference.trim().toUpperCase();
    if (ref) router.push(`/order/${encodeURIComponent(ref)}`);
  }

  const field =
    "w-full rounded-xl border border-tar-sand bg-white px-5 py-3.5 text-[15px] uppercase tracking-[0.08em] text-tar-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-tar-muted/70 focus:border-tar-orange focus:outline-none";

  return (
    <div className="mx-auto max-w-[560px] px-4 py-20 md:px-8 md:py-28">
      <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Track your order
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-tar-muted">
        No account needed. Enter the reference we sent you on WhatsApp, something like
        TAR-7K3QF2, and we will show you where your cloth is.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="order-reference" className="sr-only">
          Order reference
        </label>
        <input
          id="order-reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
          minLength={4}
          placeholder="TAR-XXXXXX"
          className={field}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-tar-orange px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
        >
          Find my order
        </button>
      </form>
    </div>
  );
}
