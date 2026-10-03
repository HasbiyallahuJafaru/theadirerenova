import Link from "next/link";

export const metadata = { title: "Sign in" };

const field =
  "w-full rounded-xl border border-tar-sand bg-white px-5 py-3.5 text-[15px] text-tar-ink placeholder:text-tar-muted/70 focus:border-tar-orange focus:outline-none";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-[440px] px-4 py-20 md:px-8 md:py-28">
      <h1 className="font-display text-5xl font-medium tracking-[-0.02em] text-tar-green-deep">
        Welcome back
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-tar-muted">
        Sign in to track your orders. You can also check out without an account.
      </p>

      <form className="mt-10 space-y-5">
        <div>
          <label htmlFor="email" className="block text-[14px] font-medium">Email</label>
          <input id="email" name="email" type="email" required className={`${field} mt-2`} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="block text-[14px] font-medium">Password</label>
          <input id="password" name="password" type="password" required minLength={8} className={`${field} mt-2`} placeholder="Your password" />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-tar-orange px-8 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tar-orange-deep"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-[14px] text-tar-muted">
        New here?{" "}
        <Link href="/sign-up" className="font-medium text-tar-orange hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
