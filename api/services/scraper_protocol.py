# api/services/scraper_protocol.py
from abc import ABC, abstractmethod
from decimal import Decimal


class ScraperProtocol(ABC):
    @abstractmethod
    def get_price(self, url: str) -> Decimal:
        ...
