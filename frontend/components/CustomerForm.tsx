"use client";

import { FormEvent, useState } from "react";

import { useDraftEmail, useIntake } from "@/hooks/use-crafthub-api";
import { Button } from "@/components/ui/button";

export function CustomerForm() {
  const intake = useIntake();
  const draft = useDraftEmail();
  const [form, setForm] = useState({
    customer_name: "Max Mustermann",
    email: "max@example.de",
    phone: "+49 151 0000000",
    address: "Musterstrasse 1, 20095 Hamburg",
    service_type: "Heizung",
    issue_description: "Heizung startet nicht.",
    preferred_date: ""
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await intake.mutateAsync(form);
    await draft.mutateAsync({
      request_id: result.request_id,
      customer_name: form.customer_name,
      customer_email: form.email,
      service_summary: result.summary,
      proposed_slots: ["2026-07-31 09:00", "2026-07-31 14:00"]
    });
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
      <div><p className="text-sm font-medium text-brand-700">Service operations</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Create a service request</h1><p className="mt-2 text-sm text-slate-500">Capture customer details and let CraftHub prepare the follow-up.</p></div>
      <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          value={value}
          placeholder={key}
          onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      ))}
      </div>
      <Button
        type="submit"
        disabled={intake.isPending || draft.isPending}
      >
        {intake.isPending || draft.isPending
          ? "Verarbeite..."
          : "Service Request + Follow-up Email"}
      </Button>
      {intake.data ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Service request {intake.data.request_id} created.
        </div>
      ) : null}
      {draft.data ? (
        <div className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
          Draft Subject: {draft.data.subject}
        </div>
      ) : null}
    </form>
  );
}
