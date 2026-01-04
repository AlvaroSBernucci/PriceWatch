from rest_framework import serializers
from products.models import Products, ProductsHistory, ProductsSource


class ProductSerializer(serializers.ModelSerializer):
    link = serializers.URLField(max_length=2000)
    initial_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    current_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    lowest_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    last_but_one_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    price_change = serializers.DecimalField(max_digits=10, decimal_places=2)
    has_changed = serializers.BooleanField()

    class Meta:
        model = Products
        fields = [
            "id",
            "name",
            "link",
            "user",
            "product_source",
            "target_price",
            "initial_price",
            "current_price",
            "lowest_price",
            "last_but_one_price",
            "price_change",
            "has_changed",
        ]


class ProductsHistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M")

    class Meta:
        model = ProductsHistory
        fields = "__all__"


class ProductsSourceOptionSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source="name")
    value = serializers.IntegerField(source="id")

    class Meta:
        model = ProductsSource
        fields = ["value", "label"]
