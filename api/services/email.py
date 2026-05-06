import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv("RESEND_API_KEY")

def send_contact_email(name: str, email: str, message: str):
    admin_email = os.getenv("ADMIN_EMAIL")
    
    if not resend.api_key:
        print("⚠️ RESEND_API_KEY is missing from .env")
        return None

    try:
        response = resend.Emails.send({
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": admin_email,
            "subject": f"New Portfolio Message from {name}",
            "reply_to": email,
            "html": f"""
            <h2>New Contact Request</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            """
        })
        return response
    except Exception as e:
        print(f"❌ Resend Error: {e}")
        return None