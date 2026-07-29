import { Layout } from "@/components/Layout";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6"><section><p className="text-sm font-medium text-brand-700">Workspace</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Settings</h1><p className="mt-2 text-sm text-slate-500">Configure the AI services connected to your workspace.</p></section>
      <section className="space-y-5 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
        <div><h2 className="font-semibold text-slate-950">AI configuration</h2><p className="mt-1 text-sm text-slate-500">These values control the models used for answering and retrieval.</p></div>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="LLM Provider" />
          <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="LLM Model" />
          <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="API Base URL" />
          <input
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Embedding Model"
          />
        </div>
      </section>
      </div>
    </Layout>
  );
}
