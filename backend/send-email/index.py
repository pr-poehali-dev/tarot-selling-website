import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта KeyArcana на почту мастера"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    message = body.get("message", "").strip()

    if not name or not contact:
        return {"statusCode": 400, "headers": cors, "body": {"error": "name and contact required"}}

    smtp_email = os.environ["SMTP_EMAIL"]
    smtp_password = os.environ["SMTP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"✦ Новая заявка: {message[:40]}"
    msg["From"] = smtp_email
    msg["To"] = smtp_email

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #150d26; color: #fff; padding: 32px; border: 1px solid #FFCC33;">
      <h2 style="color: #FFCC33; font-weight: 300; margin-bottom: 24px;">✦ Новая заявка с сайта KeyArcana</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="color:#ffffff99; padding: 8px 0; font-size:13px;">Имя</td><td style="color:#fff; padding: 8px 0;">{name}</td></tr>
        <tr><td style="color:#ffffff99; padding: 8px 0; font-size:13px;">Контакт</td><td style="color:#FFCC33; padding: 8px 0;">{contact}</td></tr>
        <tr><td style="color:#ffffff99; padding: 8px 0; font-size:13px;">Сообщение</td><td style="color:#fff; padding: 8px 0;">{message}</td></tr>
      </table>
      <p style="margin-top:24px; color:#ffffff40; font-size:12px;">keyarcana.ru</p>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_email, smtp_password)
        server.sendmail(smtp_email, smtp_email, msg.as_string())

    return {"statusCode": 200, "headers": cors, "body": {"ok": True}}