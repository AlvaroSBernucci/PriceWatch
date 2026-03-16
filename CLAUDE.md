# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PriceWatch is a full-stack price monitoring app. Users register product URLs, set target prices, and get notified when prices drop. It supports Mercado Livre and Amazon scraping.

## Commands

### Backend (Django)
```bash
cd api

# Start dev server
python manage.py runserver

# Run all tests
python manage.py test

# Run tests for a specific app or module
python manage.py test products
python manage.py test customUser
python manage.py test services

# Run a single test file
python manage.py test products.tests.test_queryset
python manage.py test products.tests.test_tasks
python manage.py test products.tests.test_api
python manage.py test customUser.tests.test_api
python manage.py test services.tests.test_scraper

# Apply migrations
python manage.py migrate

# Start Celery worker (requires RabbitMQ running)
celery -A core worker -l info

# Start Celery beat scheduler
celery -A core beat -l info
```

### Frontend (React/Vite)
```bash
cd ui

npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build
npm run lint       # ESLint
```

## Architecture

### Backend (`api/`)

**Django apps:**
- `customUser/` — Custom User model (extends `AbstractUser`), adds `notify` field for notification counts. JWT auth via `djangorestframework_simplejwt`.
- `products/` — Core domain. Models: `ProductsSource` (retailers), `Products` (user-registered products with target prices), `ProductsHistory` (price snapshots). `ProductQuerySet.with_price_annotations()` in `models.py` computes `price_change`, `has_changed`, `lowest_price` etc. via ORM subqueries. `tasks.py` contains only the Celery task functions.
- `services/` — `ScraperProtocol` ABC + `ProductPriceService` (orchestrates scraping with dependency injection) + `BaseScraper` → `MercadoLivreScraper` / `AmazonScraper` (Playwright + BeautifulSoup4).

**Key config (`core/settings.py`):**
- DB: SQLite (dev)
- CORS allowed: `http://localhost:5173`
- Celery broker: `pyamqp://guest@localhost//` (RabbitMQ)
- Custom user model: `customUser.User`
- Timezone: `America/Sao_Paulo`

**API routes:**
- `POST /api/token/` — JWT obtain
- `POST /api/token/refresh/` — JWT refresh
- `GET/POST /api/products/` — list/create products
- `GET/PUT/DELETE /api/products/{id}/` — product detail
- `GET /api/products/{id}/history/` — price history
- `GET /api/products-source/` — available sources

### Frontend (`ui/src/`)

Feature-based organization — each domain (`auth/`, `products/`) has its own `pages/`, `components/`, `services/`, `types.ts`, and hooks.

- **State:** TanStack React Query for server state; React Context for auth (`auth/providers/`) and toast notifications (`common/providers/SnackContext`).
- **Routing:** `react-router-dom` with centralized route constants in `constants/routes.ts`. `ProtectedRoute` component guards authenticated pages.
- **UI:** Material-UI (MUI) with custom theme in `theme/`. Path alias `@` maps to `src/`.
- **Forms:** `react-hook-form` throughout.
- **Error handling:** `utils/extractErrorMessage` utility normalizes API errors.

### Data Flow (price update cycle)
1. Celery Beat triggers `update_all_products_price` on a schedule.
2. Task calls `ProductPriceService` which invokes the appropriate scraper (Playwright headless browser).
3. New price is saved to `ProductsHistory`; `Products.current_price` is updated.
4. If price ≤ target price, email notification is sent (console backend in dev).
