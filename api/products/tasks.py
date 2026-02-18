from celery import shared_task
from .utils import send_test_email
from .models import Products, ProductsHistory
from products.enums import ProductsSourceEnum
from services.scraper import MercadoLivreScraper, AmazonScraper


class ProductPriceService:
    SCRAPERS = {
        ProductsSourceEnum.MERCADO_LIVRE: MercadoLivreScraper,
        ProductsSourceEnum.AMAZON: AmazonScraper,
    }

    def _get_scraper(self, product_source):
        scraper_class = self.SCRAPERS.get(product_source)
        if scraper_class:
            return scraper_class()
        raise ValueError("Sem scraper disponível")

    def _compare_prices(self, target_price, new_price):
        return target_price > new_price

    def notify(self, user):
        try:
            user.notify += 1
            user.save(update_fields=["notify"])
            send_test_email()
        except Exception as e:
            print(f"Erro: {e}")

    def update_product_price(self, product_id):
        try:
            product = Products.objects.get(id=product_id)
            scraper_type = self._get_scraper(product_source=product.product_source.id)

            with scraper_type.session() as e:
                product_new_price = e.get_price(product.link)

            if not product_new_price:
                return

            if not product.price:
                product.price = product_new_price
                product.save(update_fields=["price"])

            ProductsHistory.objects.create(
                price=product_new_price, product_id=product_id
            )

            if product.target_price and self._compare_prices(
                product.target_price, product_new_price
            ):
                self.notify(product.user)

        except Exception as e:
            print(f"Erro: {e}")


@shared_task
def update_product_price_task(product_id):
    ProductPriceService().update_product_price(product_id)


@shared_task
def update_all_products_price():
    products_id = Products.objects.values_list("id", flat=True)
    for product_id in products_id:
        update_product_price_task.delay(product_id)
