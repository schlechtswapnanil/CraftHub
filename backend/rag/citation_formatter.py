from models.schemas import SourceCitation


class CitationFormatter:
    def format(self, retrieved_chunks: list[dict]) -> list[SourceCitation]:
        deduplicated: dict[str, SourceCitation] = {}
        for item in retrieved_chunks:
            key = f"{item['document_id']}|{item['page']}|{item['snippet'][:120]}"
            if key in deduplicated:
                continue
            deduplicated[key] = SourceCitation(
                document_id=item["document_id"],
                filename=item["filename"],
                page=item["page"],
                snippet=item["snippet"],
                score=round(float(item["score"]), 4),
            )
        return list(deduplicated.values())
