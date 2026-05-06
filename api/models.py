from pydantic import BaseModel
from typing import List, Optional

class ProjectModel(BaseModel):
    title: str
    description: str
    imageUrl: str
    tags: List[str]
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    outcomes: str

class ExperienceModel(BaseModel):
    role: str
    organization: str
    dateRange: str
    summary: str
    responsibilities: List[str]

class ContactModel(BaseModel):
    name: str
    email: str
    message: str