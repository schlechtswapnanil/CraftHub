"use client";

import { Layout } from "@/components/Layout";
import { UploadCard } from "@/components/UploadCard";
import { useDocuments } from "@/hooks/use-crafthub-api";

export default function UploadPage() {
  const documents = useDocuments();

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <UploadCard />
        <section className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold text-slate-950">Documents</h2>
          <p className="mt-1 text-sm text-slate-500">Content available to the knowledge assistant.</p>
          <div className="mt-3 space-y-2">
            {documents.data?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-lg border bg-slate-50/60 p-3 text-sm text-slate-700">
                <span className="font-medium">{doc.filename}</span><span className="text-xs capitalize text-slate-500">{doc.status}</span>
              </div>
            ))}
            {documents.isLoading ? <div className="h-12 animate-pulse rounded-lg bg-slate-100" /> : null}
            {!documents.isLoading && documents.data?.length === 0 ? <p className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-500">No documents yet. Upload your first PDF above.</p> : null}
          </div>
        </section>
      </div>
    </Layout>
  );
}
