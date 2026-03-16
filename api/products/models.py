# api/products/models.py
from django.db import models
from django.utils import timezone
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
    Max,
    Min,
)
from django.db.models.functions import Cast
from customUser.models import User


class ProductsSource(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nome da loja")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Loja"
        verbose_name_plural = "Lojas"


class ProductQuerySet(models.QuerySet):
    def with_price_annotations(self):
        history_base = ProductsHistory.objects.filter(product=OuterRef("pk"))

        return (
            self.annotate(
                latest_verification=Max("products_history__created_at"),
                lowest_price=Min("products_history__price"),
                highest_price=Max("products_history__price"),
                initial_price=Subquery(
                    history_base.order_by("created_at").values("price")[:1]
                ),
                current_price=Subquery(
                    history_base.order_by("-created_at").values("price")[:1]
                ),
                last_but_one_price=Subquery(
                    history_base.order_by("-created_at").values("price")[1:2]
                ),
            )
            .annotate(
                price_change=ExpressionWrapper(
                    (
                        Cast(
                            F("current_price") * Value(1.0),
                            DecimalField(max_digits=10, decimal_places=2),
                        )
                        / Cast(
                            F("last_but_one_price"),
                            DecimalField(max_digits=10, decimal_places=2),
                        )
                    )
                    - Value(1),
                    output_field=DecimalField(max_digits=10, decimal_places=4),
                )
            )
            .annotate(
                has_changed=Case(
                    When(price_change__gt=0, then=Value(True)),
                    When(price_change__lt=0, then=Value(False)),
                    default=Value(False),
                    output_field=BooleanField(),
                )
            )
        )


class Products(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nome do Produto")
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    product_source = models.ForeignKey(
        ProductsSource, on_delete=models.CASCADE, related_name="products"
    )
    target_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    objects = ProductQuerySet.as_manager()

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"


class ProductsHistory(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name="products_history"
    )

    def __str__(self):
        local_time = timezone.localtime(self.created_at)
        return f"{self.product.name} - R${self.price} - {local_time.strftime('%d/%m/%Y %H:%M')}"

    class Meta:
        verbose_name = "Histórico do produto"
        verbose_name_plural = "Histórico dos produtos"
