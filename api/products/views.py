from rest_framework import viewsets
from products.models import Products, ProductsHistory
from products.serializers import ProductSerializer
from .tasks import update_product_price_task


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        product = serializer.save()
        update_product_price_task.delay(product.id)
