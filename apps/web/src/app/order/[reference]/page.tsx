import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default async function OrderPage({ params }: PageProps<"/order/[reference]">) {
  const { reference } = await params;

  return (
    <div className="mx-auto max-w-[720px] px-4 py-24 text-center md:px-8 md:py-32">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-tar-green-soft text-tar-green">
        <CheckCircle size={32} weight="duotone" />
      </span>
      <h1 className="mt-8 font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Order received
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-tar-muted">
        Your cloth is set aside under reference{" "}
        <span className="font-semibold text-tar-ink">{reference}</span>. We will message
        you on WhatsApp to confirm delivery, press it, fold it, and put it in your hands.
      </p>
        <p className="mt-2 text-[15px] text-tar-muted">
          Checking where it is? Save this reference. You can look it up any time under
          Track order, no account needed.
        </p>
        <a
          href="/shop"
        className="mt-10 inline-block rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
      >
        Continue shopping
      </a>
    </div>
  );
}
