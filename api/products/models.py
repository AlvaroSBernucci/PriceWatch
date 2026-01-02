from django.db import models
from django.utils import timezone
from customUser.models import User


class ProductsSource(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nome da loja")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Loja"
        verbose_name_plural = "Lojas"


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
