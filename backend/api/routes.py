from functools import lru_cache

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from models.schemas import (
    ChatRequest,
    ChatResponse,
    DocumentItem,
    DraftEmailRequest,
    DraftEmailResponse,
    HealthResponse,
    IntakeRequest,
    IntakeResponse,
    UploadResponse,
)
from services.chat_service import ChatService
from services.document_ingestion_service import DocumentIngestionService
from services.email_draft_service import EmailDraftService
from services.intake_service import IntakeService

router = APIRouter(tags=["crafthub"])
intake_service = IntakeService()
email_service = EmailDraftService()


@lru_cache
def get_chat_service() -> ChatService:
    return ChatService()


@lru_cache
def get_document_service() -> DocumentIngestionService:
    return DocumentIngestionService()


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok")


@router.post("/upload", response_model=UploadResponse)
async def upload(file: UploadFile = File(...)) -> UploadResponse:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing filename.")
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF uploads are supported.")
    return get_document_service().ingest_pdf(file)


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    try:
        return await get_chat_service().ask(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/intake", response_model=IntakeResponse)
async def intake(payload: IntakeRequest) -> IntakeResponse:
    return await intake_service.create_service_request(payload)


@router.post("/draft-email", response_model=DraftEmailResponse)
async def draft_email(payload: DraftEmailRequest) -> DraftEmailResponse:
    return await email_service.draft_follow_up(payload)


@router.get("/documents", response_model=list[DocumentItem])
async def documents() -> list[DocumentItem]:
    return get_document_service().list_documents()
