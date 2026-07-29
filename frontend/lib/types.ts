export type SourceCitation = {
  document_id: string;
  filename: string;
  page: number;
  snippet: string;
  score: number;
};

export type ChatResponse = {
  answer: string;
  citations: SourceCitation[];
  conversation_id: string;
};

export type DocumentItem = {
  id: string;
  filename: string;
  uploaded_at: string;
  status: "queued" | "indexed" | "failed";
};

export type IntakeResponse = {
  request_id: string;
  status: "created" | "queued";
  summary: string;
};

export type DraftEmailResponse = {
  subject: string;
  body: string;
  to: string;
};
