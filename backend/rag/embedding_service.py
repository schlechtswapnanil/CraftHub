"""A lightweight, deterministic embedding service for the MVP.

The original SentenceTransformer implementation pulled in native ML libraries that
are commonly blocked on managed Windows devices. Hashing tokens keeps the demo
fully local and dependency-free while still ranking chunks by their shared terms.
Replace this class with an approved hosted or local semantic embedding provider in
production without changing the vector-store interface.
"""

from __future__ import annotations

import hashlib
import math
import re


class EmbeddingService:
    dimensions = 384

    @staticmethod
    def _tokens(text: str) -> list[str]:
        return re.findall(r"[\wäöüß]+", text.lower(), flags=re.UNICODE)

    def _embed(self, text: str) -> list[float]:
        vector = [0.0] * self.dimensions
        for token in self._tokens(text):
            digest = hashlib.blake2b(token.encode("utf-8"), digest_size=8).digest()
            bucket = int.from_bytes(digest[:4], "big") % self.dimensions
            sign = 1.0 if digest[4] & 1 else -1.0
            vector[bucket] += sign

        norm = math.sqrt(sum(value * value for value in vector))
        return [value / norm for value in vector] if norm else vector

    def embed(self, texts: list[str]) -> list[list[float]]:
        return [self._embed(text) for text in texts]

    def embed_query(self, text: str) -> list[float]:
        return self._embed(text)
