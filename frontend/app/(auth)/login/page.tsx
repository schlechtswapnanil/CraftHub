import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-brand-700">CraftHub AI</p><h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to your operations workspace.</p>
        <div className="mt-6 space-y-3">
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="Work email" />
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Password"
            type="password"
          />
          <Link
            href="/dashboard"
            className="block rounded-lg bg-slate-950 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:bg-slate-800"
          >
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
