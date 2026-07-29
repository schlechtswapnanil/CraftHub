from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    api_host: str = Field(default="0.0.0.0")
    api_port: int = Field(default=8000)
    api_prefix: str = Field(default="/api")
    cors_origins_raw: str = Field(
        default="http://localhost:3000", validation_alias="CORS_ORIGINS"
    )

    llm_provider: str = Field(default="groq")
    llm_model: str = Field(default="llama-3.3-70b-versatile")
    groq_api_key: str = Field(default="")
    embedding_model: str = Field(
        default="sentence-transformers/all-MiniLM-L6-v2",
    )

    supabase_url: str = Field(default="")
    supabase_anon_key: str = Field(default="")
    supabase_service_role_key: str = Field(default="")
    vector_index_path: str = Field(default="./data/faiss_index")
    upload_storage_path: str = Field(default="./data/uploads")
    rag_chunk_size: int = Field(default=1000)
    rag_chunk_overlap: int = Field(default=150)
    rag_top_k: int = Field(default=4)

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


settings = Settings()
