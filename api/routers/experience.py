from fastapi import APIRouter, HTTPException, Depends
from services.firebase import db
from models import ExperienceModel
from routers.projects import get_current_user # Reusing our JWT security check!

router = APIRouter()

# GET (Public) - Fetch all experience entries
@router.get("/")
async def get_experiences():
    if not db:
        raise HTTPException(status_code=500, detail="Database not connected")
    
    docs = db.collection('experience').stream()
    experiences = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        experiences.append(data)
    return experiences

# POST (Protected) - Add a new experience
@router.post("/")
async def add_experience(exp: ExperienceModel, current_user: str = Depends(get_current_user)):
    doc_ref = db.collection('experience').document()
    doc_ref.set(exp.model_dump())
    return {"id": doc_ref.id, **exp.model_dump()}

# DELETE (Protected) - Delete an experience
@router.delete("/{exp_id}")
async def delete_experience(exp_id: str, current_user: str = Depends(get_current_user)):
    db.collection('experience').document(exp_id).delete()
    return {"message": "Experience deleted successfully"}