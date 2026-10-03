export const metadata = { title: "FAQ & Shipping" };

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Kaduna and Abuja: 1 to 2 days. Lagos and the south: 3 to 5 days. We dispatch with trusted couriers and share tracking on WhatsApp.",
  },
  {
    q: "What does delivery cost?",
    a: "Delivery is calculated and confirmed with you on WhatsApp before dispatch, based on your location and order size.",
  },
  {
    q: "How do I pay?",
    a: "Checkout is powered by Paystack. You can pay with any Nigerian card, bank transfer, or USSD. All prices are in naira.",
  },
  {
    q: "Can two pieces of the same fabric match exactly?",
    a: "No, and that is the beauty of adire. The pattern comes from hand-tied bindings, so every cloth is one of a kind. If you need matching cloth for aso-ebi, we dye them in the same batch so they sit as sisters, not twins.",
  },
  {
    q: "Do you take bulk or aso-ebi orders?",
    a: "Yes. Message us on WhatsApp with your quantity and colours. Bulk orders take 7 to 14 days to dye and dry.",
  },
  {
    q: "How do I care for adire?",
    a: "Wash separately in cold water the first two times, mild soap, no bleach. The colours settle after the first wash and last for years.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-14 md:px-8 md:py-20">
      <div className="max-w-xl">
        <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep md:text-6xl">
          Questions, answered
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-tar-muted">
          Everything about ordering, delivery and caring for your cloth.
        </p>
      </div>

      <div className="mt-12 divide-y divide-tar-sand border-y border-tar-sand">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-6">
            <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-2xl font-medium text-tar-ink marker:content-none">
              {faq.q}
              <span className="shrink-0 text-2xl font-light text-tar-orange transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-tar-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
