# Deployment handoff

## What can be deployed now

- **Frontend:** Vercel project rooted at `frontend/`.
- **Backend:** Railway service rooted at `backend/`, using the included Dockerfile.

The backend Dockerfile honors Railway's injected `PORT`. The frontend is configured by `NEXT_PUBLIC_API_BASE_URL` at build time.

## Railway

1. Create a service from this repository; set root directory to `backend`.
2. Use Dockerfile deployment.
3. Set `CORS_ORIGINS` to the final Vercel URL (for example `https://crafthub.vercel.app`).
4. Set `OPENAI_API_KEY` only if you want LLM-generated responses. The cited extractive fallback works without it.
5. Copy the deployed public backend URL.

## Vercel

1. Import this repository; set root directory to `frontend`.
2. Set `NEXT_PUBLIC_API_BASE_URL` to the Railway URL, with no trailing slash.
3. Deploy, then add the resulting Vercel URL to Railway's `CORS_ORIGINS`.
4. Redeploy Vercel after changing `NEXT_PUBLIC_API_BASE_URL` because it is a build-time public variable.

## Smoke test after deployment

1. Visit `<backend-url>/health`; expect `{"status":"ok"}`.
2. Upload one PDF at `<frontend-url>/upload`.
3. Ask the demo question at `<frontend-url>/chat` and confirm an answer plus at least one PDF/page citation.

## Submission links

Add these to the final email:

- Live demo: `https://…`
- Repository: `https://github.com/…`
- One-pager: `docs/one-pager.md` (export to PDF if desired)
- Loom: `https://www.loom.com/share/…`
