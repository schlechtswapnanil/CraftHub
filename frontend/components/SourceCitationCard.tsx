import type { SourceCitation } from "@/lib/types";

export function SourceCitationCard({ citation }: { citation: SourceCitation }) {
  return (
    <div className="rounded-lg border bg-slate-50/70 p-3">
      <p className="text-sm font-medium text-slate-900">
        {citation.filename} <span className="font-normal text-slate-400">· Page {citation.page}</span>
      </p>
      <p className="mt-1 text-xs text-slate-600">{citation.snippet}</p>
    </div>
  );
}
