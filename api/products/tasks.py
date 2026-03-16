# api/products/tasks.py
from celery import shared_task
from products.models import Products
from services.product_price_service import ProductPriceService


@shared_task
def update_product_price_task(product_id):
    ProductPriceService().update_product_price(product_id)


@shared_task
def update_all_products_price():
    products_id = Products.objects.values_list("id", flat=True)
    for product_id in products_id:
        update_product_price_task.delay(product_id)
