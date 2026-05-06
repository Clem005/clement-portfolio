import os
import json
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import jwt, JWTError
from passlib.context import CryptContext

import firebase_admin
from firebase_admin import credentials, firestore
import resend
from dotenv import load_dotenv

load_dotenv()

# --- 1. FIREBASE INIT ---
if not firebase_admin._apps:
    try:
        cred_json = os.getenv("FIREBASE_CREDENTIALS")
        if cred_json:
            firebase_admin.initialize_app(credentials.Certificate(json.loads(cred_json)))
    except Exception as e:
        print("Firebase Error:", e)

db = firestore.client() if firebase_admin._apps else None

# --- 2. APP SETUP ---
app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. SECURITY SETUP ---
SECRET_KEY = os.getenv("JWT_SECRET", "fallback")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(minutes=1440)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        if payload.get("sub") is None: raise HTTPException(status_code=401)
        return payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401)

# --- 4. MODELS ---
class LoginReq(BaseModel): email: str; password: str
class Project(BaseModel): title: str; description: str; imageUrl: str; tags: List[str]; liveUrl: Optional[str] = None; githubUrl: Optional[str] = None; outcomes: str
class Experience(BaseModel): role: str; organization: str; dateRange: str; summary: str; responsibilities: List[str]
class Contact(BaseModel): name: str; email: str; message: str

# --- 5. ROUTES ---

@app.post("/api/login")
async def login(req: LoginReq):
    if req.email == os.getenv("ADMIN_EMAIL") and req.password == os.getenv("ADMIN_PASSWORD"):
        return {"access_token": create_access_token({"sub": req.email}), "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# PROJECTS
@app.get("/api/projects")
async def get_proj():
    if not db: return []
    return [{"id": d.id, **d.to_dict()} for d in db.collection('projects').stream()]

@app.post("/api/projects")
async def add_proj(p: Project, user: str = Depends(get_current_user)):
    ref = db.collection('projects').document()
    ref.set(p.model_dump())
    return {"id": ref.id, **p.model_dump()}

@app.delete("/api/projects/{pid}")
async def del_proj(pid: str, user: str = Depends(get_current_user)):
    db.collection('projects').document(pid).delete()
    return {"msg": "deleted"}

# EXPERIENCE
@app.get("/api/experience")
async def get_exp():
    if not db: return []
    return [{"id": d.id, **d.to_dict()} for d in db.collection('experience').stream()]

@app.post("/api/experience")
async def add_exp(e: Experience, user: str = Depends(get_current_user)):
    ref = db.collection('experience').document()
    ref.set(e.model_dump())
    return {"id": ref.id, **e.model_dump()}

@app.delete("/api/experience/{eid}")
async def del_exp(eid: str, user: str = Depends(get_current_user)):
    db.collection('experience').document(eid).delete()
    return {"msg": "deleted"}

# CONTACT
@app.post("/api/contact")
async def contact(c: Contact):
    if db:
        d = c.model_dump()
        d['createdAt'] = datetime.utcnow().isoformat()
        db.collection('messages').document().set(d)
    
    resend.api_key = os.getenv("RESEND_API_KEY")
    if resend.api_key:
        try:
            resend.Emails.send({
                "from": "Portfolio <onboarding@resend.dev>",
                "to": os.getenv("ADMIN_EMAIL"),
                "subject": f"New Message from {c.name}",
                "reply_to": c.email,
                "html": f"<p><strong>Email:</strong> {c.email}</p><p>{c.message}</p>"
            })
        except Exception: pass
    return {"msg": "ok"}