"use client";

import { useState } from "react";

import { useUpload } from "@/hooks/use-crafthub-api";
import { FileUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const upload = useUpload();

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700"><FileUp className="h-5 w-5" /></span><div><h2 className="font-semibold text-slate-950">Add to your knowledge base</h2><p className="mt-1 text-sm text-slate-500">Upload PDFs, manuals, and FAQs for source-backed answers.</p></div></div>
      <div className="mt-4 space-y-3">
        <label className="block cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-brand-400 hover:bg-brand-50/40">
        <input
          type="file"
          accept=".pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <span className="text-sm font-medium text-slate-700">{file ? file.name : "Choose a PDF to upload"}</span><span className="mt-1 block text-xs text-slate-500">PDF files only</span></label>
        <Button
          type="button"
          disabled={!file || upload.isPending}
          onClick={() => {
            if (file) upload.mutate(file);
          }}
        >
          <Upload className="h-4 w-4" />{upload.isPending ? "Uploading..." : "Upload document"}
        </Button>
      </div>
      {upload.data ? (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          {upload.data.filename} is {upload.data.status}.
        </p>
      ) : null}
    </section>
  );
}
