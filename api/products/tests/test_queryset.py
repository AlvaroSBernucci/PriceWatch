# api/products/tests/test_queryset.py
from decimal import Decimal
from django.test import TestCase
from customUser.models import User
from products.models import Products, ProductsHistory, ProductsSource


class ProductQuerySetTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="123456")
        self.source = ProductsSource.objects.create(name="Mercado Livre")
        self.product = Products.objects.create(
            name="Produto Teste",
            user=self.user,
            product_source=self.source,
            link="https://www.mercadolivre.com.br/produto",
        )

    def _add_history(self, *prices):
        for price in prices:
            ProductsHistory.objects.create(product=self.product, price=Decimal(str(price)))

    def _get_annotated(self):
        return Products.objects.filter(id=self.product.id).with_price_annotations().get()

    # --- No history ---

    def test_no_history_returns_none_for_price_fields(self):
        p = self._get_annotated()
        self.assertIsNone(p.initial_price)
        self.assertIsNone(p.current_price)
        self.assertIsNone(p.lowest_price)
        self.assertIsNone(p.highest_price)

    # --- Single entry ---

    def test_single_history_entry(self):
        self._add_history("150.00")
        p = self._get_annotated()
        self.assertEqual(p.initial_price, Decimal("150.00"))
        self.assertEqual(p.current_price, Decimal("150.00"))
        self.assertEqual(p.lowest_price, Decimal("150.00"))
        self.assertEqual(p.highest_price, Decimal("150.00"))
        self.assertIsNone(p.last_but_one_price)

    # --- Multiple entries ---

    def test_initial_and_current_price_order(self):
        self._add_history("100.00", "120.00", "90.00")
        p = self._get_annotated()
        self.assertEqual(p.initial_price, Decimal("100.00"))
        self.assertEqual(p.current_price, Decimal("90.00"))

    def test_lowest_and_highest_price(self):
        self._add_history("100.00", "50.00", "200.00")
        p = self._get_annotated()
        self.assertEqual(p.lowest_price, Decimal("50.00"))
        self.assertEqual(p.highest_price, Decimal("200.00"))

    def test_last_but_one_price(self):
        self._add_history("100.00", "120.00")
        p = self._get_annotated()
        self.assertEqual(p.last_but_one_price, Decimal("100.00"))

    def test_price_change_increase(self):
        self._add_history("100.00", "120.00")
        p = self._get_annotated()
        # (120 / 100) - 1 = 0.20
        self.assertAlmostEqual(p.price_change, Decimal("0.20"), places=2)
        self.assertTrue(p.has_changed)

    def test_price_change_decrease(self):
        self._add_history("100.00", "80.00")
        p = self._get_annotated()
        # (80 / 100) - 1 = -0.20
        self.assertAlmostEqual(p.price_change, Decimal("-0.20"), places=2)
        self.assertFalse(p.has_changed)

    def test_has_changed_false_when_price_same(self):
        self._add_history("100.00", "100.00")
        p = self._get_annotated()
        self.assertFalse(p.has_changed)
