from rag.vector_store import VectorStore
from utils.config import settings


class Retriever:
    def __init__(self) -> None:
        self.vector_store = VectorStore()

    @staticmethod
    def _score_to_confidence(score: float) -> float:
        confidence = 1.0 / (1.0 + max(score, 0.0))
        return round(confidence, 4)

    def retrieve(self, question: str) -> list[dict]:
        hits = self.vector_store.search(question, k=settings.rag_top_k)
        results: list[dict] = []
        for doc, score in hits:
            results.append(
                {
                    "document_id": str(doc.metadata.get("document_id", "unknown")),
                    "filename": str(doc.metadata.get("filename", "unknown.pdf")),
                    "page": int(doc.metadata.get("page", 0)),
                    "snippet": doc.page_content.strip(),
                    "score": float(score),
                    "confidence": self._score_to_confidence(float(score)),
                }
            )
        return results
