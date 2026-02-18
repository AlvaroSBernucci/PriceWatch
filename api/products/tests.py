from django.urls import reverse
from django.test import TestCase
from customUser.models import User
from rest_framework.test import APIClient


class ProductAPITeste(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="test", password="123456")

    def test_product_list_items(self):
        self.client.force_authenticate(user=self.user)

        url = reverse("products-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
