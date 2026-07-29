from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router as api_router
from utils.config import settings


app = FastAPI(
    title="CraftHub API",
    version="0.1.0",
    description="AI-native operating hub backend for craft businesses.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
if settings.api_prefix:
    app.include_router(api_router, prefix=settings.api_prefix)
