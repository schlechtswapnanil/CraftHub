"use client";

import { useState } from "react";
import { CheckCircle2, Mail, X } from "lucide-react";

import { Layout } from "@/components/Layout";
import { ServiceTicketCard } from "@/components/ServiceTicketCard";
import { Button } from "@/components/ui/button";
import { useDraftEmail } from "@/hooks/use-crafthub-api";
import type { DraftEmailResponse } from "@/lib/types";

const tickets = [
  { id: "SR-1001", customer: "M. Mustermann", email: "max@example.de", type: "Heizung", status: "new" as const, issue: "Heating system does not start." },
  { id: "SR-1002", customer: "A. Schmidt", email: "anna.schmidt@example.de", type: "Sanitär", status: "scheduled" as const, issue: "Request for a plumbing service appointment." },
  { id: "SR-1003", customer: "L. Bauer", email: "lena.bauer@example.de", type: "Elektro", status: "in_progress" as const, issue: "Electrical service request is being assessed." }
];

type EmailPreview = DraftEmailResponse & { customer: string };

export default function ServiceRequestsPage() {
  const draft = useDraftEmail();
  const [preview, setPreview] = useState<EmailPreview | null>(null);

  const prepareEmail = async (ticket: (typeof tickets)[number]) => {
    const result = await draft.mutateAsync({
      request_id: ticket.id,
      customer_name: ticket.customer,
      customer_email: ticket.email,
      service_summary: `${ticket.type}: ${ticket.issue}`,
      proposed_slots: ["31 July, 09:00", "31 July, 14:00"]
    });
    setPreview({ ...result, customer: ticket.customer });
  };

  const sendEmail = () => {
    if (!preview) return;
    const query = new URLSearchParams({ subject: preview.subject, body: preview.body });
    window.location.href = `mailto:${encodeURIComponent(preview.to)}?${query.toString()}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <section><p className="text-sm font-medium text-brand-700">Operations</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Service requests</h1><p className="mt-2 text-sm text-slate-500">Track incoming work and send customers a polished appointment follow-up.</p></section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <ServiceTicketCard key={ticket.id} {...ticket} onSendEmail={() => prepareEmail(ticket)} isSending={draft.isPending} />
          ))}
        </section>
        {draft.isError ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">We couldn’t prepare the follow-up email. Check that the backend is running and try again.</p> : null}
        {preview ? <section className="rounded-xl border bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-sm font-medium text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Follow-up ready</div><h2 className="mt-2 font-semibold text-slate-950">Email to {preview.customer}</h2><p className="mt-1 text-sm text-slate-500">Review the generated message, then send it with your email client.</p></div><button aria-label="Close email preview" onClick={() => setPreview(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-4 w-4" /></button></div><div className="mt-5 rounded-lg border bg-slate-50 p-4"><p className="text-xs font-medium uppercase tracking-wide text-slate-400">To</p><p className="mt-1 text-sm text-slate-700">{preview.to}</p><p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">Subject</p><p className="mt-1 text-sm font-medium text-slate-800">{preview.subject}</p><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">{preview.body}</p></div><div className="mt-4 flex justify-end"><Button onClick={sendEmail}><Mail className="h-4 w-4" /> Send email</Button></div></section> : null}
      </div>
    </Layout>
  );
}
