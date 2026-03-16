# Backend Refactoring & Test Coverage — Design Spec

**Date:** 2026-03-15
**Scope:** Backend only (Django + Celery)
**Approach:** Option B — Intermediate refactor with protocol-based dependency injection

---

## Goals

1. Reorganize `tasks.py` so business logic, Celery tasks, and notifications are separated
2. Make the scraper layer testable without launching a real Playwright browser
3. Move ORM annotations out of the view into a reusable `ProductQuerySet`
4. Write comprehensive unit tests for all backend layers

---

## New File Structure

```
api/
├── services/
│   ├── __init__.py
│   ├── scraper.py                  (BaseScraper, MercadoLivreScraper, AmazonScraper — logic unchanged)
│   ├── scraper_protocol.py         (ScraperProtocol ABC with get_price(url) → Decimal)
│   └── product_price_service.py   (ProductPriceService moved from tasks.py)
├── products/
│   ├── models.py                   (+ ProductQuerySet with with_price_annotations())
│   ├── views.py                    (get_queryset simplified to one line)
│   ├── tasks.py                    (only Celery task functions, imports service)
│   ├── serializers.py              (no changes)
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py             (endpoint tests — existing 4 expanded)
│   │   ├── test_queryset.py        (ORM annotation tests)
│   │   └── test_tasks.py          (ProductPriceService + Celery task tests)
│   └── ...
├── customUser/
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py             (register, login, /me, admin)
│   └── ...
└── services/
    └── tests/
        ├── __init__.py
        └── test_scraper.py         (scraper tests with fake HTML, no Playwright)
```

---

## Architecture Changes

### 1. ScraperProtocol + Dependency Injection

**`services/scraper_protocol.py`:**
```python
from abc import ABC, abstractmethod
from decimal import Decimal

class ScraperProtocol(ABC):
    @abstractmethod
    def get_price(self, url: str) -> Decimal:
        ...
```

Concrete scrapers (`MercadoLivreScraper`, `AmazonScraper`) inherit from both `BaseScraper` and `ScraperProtocol`. No logic changes.

**`services/product_price_service.py`:**
```python
class ProductPriceService:
    def __init__(self, scraper: ScraperProtocol | None = None):
        self._scraper = scraper  # None = create real scraper at runtime

    def update_product_price(self, product_id: int):
        product = Products.objects.get(id=product_id)
        scraper = self._scraper or get_scraper(product.product_source_id)
        new_price = scraper.get_price(product.link)
        ProductsHistory.objects.create(product=product, price=new_price)
        if self._compare_prices(product.target_price, new_price):
            self.notify(product.user)
```

A `get_scraper(source_id)` module-level factory function selects the right scraper by source ID.

**Celery tasks (`products/tasks.py`):**
```python
@shared_task
def update_product_price_task(product_id):
    ProductPriceService().update_product_price(product_id)

@shared_task
def update_all_products_price():
    for product in Products.objects.all():
        update_product_price_task.delay(product.id)
```

Tasks have no knowledge of scrapers — clean single responsibility.

**In tests:**
```python
class FakeScraper(ScraperProtocol):
    def __init__(self, price: Decimal):
        self._price = price
    def get_price(self, url: str) -> Decimal:
        return self._price

service = ProductPriceService(scraper=FakeScraper(Decimal("99.90")))
```

### 2. ProductQuerySet in models.py

```python
class ProductQuerySet(models.QuerySet):
    def with_price_annotations(self):
        # all subqueries and annotations extracted from views.py
        ...

class Products(models.Model):
    objects = ProductQuerySet.as_manager()
    ...
```

**`products/views.py` get_queryset becomes:**
```python
def get_queryset(self):
    return Products.objects.filter(user=self.request.user).with_price_annotations()
```

---

## Test Coverage

### `products/tests/test_queryset.py`
- `with_price_annotations()` returns correct `initial_price`, `current_price`, `lowest_price`, `highest_price`
- `price_change` calculated correctly for price increase and decrease
- `has_changed` is True when price went up, False when down or unchanged
- Product with no history returns `None` for annotated fields

### `products/tests/test_api.py`
- List returns only current user's products
- Create triggers Celery task (mocked)
- Update and Delete work correctly
- `history` action returns ordered price history
- All endpoints require authentication (401 when unauthenticated)

### `products/tests/test_tasks.py`
- `update_product_price()` creates new `ProductsHistory` record
- Calls `notify()` when new price ≤ target price
- Does not call `notify()` when new price > target price
- `update_all_products_price` dispatches task for each product

### `customUser/tests/test_api.py`
- Registration with matching passwords creates user
- Registration with mismatched passwords returns 400
- `/me` returns authenticated user's data
- `/all` requires admin privileges (403 for regular users)

### `services/tests/test_scraper.py`
- `MercadoLivreScraper._extract_price()` with valid HTML returns correct price
- `AmazonScraper._extract_price()` with valid HTML returns correct price
- HTML missing expected element raises exception

---

## What Does NOT Change

- `serializers.py` — no changes
- `models.py` fields — no changes, only `ProductQuerySet` added
- `urls.py` — no changes
- All existing API contracts — no changes
- Scraper logic (`_extract_price` implementations) — no changes
