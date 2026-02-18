from django.core.mail import send_mail
from django.conf import settings


def send_test_email():
    send_mail(
        subject="Teste de email",
        message="Esse é um teste.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["destinatario@email.com"],
        fail_silently=False,
    )
