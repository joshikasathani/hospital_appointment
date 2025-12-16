from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any


class HospitalBase(BaseModel):
    name: str
    address: str
    city: str
    state: Optional[str] = None
    zip_code: Optional[str] = None
    contact_email: EmailStr
    contact_phone: str
    website: Optional[str] = None
    category: str
    specialties: Optional[List[str]] = []
    facilities: Optional[List[str]] = []
    services: Optional[List[str]] = []
    timings: Optional[Dict[str, Any]] = {}
    images: Optional[List[str]] = []
    description: Optional[str] = None
    emergency_services: Optional[bool] = False
    rating: Optional[float] = 0.0
    price_range: Optional[str] = "Moderate"
    established_year: Optional[int] = None
    bed_count: Optional[int] = None
    doctor_count: Optional[int] = None
    accreditation: Optional[List[str]] = []
    insurance_accepted: Optional[List[str]] = []


class HospitalCreate(HospitalBase):
    logo_url: Optional[str] = None


class HospitalUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    category: Optional[str] = None
    specialties: Optional[List[str]] = None
    facilities: Optional[List[str]] = None
    services: Optional[List[str]] = None
    timings: Optional[Dict[str, Any]] = None
    images: Optional[List[str]] = None
    description: Optional[str] = None
    emergency_services: Optional[bool] = None
    rating: Optional[float] = None
    price_range: Optional[str] = None
    established_year: Optional[int] = None
    bed_count: Optional[int] = None
    doctor_count: Optional[int] = None
    accreditation: Optional[List[str]] = None
    insurance_accepted: Optional[List[str]] = None


class HospitalResponse(HospitalBase):
    id: int
    logo_url: Optional[str]
    is_approved: bool
    owner_id: Optional[int]

    model_config = {
        'from_attributes': True
    }
