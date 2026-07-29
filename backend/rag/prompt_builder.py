class PromptBuilder:
    def build_chat_prompt(self, question: str, retrieved_chunks: list[dict]) -> str:
        # TODO: Externalize prompt templates for domain-specific variations.
        context = "\n".join(
            [
                f"[source:{index + 1}] {item['filename']} (p.{item['page']}): {item['snippet']}"
                for index, item in enumerate(retrieved_chunks)
            ]
        )
        return (
            "Du bist ein Service-Assistent fuer deutsche Handwerksbetriebe.\n"
            "Nutze ausschliesslich den Kontext.\n"
            "Wenn die Information im Kontext fehlt, antworte klar, dass die Information "
            "nicht in den Dokumenten vorhanden ist.\n"
            "Antworte praezise und praxisnah.\n\n"
            f"Frage: {question}\n\nKontext:\n{context}\n\n"
            "Gib keine erfundenen Fakten aus."
        )

    def build_no_context_prompt(self, question: str) -> str:
        return (
            "Du bist ein Service-Assistent fuer deutsche Handwerksbetriebe.\n"
            "Es gibt keinen Dokumentkontext fuer diese Anfrage.\n"
            "Antworte kurz, dass keine relevanten Dokumente vorliegen.\n\n"
            f"Frage: {question}"
        )
