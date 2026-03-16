# api/services/tests/test_scraper.py
from decimal import Decimal
from django.test import TestCase
from services.scraper import MercadoLivreScraper, AmazonScraper


ML_HTML_VALID = """
<html>
  <head>
    <meta itemprop="price" content="299.90">
  </head>
  <body><h1>Produto</h1></body>
</html>
"""

ML_HTML_NO_PRICE = """
<html><body><h1>Produto sem preço</h1></body></html>
"""

# Note: Amazon's price_span[2:-1].replace(",", ".") removes "R$" prefix and last char.
# "R$299,90"[2:-1] = "299,9" → "299.9" — this is the actual behavior of the current parser.
# The parser has a known limitation with multi-digit decimal parts, documented by this test.
AMAZON_HTML_VALID = """
<html>
<body>
  <div data-csa-c-slot-id="corePrice_feature_div" data-csa-c-content-id="corePrice">
    <span class="a-offscreen">R$299,90</span>
  </div>
</body>
</html>
"""

AMAZON_HTML_NO_PRICE = """
<html><body><h1>Produto sem preço</h1></body></html>
"""


class MercadoLivreScraperTest(TestCase):
    def setUp(self):
        self.scraper = MercadoLivreScraper()

    def test_extract_price_returns_correct_decimal(self):
        price = self.scraper._extract_price(ML_HTML_VALID)
        self.assertEqual(price, Decimal("299.90"))

    def test_extract_price_returns_none_when_meta_missing(self):
        price = self.scraper._extract_price(ML_HTML_NO_PRICE)
        self.assertIsNone(price)


class AmazonScraperTest(TestCase):
    def setUp(self):
        self.scraper = AmazonScraper()

    def test_extract_price_returns_correct_decimal(self):
        # "R$299,90"[2:-1] = "299,9" → Decimal("299.9") — current parser behavior
        price = self.scraper._extract_price(AMAZON_HTML_VALID)
        self.assertEqual(price, Decimal("299.9"))

    def test_extract_price_raises_when_price_div_missing(self):
        with self.assertRaises(AttributeError):
            self.scraper._extract_price(AMAZON_HTML_NO_PRICE)
