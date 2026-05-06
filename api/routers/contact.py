from fastapi import APIRouter, HTTPException
from services.firebase import db
from services.email import send_contact_email
from models import ContactModel
from datetime import datetime

router = APIRouter()

@router.post("/")
async def submit_contact(contact: ContactModel):
    # 1. Save to Firestore database as a backup
    try:
        if db:
            doc_ref = db.collection('messages').document()
            contact_data = contact.model_dump()
            contact_data['createdAt'] = datetime.utcnow().isoformat()
            doc_ref.set(contact_data)
    except Exception as e:
        print(f"Firestore save error: {e}")
    
    # 2. Send the Email via Resend
    email_response = send_contact_email(contact.name, contact.email, contact.message)
    
    if not email_response:
        raise HTTPException(status_code=500, detail="Failed to send email. Check API key.")
        
    return {"message": "Message sent successfully!"}