from typing import Literal

from pydantic import BaseModel, Field


class SourceCitation(BaseModel):
    document_id: str
    filename: str
    page: int
    snippet: str
    score: float


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    conversation_id: str | None = None


class ChatResponse(BaseModel):
    answer: str
    citations: list[SourceCitation]
    confidence: float = Field(ge=0.0, le=1.0)
    conversation_id: str


class UploadResponse(BaseModel):
    document_id: str
    filename: str
    status: Literal["queued", "indexed", "failed"]
    chunk_count: int = 0


class DocumentItem(BaseModel):
    id: str
    filename: str
    uploaded_at: str
    status: Literal["queued", "indexed", "failed"]


class IntakeRequest(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    service_type: str
    issue_description: str
    preferred_date: str | None = None


class IntakeResponse(BaseModel):
    request_id: str
    status: Literal["created", "queued"]
    summary: str


class DraftEmailRequest(BaseModel):
    request_id: str
    customer_name: str
    customer_email: str
    service_summary: str
    proposed_slots: list[str] = Field(default_factory=list)


class DraftEmailResponse(BaseModel):
    subject: str
    body: str
    to: str


class HealthResponse(BaseModel):
    status: Literal["ok"]
