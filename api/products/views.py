from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from products.models import Products, ProductsHistory, ProductsSource
from products.serializers import ProductSerializer, ProductsSourceOptionSerializer
from .tasks import update_product_price_task


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        product = serializer.save()
        update_product_price_task.delay(product.id)


class ProductsSourceViewSet(viewsets.ModelViewSet):
    queryset = ProductsSource.objects.all()
    serializer_class = ProductsSourceOptionSerializer
