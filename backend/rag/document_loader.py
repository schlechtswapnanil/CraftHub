from pathlib import Path

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

from utils.config import settings


class DocumentLoader:
    def __init__(self) -> None:
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.rag_chunk_size,
            chunk_overlap=settings.rag_chunk_overlap,
        )

    def load_and_chunk_pdf(self, file_path: Path, document_id: str, filename: str) -> list[Document]:
        loader = PyPDFLoader(file_path.as_posix())
        pages = loader.load()

        normalized_pages: list[Document] = []
        for page_doc in pages:
            page_number = int(page_doc.metadata.get("page", 0)) + 1
            page_doc.metadata["document_id"] = document_id
            page_doc.metadata["filename"] = filename
            page_doc.metadata["page"] = page_number
            normalized_pages.append(page_doc)

        chunks = self.splitter.split_documents(normalized_pages)
        for index, chunk in enumerate(chunks):
            chunk.metadata["chunk_id"] = index

        return chunks
