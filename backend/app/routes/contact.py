from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter()


@router.post("/enquiry", response_model=ContactResponse)
def create_enquiry(contact: ContactCreate, db: Session = Depends(get_db)):
    """Submit a new enquiry/contact form"""
    db_contact = Contact(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        subject=contact.subject,
        message=contact.message,
        hospital_id=contact.hospital_id
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@router.get("/enquiries", response_model=List[ContactResponse])
def get_enquiries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all contact enquiries (admin only)"""
    enquiries = db.query(Contact).offset(skip).limit(limit).all()
    return enquiries


@router.get("/enquiries/{enquiry_id}", response_model=ContactResponse)
def get_enquiry(enquiry_id: int, db: Session = Depends(get_db)):
    """Get specific enquiry details"""
    enquiry = db.query(Contact).filter(Contact.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return enquiry


@router.put("/enquiries/{enquiry_id}/status")
def update_enquiry_status(enquiry_id: int, status: str, db: Session = Depends(get_db)):
    """Update enquiry status (admin only)"""
    enquiry = db.query(Contact).filter(Contact.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    enquiry.status = status
    db.commit()
    return {"message": f"Enquiry status updated to {status}"}
