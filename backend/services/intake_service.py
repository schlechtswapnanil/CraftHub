from models.schemas import IntakeRequest, IntakeResponse


class IntakeService:
    async def create_service_request(self, payload: IntakeRequest) -> IntakeResponse:
        # TODO: Validate customer data, persist request in Supabase, and trigger workflow.
        summary = (
            f"Service request for {payload.customer_name}: {payload.service_type} - "
            f"{payload.issue_description}"
        )
        return IntakeResponse(
            request_id="srv_placeholder_001",
            status="created",
            summary=summary,
        )
