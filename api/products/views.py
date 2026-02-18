from rest_framework import viewsets
from rest_framework import permissions
from django.db.models import (
    F,
    Subquery,
    OuterRef,
    ExpressionWrapper,
    DecimalField,
    BooleanField,
    Value,
    Case,
    When,
)
from django.db.models.functions import Cast
from products.models import Products, ProductsHistory, ProductsSource
from products.serializers import (
    ProductSerializer,
    ProductsSourceOptionSerializer,
)
from .tasks import update_product_price_task


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        base_queryset = Products.objects.filter(user=user)

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
        lowest_price_subquery = (
            ProductsHistory.objects.filter(product=OuterRef("pk"))
            .order_by("price")
            .values("price")[:1]
        )

        last_but_one_price_subquery = (
            ProductsHistory.objects.filter(product=OuterRef("pk"))
            .order_by("-created_at")
            .values("price")[1:2]
        )

        products = (
            base_queryset.annotate(
                initial_price=Subquery(initial_price_subquery),
                current_price=Subquery(current_price_subquery),
                lowest_price=Subquery(lowest_price_subquery),
                last_but_one_price=Subquery(last_but_one_price_subquery),
            )
            .annotate(
                price_change=ExpressionWrapper(
                    (
                        Cast(
                            (F("current_price") * Value(1.0)),
                            DecimalField(max_digits=10, decimal_places=2),
                        )
                        / Cast(
                            F("last_but_one_price"),
                            DecimalField(max_digits=10, decimal_places=2),
                        )
                    )
                    - Value(1),
                    output_field=DecimalField(max_digits=10, decimal_places=4),
                ),
            )
            .annotate(
                has_changed=Case(
                    When(price_change__gt=0, then=Value(True)),
                    When(price_change__lt=0, then=Value(False)),
                    default=Value(False),
                    output_field=BooleanField(),
                )
            )
            .prefetch_related("products_history")
        )

        return products

    def perform_create(self, serializer):
        product = serializer.save(user=self.request.user)
        update_product_price_task.delay(product.id)


class ProductsSourceViewSet(viewsets.ModelViewSet):
    queryset = ProductsSource.objects.all()
    serializer_class = ProductsSourceOptionSerializer
