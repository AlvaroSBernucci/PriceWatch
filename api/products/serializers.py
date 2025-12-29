from rest_framework import serializers
from products.models import Products, ProductsHistory


class ProductSerializer(serializers.ModelSerializer):
    link = serializers.URLField(max_length=2000)

    class Meta:
        model = Products
        fields = "__all__"


class ProductsHistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M")

    class Meta:
        model = ProductsHistory
        fields = "__all__"
