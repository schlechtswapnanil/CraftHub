import json
import math
from datetime import UTC, datetime
from pathlib import Path

from langchain_core.documents import Document

from rag.embedding_service import EmbeddingService
from utils.config import settings


class VectorStore:
    def __init__(self) -> None:
        self.index_path = Path(settings.vector_index_path)
        self.index_path.mkdir(parents=True, exist_ok=True)
        self.registry_path = self.index_path / "documents.json"
        self.store_path = self.index_path / "vectors.json"
        self.embedding_service = EmbeddingService()

    def _has_index(self) -> bool:
        return self.store_path.exists()

    def _read_store(self) -> list[dict]:
        if not self.store_path.exists():
            return []
        with self.store_path.open("r", encoding="utf-8") as handle:
            return json.load(handle)

    def _write_store(self, entries: list[dict]) -> None:
        with self.store_path.open("w", encoding="utf-8") as handle:
            json.dump(entries, handle, ensure_ascii=True, indent=2)

    @staticmethod
    def _cosine_distance(left: list[float], right: list[float]) -> float:
        dot_product = sum(left_value * right_value for left_value, right_value in zip(left, right))
        left_norm = math.sqrt(sum(value * value for value in left))
        right_norm = math.sqrt(sum(value * value for value in right))
        if left_norm == 0.0 or right_norm == 0.0:
            return 1.0
        return 1.0 - (dot_product / (left_norm * right_norm))

    def add_documents(self, documents: list[Document]) -> int:
        if not documents:
            return 0

        embeddings = self.embedding_service.embed([document.page_content for document in documents])
        entries = self._read_store()

        for document, embedding in zip(documents, embeddings):
            entries.append(
                {
                    "page_content": document.page_content,
                    "metadata": document.metadata,
                    "embedding": embedding,
                }
            )

        self._write_store(entries)
        return len(documents)

    def search(self, query: str, k: int) -> list[tuple[Document, float]]:
        if not self._has_index():
            return []

        query_embedding = self.embedding_service.embed_query(query)
        scored_results: list[tuple[Document, float]] = []

        for entry in self._read_store():
            document = Document(
                page_content=str(entry.get("page_content", "")),
                metadata=dict(entry.get("metadata", {})),
            )
            score = self._cosine_distance(query_embedding, list(entry.get("embedding", [])))
            scored_results.append((document, score))

        scored_results.sort(key=lambda item: item[1])
        return scored_results[:k]

    def _read_registry(self) -> list[dict]:
        if not self.registry_path.exists():
            return []
        with self.registry_path.open("r", encoding="utf-8") as handle:
            return json.load(handle)

    def _write_registry(self, entries: list[dict]) -> None:
        with self.registry_path.open("w", encoding="utf-8") as handle:
            json.dump(entries, handle, ensure_ascii=True, indent=2)

    def register_document(self, document_id: str, filename: str, chunk_count: int) -> None:
        entries = [entry for entry in self._read_registry() if entry["id"] != document_id]
        entries.append(
            {
                "id": document_id,
                "filename": filename,
                "uploaded_at": datetime.now(UTC).isoformat(),
                "status": "indexed",
                "chunk_count": chunk_count,
            }
        )
        self._write_registry(entries)

    def list_documents(self) -> list[dict]:
        return self._read_registry()
