from rest_framework import serializers
from products.models import Products, ProductsHistory, ProductsSource


class ProductSerializer(serializers.ModelSerializer):
    link = serializers.URLField(max_length=2000)
    latest_verification = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M", read_only=True
    )
    initial_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    current_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    lowest_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    highest_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    last_but_one_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    price_change = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    has_changed = serializers.BooleanField(read_only=True)

    class Meta:
        model = Products
        fields = [
            "id",
            "name",
            "link",
            "user",
            "product_source",
            "latest_verification",
            "target_price",
            "initial_price",
            "current_price",
            "lowest_price",
            "highest_price",
            "last_but_one_price",
            "price_change",
            "has_changed",
        ]
        read_only_fields = ("user",)


class ProductsHistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M")

    class Meta:
        model = ProductsHistory
        fields = ["product", "price", "created_at"]
        ordering = ["-created_at"]


class ProductsSourceOptionSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source="name")
    value = serializers.IntegerField(source="id")

    class Meta:
        model = ProductsSource
        fields = ["value", "label"]
