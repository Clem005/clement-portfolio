import os
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from services.firebase import db
from models import ProjectModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

# Security Dependency: Verifies your JWT token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET", "fallback"), algorithms=["HS256"])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# GET (Public) - Fetch all projects
@router.get("/")
async def get_projects():
    if not db:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    docs = db.collection('projects').stream()
    projects = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        projects.append(data)
    return projects

# POST (Protected) - Add a new project
@router.post("/")
async def add_project(project: ProjectModel, current_user: str = Depends(get_current_user)):
    doc_ref = db.collection('projects').document()
    doc_ref.set(project.model_dump())
    return {"id": doc_ref.id, **project.model_dump()}

# DELETE (Protected) - Delete a project
@router.delete("/{project_id}")
async def delete_project(project_id: str, current_user: str = Depends(get_current_user)):
    db.collection('projects').document(project_id).delete()
    return {"message": "Project deleted successfully"}