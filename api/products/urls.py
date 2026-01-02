from rest_framework import routers
from products.views import ProductViewSet, ProductsSourceViewSet

router = routers.SimpleRouter(trailing_slash=False)

router.register("products", ProductViewSet, basename="products")
router.register("products-source", ProductsSourceViewSet, basename="products-source")


urlpatterns = router.urls
