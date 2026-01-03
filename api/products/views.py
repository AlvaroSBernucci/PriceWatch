from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import F, Subquery, OuterRef, ExpressionWrapper, DecimalField
from products.models import Products, ProductsHistory, ProductsSource
from products.serializers import (
    ProductSerializer,
    ProductsSourceOptionSerializer,
)
from .tasks import update_product_price_task


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        initial_price_subquery = (
            ProductsHistory.objects.filter(product=OuterRef("pk"))
            .order_by("created_at")
            .values("price")[:1]
        )

        current_price_subquery = (
            ProductsHistory.objects.filter(product=OuterRef("pk"))
            .order_by("-created_at")
            .values("price")[:1]
        )

        last_but_one_price_subquery = (
            ProductsHistory.objects.filter(product=OuterRef("pk"))
            .order_by("-created_at")
            .values("price")[1:2]
        )

        products = (
            Products.objects.annotate(
                initial_price=Subquery(initial_price_subquery),
                current_price=Subquery(current_price_subquery),
                last_but_one_price=Subquery(last_but_one_price_subquery),
            )
            .annotate(
                price_change=ExpressionWrapper(
                    (F("current_price") / F("last_but_one_price")) - 1,
                    output_field=DecimalField(max_digits=12, decimal_places=6),
                )
            )
            .prefetch_related("products_history")
        )
        return products

    def perform_create(self, serializer):
        product = serializer.save()
        update_product_price_task.delay(product.id)


class ProductsSourceViewSet(viewsets.ModelViewSet):
    queryset = ProductsSource.objects.all()
    serializer_class = ProductsSourceOptionSerializer
