from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from services.firebase import db 
import auth
from routers import projects # <-- NEW: Import your projects router
from routers import projects, experience
from routers import projects, experience, contact

load_dotenv()

app = FastAPI(title="Clement Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routers ---
# <-- NEW: This attaches your project endpoints to /api/projects
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"]) 
app.include_router(experience.router, prefix="/api/experience", tags=["Experience"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])

# --- MODELS ---
class LoginRequest(BaseModel):
    email: str
    password: str

# --- ROUTES ---
@app.get("/")
async def root():
    return {"status": "ok", "message": "Backend is running flawlessly!"}

@app.post("/api/login")
async def login(request: LoginRequest):
    correct_email = os.getenv("ADMIN_EMAIL")
    correct_password = os.getenv("ADMIN_PASSWORD")

    if request.email == correct_email and request.password == correct_password:
        token = auth.create_access_token(data={"sub": request.email})
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")