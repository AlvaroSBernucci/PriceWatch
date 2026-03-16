from django.test import TestCase
from rest_framework.test import APIClient
from customUser.models import User


class RegisterViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/users/register/"

    def test_register_with_valid_data_creates_user(self):
        data = {
            "username": "novousuario",
            "email": "novo@email.com",
            "password": "senha123",
            "password_confirm": "senha123",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username="novousuario").exists())

    def test_register_with_mismatched_passwords_returns_400(self):
        data = {
            "username": "novousuario",
            "email": "novo@email.com",
            "password": "senha123",
            "password_confirm": "outrasenha",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)

    def test_register_without_required_fields_returns_400(self):
        response = self.client.post(self.url, {"username": "apenas_user"})
        self.assertEqual(response.status_code, 400)


class MeViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/users/me/"
        self.user = User.objects.create_user(
            username="testuser", email="test@email.com", password="123456"
        )

    def test_me_returns_authenticated_user_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], "testuser")
        self.assertEqual(response.data["email"], "test@email.com")
        self.assertFalse(response.data["is_admin"])

    def test_me_returns_401_when_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_me_is_admin_true_for_staff(self):
        self.user.is_staff = True
        self.user.save()
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertTrue(response.data["is_admin"])


class UserListViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/users/all/"
        self.user = User.objects.create_user(username="comum", password="123456")
        self.admin = User.objects.create_user(
            username="admin", password="123456", is_staff=True
        )

    def test_list_returns_403_for_regular_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)

    def test_list_returns_200_for_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_list_returns_401_when_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
