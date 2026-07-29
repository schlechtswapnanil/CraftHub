import type {
  ChatResponse,
  DocumentItem,
  DraftEmailResponse,
  IntakeResponse
} from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  return apiFetch<DocumentItem[]>("/documents");
}

export async function sendChatQuestion(question: string): Promise<ChatResponse> {
  return apiFetch<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({ question })
  });
}

export async function submitIntake(payload: {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  issue_description: string;
  preferred_date?: string;
}): Promise<IntakeResponse> {
  return apiFetch<IntakeResponse>("/intake", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function draftEmail(payload: {
  request_id: string;
  customer_name: string;
  customer_email: string;
  service_summary: string;
  proposed_slots: string[];
}): Promise<DraftEmailResponse> {
  return apiFetch<DraftEmailResponse>("/draft-email", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function uploadDocument(file: File): Promise<{
  document_id: string;
  filename: string;
  status: "queued" | "indexed" | "failed";
}> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return response.json();
}
