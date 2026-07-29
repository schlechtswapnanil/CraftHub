import { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar />
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar />
        <main className="min-w-0 w-full p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
