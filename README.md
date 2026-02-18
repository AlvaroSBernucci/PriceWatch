# 📊 PriceWatch

PriceWatch é uma aplicação fullstack para monitoramento automático de preços em lojas online.

O usuário cadastra o link de um produto, define um preço alvo e acompanha o histórico de variações. Quando o valor atingir o preço desejado, o sistema envia uma notificação.

---

##  Visão Geral

O objetivo do projeto é construir uma arquitetura escalável de monitoramento de preços utilizando:

- API REST robusta
- Processamento assíncrono
- Scraping agendado
- Histórico persistente de preços
- Sistema de autenticação seguro com JWT
- Integração futura com múltiplos canais de notificação

---

## 🧱 Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- Celery
- RabbitMQ
- Simple JWT (autenticação)
- Testes unitários
- CI configurado

### Frontend
- React
- Vite
- Arquitetura Feature-Based
- Consumo de API REST com autenticação JWT

---


### 🔄 Fluxo principal

1. Usuário realiza login via JWT.
2. Cadastra um produto informando a URL.
3. O sistema valida se a loja é suportada.
4. O usuário define um preço alvo.
5. O Celery executa tarefas agendadas.
6. O scraper coleta o preço atual.
7. O preço é armazenado no histórico.
8. Quando o preço alvo é atingido → notificação é disparada (em implementação).

---

## ✨ Funcionalidades

### ✅ Implementadas

- Cadastro e login de usuários (JWT)
- Cadastro de produtos via URL
- Registro de preço alvo
- Histórico de preços
- Scraper automatizado
- Processamento assíncrono com Celery
- Integração com RabbitMQ
- Testes unitários no backend
- Pipeline de CI configurado

### 🚧 Em desenvolvimento

- Notificação por e-mail
- Notificação por WhatsApp
- Deploy em ambiente cloud
- Containerização com Docker

---

## ⚙️ Rodando Localmente

### Backend

```bash
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Celery Worker

```bash
cd api
celery -A core worker -l info
```

### RabbitMQ
Certifique-se de que o RabbitMQ esteja rodando localmente antes de iniciar o worker.

### Frontend
```bash
cd src
npm install
npm run dev
```

## 🎯 Objetivos Técnicos
Este projeto foi desenvolvido com foco em:

- Arquitetura desacoplada
- Processamento assíncrono
- Separação clara de responsabilidades
- Escalabilidade futura
- Organização baseada em domínio no frontend
- Boas práticas com Django REST

## 🔮 Próximos Passos
- Implementar sistema completo de notificações
- Adicionar Docker e Docker Compose
- Deploy em cloud (Render, Railway ou AWS)
- Implementar cache para scraping
- Sistema de retry inteligente
- Dashboard com métricas e visualizações

## 👨‍💻 Autor
Desenvolvido por Álvaro Bernucci
