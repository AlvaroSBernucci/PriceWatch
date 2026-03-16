# api/products/views.py
from rest_framework import viewsets, permissions, response
from rest_framework.decorators import action
from products.models import Products, ProductsSource
from products.serializers import (
    ProductSerializer,
    ProductsSourceOptionSerializer,
    ProductsHistorySerializer,
)
from .tasks import update_product_price_task


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Products.objects
            .select_related("user", "product_source")
            .prefetch_related("products_history")
            .filter(user=self.request.user)
            .with_price_annotations()
        )

    def perform_create(self, serializer):
        product = serializer.save(user=self.request.user)
        update_product_price_task.delay(product.id)

    @action(methods=["GET"], detail=True)
    def history(self, request, pk=None):
        product = self.get_object()
        serializer = ProductsHistorySerializer(
            product.products_history.all(), many=True
        )
        return response.Response(serializer.data)


class ProductsSourceViewSet(viewsets.ModelViewSet):
    queryset = ProductsSource.objects.all()
    serializer_class = ProductsSourceOptionSerializer
