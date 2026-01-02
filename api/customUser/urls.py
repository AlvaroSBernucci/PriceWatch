from django.urls import path
from .views import RegisterView, MeView, UserListView

urlpatterns = [
    path("users/register/", RegisterView.as_view()),
    path("users/me/", MeView.as_view()),
    path("users/all/", UserListView.as_view()),
]
