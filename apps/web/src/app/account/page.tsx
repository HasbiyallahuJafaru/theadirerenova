import Link from "next/link";

export const metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-20 md:px-8 md:py-28">
      <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Your account
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-tar-muted">
        Order history and saved addresses live here once sign-in is connected to Supabase
        Auth. Track any order right now with the reference we sent you.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/sign-in"
          className="rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
        >
          Sign in
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-tar-green/30 px-8 py-4 text-[16px] font-medium text-tar-green transition-colors hover:bg-tar-green-soft"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
