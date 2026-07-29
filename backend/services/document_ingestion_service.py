import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from models.schemas import DocumentItem, UploadResponse
from rag.document_loader import DocumentLoader
from rag.vector_store import VectorStore
from utils.config import settings


class DocumentIngestionService:
    def __init__(self) -> None:
        self.document_loader = DocumentLoader()
        self.vector_store = VectorStore()
        self.upload_path = Path(settings.upload_storage_path)
        self.upload_path.mkdir(parents=True, exist_ok=True)

    def _save_upload(self, file: UploadFile) -> Path:
        destination = self.upload_path / file.filename
        with destination.open("wb") as output:
            shutil.copyfileobj(file.file, output)
        return destination

    def ingest_pdf(self, file: UploadFile) -> UploadResponse:
        document_id = f"doc_{uuid4().hex}"
        file_path = self._save_upload(file)
        chunks = self.document_loader.load_and_chunk_pdf(file_path, document_id, file.filename or "unknown.pdf")
        chunk_count = self.vector_store.add_documents(chunks)
        self.vector_store.register_document(document_id, file.filename or "unknown.pdf", chunk_count)
        return UploadResponse(
            document_id=document_id,
            filename=file.filename or "unknown.pdf",
            status="indexed",
            chunk_count=chunk_count,
        )

    def list_documents(self) -> list[DocumentItem]:
        entries = self.vector_store.list_documents()
        return [
            DocumentItem(
                id=str(entry["id"]),
                filename=str(entry["filename"]),
                uploaded_at=str(entry["uploaded_at"]),
                status=str(entry["status"]),
            )
            for entry in entries
        ]
