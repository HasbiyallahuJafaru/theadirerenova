"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart, cartSubtotalKobo } from "@/lib/cart";
import { formatNaira } from "@/lib/catalog";
import { apiFetch } from "@/lib/api";

const nigerianStates = [
  "Kaduna", "Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo", "Ogun", "Enugu",
  "Delta", "Anambra", "Plateau", "Bauchi", "Sokoto", "Borno", "Edo", "Kwara",
];

interface CheckoutResponse {
  reference?: string;
  authorizationUrl?: string;
}

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotalKobo(items);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const shippingAddress = {
      fullName: String(form.get("fullName")),
      phone: String(form.get("phone")),
      email: String(form.get("email")) || undefined,
      state: String(form.get("state")),
      city: String(form.get("city")),
      street: String(form.get("street")),
      landmark: String(form.get("landmark")) || undefined,
    };

    const order = await apiFetch<CheckoutResponse>("/orders", {
      method: "POST",
      body: JSON.stringify({
        items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        shippingAddress,
      }),
    });

    if (order?.reference) {
      const payment = await apiFetch<{ authorizationUrl: string }>(
        "/payments/paystack/init",
        { method: "POST", body: JSON.stringify({ orderReference: order.reference }) },
      );
      if (payment?.authorizationUrl) {
        clear();
        window.location.href = payment.authorizationUrl;
        return;
      }
      clear();
      window.location.href = `/order/${order.reference}`;
      return;
    }

    // API not reachable yet (dev without backend): acknowledge gracefully.
    setStatus("error");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[720px] px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-5xl font-medium text-tar-green-deep">Nothing to check out</h1>
        <p className="mt-4 text-lg text-tar-muted">Add some cloth to your cart first.</p>
        <Link href="/shop" className="mt-8 inline-block rounded-full bg-tar-orange px-8 py-4 font-medium text-white hover:bg-tar-orange-deep">
          Shop fabrics
        </Link>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-tar-sand bg-white px-5 py-3.5 text-[15px] text-tar-ink placeholder:text-tar-muted/70 focus:border-tar-orange focus:outline-none";
  const label = "block text-[14px] font-medium text-tar-ink";

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 md:px-8 md:py-20">
      <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className={label}>Full name</label>
              <input id="fullName" name="fullName" required minLength={2} className={`${field} mt-2`} placeholder="Amina Yusuf" />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone (WhatsApp)</label>
              <input id="phone" name="phone" type="tel" required minLength={7} className={`${field} mt-2`} placeholder="0803 000 0000" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={label}>Email (optional)</label>
            <input id="email" name="email" type="email" className={`${field} mt-2`} placeholder="you@example.com" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="state" className={label}>State</label>
              <select id="state" name="state" required className={`${field} mt-2`}>
                {nigerianStates.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="city" className={label}>City / town</label>
              <input id="city" name="city" required minLength={2} className={`${field} mt-2`} placeholder="Kaduna" />
            </div>
          </div>

          <div>
            <label htmlFor="street" className={label}>Street address</label>
            <input id="street" name="street" required minLength={4} className={`${field} mt-2`} placeholder="House number, street, area" />
          </div>

          <div>
            <label htmlFor="landmark" className={label}>Nearest landmark (optional)</label>
            <input id="landmark" name="landmark" className={`${field} mt-2`} placeholder="e.g. beside Command Junction" />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-tar-sand bg-white/60 p-8">
          <h2 className="font-display text-2xl font-medium text-tar-ink">Your order</h2>
          <ul className="mt-6 space-y-4">
            {items.map((i) => (
              <li key={i.variantId} className="flex items-center gap-4">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-tar-sand/40">
                  <Image src={i.imageUrl} alt={i.productName} fill sizes="56px" className="object-cover" />
                </span>
                <span className="flex-1 text-[14px]">
                  {i.productName}
                  <span className="block text-tar-muted">
                    {i.variantName} × {i.quantity}
                  </span>
                </span>
                <span className="text-[14px] font-medium">
                  {formatNaira(i.unitPriceKobo * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-tar-sand pt-5 text-[15px]">
            <span className="text-tar-muted">Subtotal</span>
            <span className="font-semibold">{formatNaira(subtotal)}</span>
          </div>
          <p className="mt-2 text-[13px] text-tar-muted">Delivery is confirmed on WhatsApp before dispatch.</p>

          {status === "error" && (
            <p className="mt-4 rounded-xl bg-tar-orange-soft px-4 py-3 text-[14px] text-tar-orange-deep">
              We could not reach the checkout service. The backend API is not running yet.
              Try again once it is wired up.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-8 w-full rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep disabled:translate-y-0 disabled:opacity-60"
          >
            {status === "submitting" ? "Starting payment…" : "Pay with Paystack"}
          </button>
          <p className="mt-4 text-center text-[13px] text-tar-muted">
            Cards, bank transfer and USSD. Your payment is secured by Paystack.
          </p>
        </aside>
      </form>
    </div>
  );
}
