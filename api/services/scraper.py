from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod
from decimal import Decimal


class BaseScraper(ABC):
    def __init__(self):

        self.playwright = sync_playwright().start()

        self.browser = self.playwright.chromium.launch(headless=False)

        self.context = self.browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36",
            locale="pt-BR",
            timezone_id="America/Sao_Paulo",
            viewport={"width": 1366, "height": 768},
        )

    def close(self):
        self.context.close()
        self.browser.close()
        self.playwright.stop()

    def _load_page(self, url):
        page = self.context.new_page()
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)

            page.mouse.move(400, 300)
            page.mouse.wheel(0, 600)
            page.wait_for_timeout(1200)

            page.wait_for_selector("h1", timeout=20000)

            html = page.content()
            page.close()
            return html

        finally:
            page.close()

    @abstractmethod
    def _extract_price(self, html: str):
        pass

    @abstractmethod
    def get_price(self, url: str):
        pass


class MercadoLivreScraper(BaseScraper):
    def _extract_price(self, html: str):
        soup = BeautifulSoup(html, "html.parser")
        price_meta = soup.find("meta", itemprop="price")

        return Decimal(price_meta["content"]) if price_meta else None

    def get_price(self, url: str):
        html = self._load_page(url)
        return self._extract_price(html)


class AmazonScraper(BaseScraper):
    def _extract_price(self, html):
        soup = BeautifulSoup(html, "html.parser")

        price_div = soup.find(
            "div",
            attrs={
                "data-csa-c-slot-id": "corePrice_feature_div",
                "data-csa-c-content-id": "corePrice",
            },
        )
        price_span = price_div.find("span", class_="a-offscreen").text.strip()
        price_formated = price_span[2:-1].replace(",", ".")
        return Decimal(price_formated) if price_formated else None

    def get_price(self, url: str):
        html = self._load_page(url)
        return self._extract_price(html)
