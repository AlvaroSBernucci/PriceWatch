from .models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer, CreateUserSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        data = serializer.validated_data

        password = data.pop("password")
        data.pop("password_confirm")

        user = User.objects.create_user(password=password, **data)
        return user


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
