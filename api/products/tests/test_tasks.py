# api/products/tests/test_tasks.py
from decimal import Decimal
from unittest.mock import patch, MagicMock
from django.test import TestCase
from customUser.models import User
from products.models import Products, ProductsHistory, ProductsSource
from services.product_price_service import ProductPriceService
from services.scraper_protocol import ScraperProtocol


class FakeScraper(ScraperProtocol):
    def __init__(self, price):
        self._price = price

    def get_price(self, url: str) -> Decimal:
        return self._price


class ProductPriceServiceTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="123456")
        self.source = ProductsSource.objects.create(name="Mercado Livre")
        self.product = Products.objects.create(
            name="Produto Teste",
            user=self.user,
            product_source=self.source,
            link="https://www.mercadolivre.com.br/produto",
            target_price=Decimal("150.00"),
        )

    def test_update_creates_history_record(self):
        service = ProductPriceService(scraper=FakeScraper(Decimal("120.00")))
        service.update_product_price(self.product.id)
        self.assertEqual(ProductsHistory.objects.filter(product=self.product).count(), 1)
        history = ProductsHistory.objects.get(product=self.product)
        self.assertEqual(history.price, Decimal("120.00"))

    def test_update_sets_initial_price_when_product_has_none(self):
        self.assertIsNone(self.product.price)
        service = ProductPriceService(scraper=FakeScraper(Decimal("99.90")))
        service.update_product_price(self.product.id)
        self.product.refresh_from_db()
        self.assertEqual(self.product.price, Decimal("99.90"))

    def test_notify_called_when_price_below_target(self):
        service = ProductPriceService(scraper=FakeScraper(Decimal("100.00")))
        with patch.object(service, "notify") as mock_notify:
            service.update_product_price(self.product.id)
            mock_notify.assert_called_once_with(self.product.user)

    def test_notify_not_called_when_price_above_target(self):
        service = ProductPriceService(scraper=FakeScraper(Decimal("200.00")))
        with patch.object(service, "notify") as mock_notify:
            service.update_product_price(self.product.id)
            mock_notify.assert_not_called()

    def test_notify_not_called_when_price_equals_target(self):
        service = ProductPriceService(scraper=FakeScraper(Decimal("150.00")))
        with patch.object(service, "notify") as mock_notify:
            service.update_product_price(self.product.id)
            mock_notify.assert_not_called()

    def test_does_nothing_when_scraper_returns_none(self):
        service = ProductPriceService(scraper=FakeScraper(None))
        service.update_product_price(self.product.id)
        self.assertEqual(ProductsHistory.objects.filter(product=self.product).count(), 0)

    def test_notify_increments_user_notify_counter(self):
        service = ProductPriceService(scraper=FakeScraper(Decimal("100.00")))
        with patch("services.product_price_service.send_test_email"):
            service.notify(self.user)
        self.user.refresh_from_db()
        self.assertEqual(self.user.notify, 1)


class UpdateAllProductsTaskTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="123456")
        self.source = ProductsSource.objects.create(name="Mercado Livre")
        Products.objects.create(
            name="Produto A", user=self.user, product_source=self.source,
            link="https://exemplo.com/a",
        )
        Products.objects.create(
            name="Produto B", user=self.user, product_source=self.source,
            link="https://exemplo.com/b",
        )

    @patch("products.tasks.update_product_price_task.delay")
    def test_dispatches_task_for_each_product(self, mock_delay):
        from products.tasks import update_all_products_price
        update_all_products_price()
        self.assertEqual(mock_delay.call_count, 2)
