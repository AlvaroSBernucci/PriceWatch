# api/products/tests/test_api.py
from django.urls import reverse
from django.test import TestCase
from rest_framework.test import APIClient
from unittest.mock import patch
from decimal import Decimal
from customUser.models import User
from products.models import Products, ProductsHistory, ProductsSource


class ProductAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="test", password="123456")
        self.other_user = User.objects.create_user(username="other", password="123456")
        self.source = ProductsSource.objects.create(name="Mercado Livre")
        self.link = "https://www.mercadolivre.com.br/produto-teste"

        self.product = Products.objects.create(
            name="Produto Teste",
            user=self.user,
            product_source=self.source,
            link=self.link,
        )
        ProductsHistory.objects.create(product=self.product, price=Decimal("100.00"))
        ProductsHistory.objects.create(product=self.product, price=Decimal("120.00"))

    # --- Authentication ---

    def test_list_requires_authentication(self):
        url = reverse("products-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)

    def test_detail_requires_authentication(self):
        url = reverse("products-detail", args=[self.product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)

    # --- List ---

    def test_list_returns_only_user_products(self):
        Products.objects.create(
            name="Produto Outro",
            user=self.other_user,
            product_source=self.source,
            link=self.link,
        )
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("products-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_list_annotations_are_correct(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("products-list"))
        product = response.data[0]
        self.assertEqual(Decimal(product["initial_price"]), Decimal("100.00"))
        self.assertEqual(Decimal(product["current_price"]), Decimal("120.00"))
        self.assertEqual(Decimal(product["lowest_price"]), Decimal("100.00"))
        self.assertEqual(Decimal(product["highest_price"]), Decimal("120.00"))
        self.assertAlmostEqual(Decimal(product["price_change"]), Decimal("0.2"))
        self.assertTrue(product["has_changed"])

    # --- Create ---

    @patch("products.views.update_product_price_task.delay")
    def test_create_triggers_celery_task(self, mocked_task):
        self.client.force_authenticate(user=self.user)
        data = {"name": "Novo Produto", "product_source": self.source.id, "link": self.link}
        response = self.client.post(reverse("products-list"), data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(mocked_task.called)

    # --- Update ---

    def test_update_product_name(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("products-detail", args=[self.product.id])
        response = self.client.patch(url, {"name": "Nome Atualizado"})
        self.assertEqual(response.status_code, 200)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, "Nome Atualizado")

    # --- Delete ---

    def test_delete_product(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("products-detail", args=[self.product.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Products.objects.filter(id=self.product.id).exists())

    # --- History action ---

    def test_history_action_returns_all_entries(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("products-history", args=[self.product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_history_action_requires_authentication(self):
        url = reverse("products-history", args=[self.product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
