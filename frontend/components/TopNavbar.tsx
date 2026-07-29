import { Bell, ChevronDown, Sparkles } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5 font-semibold tracking-tight text-slate-950">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-950 text-white"><Sparkles className="h-4 w-4" /></span>
          CraftHub
          <span className="hidden rounded border bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:inline">AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"><Bell className="h-4 w-4" /></button>
          <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 text-sm hover:bg-slate-100">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">LP</span>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">Lea Petersen</span><ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
