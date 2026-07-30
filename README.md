# CraftHub MVP

AI-native operating hub MVP for German craft businesses (Handwerker).
<img width="963" height="541" alt="image" src="https://github.com/user-attachments/assets/a70236e2-94d8-4f9a-bd03-a4f30c40676a" />


## Architecture

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, shadcn/ui-style component structure, React Query
- **Backend**: FastAPI, Pydantic, LangChain-compatible RAG interfaces, FAISS placeholder integration points
- **Database**: Supabase (placeholder client and config wiring)
- **Deployment**: Vercel (frontend), Railway (backend)

## Monorepo Structure

```text
CraftHub/
  frontend/
  backend/
  docs/
  prompts/
  sample_data/
  scripts/
  README.md
  docker-compose.yml
  .env.example
```

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend defaults to `http://localhost:3000`.

## Running the Backend

```bash
cd backend
py -3.12 -m venv ../.venv312
../.venv312/Scripts/python -m pip install -r requirements.txt
../.venv312/Scripts/python -m uvicorn main:app --reload --port 8000
```

Use Python 3.12: the pinned NumPy/LangChain dependency set does not support newer Python releases. Node.js LTS is required for the frontend.

Backend defaults to `http://localhost:8000`.

## Local Full Stack with Docker Compose

```bash
docker compose up --build
```

## Deployment

See `docs/deployment-handoff.md` for the exact Railway/Vercel handoff and post-deploy smoke test.

### Frontend (Vercel)
- Import `frontend/` as project root.
- Set `NEXT_PUBLIC_API_BASE_URL` environment variable to Railway backend URL.

### Backend (Railway)
- Deploy from `backend/`.
- Use `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- Configure environment variables from `.env.example`.

## Notes

- RAG services are intentionally scaffolded with clean interfaces and TODO markers.


- `/upload` ingests PDFs, chunks content, and stores deterministic local lexical vectors for the MVP. The embedding interface can be swapped for an approved semantic provider in production.
<img width="929" height="527" alt="image" src="https://github.com/user-attachments/assets/0b434936-ccf2-4de3-a3c4-14ac591f764c" />

- `/chat` performs retrieval and returns `answer`, `sources`, and `confidence`.
<img width="1467" height="925" alt="image" src="https://github.com/user-attachments/assets/59d9dc3e-cdd3-4486-8fc3-44e9f015a088" />
