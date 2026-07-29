# CraftHub demo runbook

## 1. Start the application

Open a new PowerShell terminal in the repository root and run:

```powershell
.\scripts\dev.ps1
```

Set a valid `OPENAI_API_KEY` in `backend/.env` (copy values from `.env.example` first) for an LLM-generated response. Without a key, CraftHub deliberately returns an extractive answer from the retrieved source, so the grounded demo still works without inventing content.

## 2. Load the real demo material

At `http://localhost:3000/upload`, upload these PDFs one at a time:

- `sample_data/heating_knowledge/verbraucherzentrale_when_to_replace_heating.pdf`
- `sample_data/heating_knowledge/verbraucherzentrale_energy_glossary.pdf`

They are public Verbraucherzentrale material; the original URLs and access date are recorded in `docs/one-pager.md`.

Do this before recording; PDF extraction and indexing can take a moment.

## 3. Record this exact proof

1. Open **Knowledge Chat**.
2. Ask: `What should a homeowner check before planning a heating replacement?`
3. Show the answer and the PDF/page/excerpt citations.
4. Open **New Intake** and create a heating-inspection request.
5. Open **Draft Email** and show the follow-up output.

## 4. Pre-recording checklist

- Confirm the answer contains at least one citation.
- Use only the product’s German UI in the demo; explain the sales story in English.
- Do not claim public consumer guidance is the customer’s proprietary knowledge base.
- Keep the Loom under five minutes; use `docs/loom-sales-call-script.md` as the call spine.
