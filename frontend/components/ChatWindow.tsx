"use client";

import { useState } from "react";

import { useChat } from "@/hooks/use-crafthub-api";
import { SourceCitationCard } from "@/components/SourceCitationCard";
import { ArrowUp, Bot, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatWindow() {
  const [question, setQuestion] = useState("");
  const chat = useChat();

  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <div><p className="text-sm font-medium text-brand-700">Knowledge assistant</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Ask your operational knowledge</h1><p className="mt-2 text-sm text-slate-500">Answers are grounded in your uploaded manuals, FAQs, and service documentation.</p></div>
      <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Bot className="h-4 w-4 text-brand-600" /> New question</div>
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Frage zu hochgeladenen Dokumenten stellen..."
        className="mt-3 min-h-28 w-full resize-y rounded-lg border border-slate-300 bg-slate-50/50 p-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />
      <div className="mt-3 flex items-center justify-between gap-3"><p className="hidden text-xs text-slate-400 sm:block">Use specific system names, error codes, or customer context.</p><Button
        type="button"
        onClick={() => chat.mutate(question)}
        disabled={!question || chat.isPending}
      >
        {chat.isPending ? "Preparing answer..." : <>Ask assistant <ArrowUp className="h-4 w-4" /></>}
      </Button></div></div>

      {chat.isPending ? (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="h-1 w-full overflow-hidden bg-slate-100"><div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] bg-brand-600" /></div>
          <div className="flex items-center gap-4 p-5 sm:p-6">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50"><span className="absolute h-10 w-10 animate-ping rounded-full bg-brand-100 opacity-75" /><Bot className="relative h-4 w-4 text-brand-700" /></span>
            <div><div className="flex items-center gap-1.5 text-sm font-medium text-slate-800"><span>Searching your knowledge base</span><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-600 [animation-delay:-0.3s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-600 [animation-delay:-0.15s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-600" /></span></div><p className="mt-1 text-sm text-slate-500">Retrieving relevant sources and preparing a grounded answer.</p></div>
          </div>
        </div>
      ) : null}

      {chat.data ? (
        <div className="space-y-4 rounded-xl border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Bot className="h-4 w-4 text-brand-600" /> CraftHub AI</div>
          <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {chat.data.answer}
          </div>
          <div className="border-t pt-4"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700"><FileSearch className="h-4 w-4 text-slate-400" /> Sources used ({chat.data.citations.length})</div><div className="space-y-2">
            {chat.data.citations.map((citation, index) => (
              <SourceCitationCard
                key={`${citation.document_id}-${citation.page}-${index}`}
                citation={citation}
              />
            ))}
          </div></div>
        </div>
      ) : null}
      {chat.isError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          The answer could not be generated. Check that the backend is running and OPENAI_API_KEY is configured.
        </p>
      ) : null}
    </section>
  );
}
