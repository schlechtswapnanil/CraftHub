from fastapi import Header, HTTPException, status


async def get_current_user(authorization: str | None = Header(default=None)) -> dict:
    # TODO: Replace with JWT/session validation integrated with Supabase auth.
    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
        )
    return {"user_id": "user_placeholder_001", "role": "owner"}
