# api/services/product_price_service.py
from decimal import Decimal
from products.models import Products, ProductsHistory
from products.enums import ProductsSourceEnum
from products.utils import send_test_email
from services.scraper_protocol import ScraperProtocol
from services.scraper import MercadoLivreScraper, AmazonScraper


def get_scraper(source_id: int) -> ScraperProtocol:
    if source_id == ProductsSourceEnum.MERCADO_LIVRE:
        return MercadoLivreScraper()
    return AmazonScraper()


class ProductPriceService:
    def __init__(self, scraper: ScraperProtocol | None = None):
        self._scraper = scraper

    def update_product_price(self, product_id: int):
        try:
            product = Products.objects.select_related("user", "product_source").get(
                id=product_id
            )
            scraper = self._scraper or get_scraper(product.product_source.id)
            new_price = scraper.get_price(product.link)

            if not new_price:
                return

            if not product.price:
                product.price = new_price
                product.save(update_fields=["price"])

            ProductsHistory.objects.create(price=new_price, product_id=product_id)

            if product.target_price and self._compare_prices(
                product.target_price, new_price
            ):
                self.notify(product.user)

        except Exception as e:
            print(f"Erro: {e}")

    @staticmethod
    def _compare_prices(target_price: Decimal, new_price: Decimal) -> bool:
        return target_price > new_price

    def notify(self, user):
        try:
            user.notify += 1
            user.save(update_fields=["notify"])
            send_test_email()
        except Exception as e:
            print(f"Erro: {e}")
