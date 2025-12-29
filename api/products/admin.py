from django.contrib import admin
from .models import Products, ProductsHistory, ProductsSource


@admin.register(ProductsSource)
class ProductsSourceAdmin(admin.ModelAdmin):
    pass


@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    fields = ["name", "price", "user", "link", "created_at"]
    readonly_fields = ["created_at"]
    list_display = ["name", "user", "price"]


@admin.register(ProductsHistory)
class ProductsHistoryAdmin(admin.ModelAdmin):
    fields = ["price", "product", "created_at"]
    readonly_fields = ["created_at"]
    list_display = ["product__name", "price", "created_at"]
