from __future__ import annotations
import smtplib
from email.message import EmailMessage
from pydantic import BaseModel, EmailStr, Field
from api.core.config import settings

class EmailSendRequest(BaseModel):
    to: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1)
    from_email: EmailStr | None = None


def send_email(payload: dict) -> dict:
    req = EmailSendRequest(**payload)
    if not settings.smtp_host or not settings.smtp_user or not settings.smtp_password:
        return {
            'sent': False,
            'mode': 'mock',
            'message': 'SMTP credentials not configured. Email generated but not sent.',
            'to': str(req.to),
            'subject': req.subject,
        }

    msg = EmailMessage()
    sender = str(req.from_email or settings.smtp_from_email or settings.smtp_user)
    msg['From'] = sender
    msg['To'] = str(req.to)
    msg['Subject'] = req.subject
    msg.set_content(req.body)

    if settings.smtp_use_ssl:
        with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=30) as server:
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
    else:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30) as server:
            if settings.smtp_use_tls:
                server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)

    return {'sent': True, 'mode': 'smtp', 'message': 'Email sent', 'to': str(req.to), 'subject': req.subject}
