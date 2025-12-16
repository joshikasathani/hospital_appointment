from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ContactBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    hospital_id: Optional[int] = None


class ContactCreate(ContactBase):
    pass


class ContactResponse(ContactBase):
    id: int
    status: str
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True
