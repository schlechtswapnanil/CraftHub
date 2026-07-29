import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">CraftHub AI</p><h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Operations, grounded in knowledge.</h1>
        <p className="mt-4 text-lg text-slate-600">
          The AI operating workspace for service teams that need answers they can trust.
        </p>
        <div className="mt-8">
          <Link
            href="/login"
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Enter workspace
          </Link>
        </div>
      </section>
    </main>
  );
}
