const items = [
  "Tied by hand in Kaduna",
  "Cotton that breathes",
  "One of one, every cloth",
  "Delivered across Nigeria",
  "Pay in naira",
];

export function ValueMarquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-tar-green-deep/20 bg-tar-green py-4">
      <div className="marquee-track flex w-max items-center gap-12 pr-12">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-xl italic text-white/90">{item}</span>
            <span className="size-1.5 rounded-full bg-tar-orange" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
