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
        self.link = "https://www.mercadolivre.com.br/raquete-de-tnis-head-radical-mp-2023-16x19-300g-tamanho-l3-encordoada/p/MLB22282063#reco_item_pos=1&reco_backend=item_decorator&reco_backend_type=function&reco_client=home_items-decorator-legacy&reco_id=4d43c826-5de5-4037-9f6a-696f7803b6fa&reco_model=&c_id=/home/navigation-trends-recommendations/element&c_uid=c73bdad0-8eea-44e7-a7c5-39b6ba67ba32&da_id=navigation_trend&da_position=1&id_origin=/home/dynamic_access&da_sort_algorithm=ranker"

        self.source = ProductsSource.objects.create(name="Mercado Livre")

        self.product = Products.objects.create(
            name="Produto Teste",
            user=self.user,
            product_source=self.source,
        )

        ProductsHistory.objects.create(
            product=self.product,
            price=Decimal("100.00"),
        )
        ProductsHistory.objects.create(
            product=self.product,
            price=Decimal("120.00"),
        )

    def test_list_returns_only_user_products(self):
        self.client.force_authenticate(user=self.user)

        url = reverse("products-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_annotations_are_correct(self):
        self.client.force_authenticate(user=self.user)

        url = reverse("products-list")
        response = self.client.get(url)

        product = response.data[0]

        self.assertEqual(Decimal(product["initial_price"]), Decimal("100.00"))
        self.assertEqual(Decimal(product["current_price"]), Decimal("120.00"))
        self.assertEqual(Decimal(product["lowest_price"]), Decimal("100.00"))
        self.assertEqual(Decimal(product["highest_price"]), Decimal("120.00"))

        self.assertAlmostEqual(Decimal(product["price_change"]), Decimal("0.2"))
        self.assertTrue(product["has_changed"])

    def test_history_action(self):
        self.client.force_authenticate(user=self.user)

        url = reverse("products-history", args=[self.product.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    @patch("products.views.update_product_price_task.delay")
    def test_create_calls_task(self, mocked_task):
        self.client.force_authenticate(user=self.user)

        url = reverse("products-list")
        data = {
            "name": "Novo Produto",
            "product_source": self.source.id,
            "link": self.link,
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue(mocked_task.called)
