"use client";

import { LoaderCircle, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

type ServiceTicketCardProps = {
  id: string;
  customer: string;
  type: string;
  status: "new" | "scheduled" | "in_progress";
  onSendEmail: () => void;
  isSending?: boolean;
};

export function ServiceTicketCard({
  id,
  customer,
  type,
  status,
  onSendEmail,
  isSending = false
}: ServiceTicketCardProps) {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md hover:shadow-slate-950/[0.04]">
      <div className="flex items-start justify-between gap-3"><p className="text-xs font-medium text-slate-400">{id}</p><p className="inline-flex rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 text-[11px] font-medium capitalize text-brand-700">{status.replace("_", " ")}</p></div>
      <h3 className="mt-4 text-base font-semibold text-slate-950">{customer}</h3>
      <p className="mt-1 text-sm text-slate-500">{type} service request</p>
      <Button className="mt-5 w-full" variant="outline" size="sm" onClick={onSendEmail} disabled={isSending}>
        {isSending ? <><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Preparing email…</> : <><Mail className="h-3.5 w-3.5" /> Send follow-up</>}
      </Button>
    </article>
  );
}
