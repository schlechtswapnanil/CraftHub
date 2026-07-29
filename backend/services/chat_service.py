import logging

from langchain_groq import ChatGroq

from models.schemas import ChatRequest, ChatResponse
from rag.citation_formatter import CitationFormatter
from rag.prompt_builder import PromptBuilder
from rag.retriever import Retriever
from utils.config import settings

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self) -> None:
        self.retriever = Retriever()
        self.prompt_builder = PromptBuilder()
        self.citation_formatter = CitationFormatter()
        self.llm: ChatGroq | None = None

    def _build_llm(self) -> ChatGroq:
        if settings.llm_provider.lower() != "groq":
            raise ValueError("Only 'groq' provider is currently supported.")

        return ChatGroq(
            model=settings.llm_model or "llama-3.3-70b-versatile",
            api_key=settings.groq_api_key,
            temperature=0.1,
        )

    def _get_llm(self) -> ChatGroq:
        if self.llm is None:
            self.llm = self._build_llm()
        return self.llm

    async def ask(self, payload: ChatRequest) -> ChatResponse:
        retrieved_chunks = self.retriever.retrieve(payload.question)
        if not settings.groq_api_key:
            answer = self._extractive_answer(retrieved_chunks)
        else:
            try:
                if retrieved_chunks:
                    prompt = self.prompt_builder.build_chat_prompt(payload.question, retrieved_chunks)
                else:
                    prompt = self.prompt_builder.build_no_context_prompt(payload.question)
                llm_response = self._get_llm().invoke(prompt)
                answer = (
                    llm_response.content
                    if isinstance(llm_response.content, str)
                    else str(llm_response.content)
                )
            except Exception:
                logger.warning("LLM response failed; returning source-grounded fallback.", exc_info=True)
                answer = self._extractive_answer(retrieved_chunks)

        sources = self.citation_formatter.format(retrieved_chunks)
        if retrieved_chunks:
            confidence = round(
                sum(item["confidence"] for item in retrieved_chunks) / len(retrieved_chunks),
                4,
            )
        else:
            confidence = 0.0

        return ChatResponse(
            answer=answer,
            citations=sources,
            confidence=confidence,
            conversation_id=payload.conversation_id or "conv_generated",
        )

    @staticmethod
    def _extractive_answer(retrieved_chunks: list[dict]) -> str:
        if not retrieved_chunks:
            return (
                "No answer was found in the approved knowledge base. "
                "Please route this question to a qualified team member."
            )
        return (
            "Based on the approved knowledge base: "
            f"{retrieved_chunks[0]['snippet']}"
        )