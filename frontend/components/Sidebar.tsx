"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, FileText, LayoutDashboard, Settings, Upload, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/chat", label: "Knowledge chat", icon: Bot },
  { href: "/upload", label: "Knowledge base", icon: Upload },
  { href: "/intake", label: "New request", icon: FileText },
  { href: "/service-requests", label: "Service requests", icon: Wrench },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r bg-white/80 px-3 py-5 md:block">
      <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</p>
      <nav className="space-y-1">
        {links.map((link) => (
          (() => { const Icon = link.icon; return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-slate-100 text-slate-950"
                : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.8} />
            {link.label}
          </Link>
          ); })()
        ))}
      </nav>
      <div className="mt-8 rounded-lg border bg-slate-50 p-3">
        <p className="text-xs font-medium text-slate-700">AI workspace</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Ground every answer in your team’s knowledge.</p>
      </div>
    </aside>
  );
}
