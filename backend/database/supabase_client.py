from supabase import Client, create_client

from utils.config import settings


def get_supabase_client() -> Client:
    # TODO: Add robust client lifecycle and retries according to deployment environment.
    return create_client(settings.supabase_url, settings.supabase_service_role_key)
