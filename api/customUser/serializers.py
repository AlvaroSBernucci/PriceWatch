from rest_framework import serializers
from .models import User


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    password_confirm = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password_confirm"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password": "As senhas devem ser iguais"}
            )
        return attrs


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_admin"]

    def get_is_admin(self, obj):
        return obj.is_staff or obj.is_superuser
