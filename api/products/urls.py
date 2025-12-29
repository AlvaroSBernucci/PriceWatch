from rest_framework import routers
from products.views import ProductViewSet

router = routers.SimpleRouter(trailing_slash=False)

router.register("products", ProductViewSet, basename="products")

urlpatterns = router.urls
