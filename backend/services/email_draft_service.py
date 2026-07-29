from models.schemas import DraftEmailRequest, DraftEmailResponse


class EmailDraftService:
    async def draft_follow_up(self, payload: DraftEmailRequest) -> DraftEmailResponse:
        # TODO: Use LLM prompt templates tuned for German craft-business communication.
        slots = ", ".join(payload.proposed_slots) if payload.proposed_slots else "next available slot"
        subject = f"Ihre Serviceanfrage {payload.request_id} - Terminabstimmung"
        body = (
            f"Hallo {payload.customer_name},\n\n"
            f"vielen Dank fuer Ihre Anfrage.\n\n"
            f"Zusammenfassung: {payload.service_summary}\n\n"
            f"Vorgeschlagene Termine: {slots}\n\n"
            "Bitte bestaetigen Sie einen passenden Termin.\n\n"
            "Mit freundlichen Gruessen\n"
            "Ihr CraftHub Service-Team"
        )
        return DraftEmailResponse(subject=subject, body=body, to=payload.customer_email)
