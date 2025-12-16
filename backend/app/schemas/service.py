from pydantic import BaseModel
from typing import Optional


class ServiceBase(BaseModel):
    service_name: str
    price: float
    description: str
    category: Optional[str] = None
    duration_minutes: Optional[int] = None
    is_active: bool = True


class ServiceCreate(ServiceBase):
    hospital_id: int


class ServiceUpdate(BaseModel):
    service_name: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration_minutes: Optional[int] = None
    is_active: Optional[bool] = None


class ServiceResponse(ServiceBase):
    id: int
    hospital_id: int

    class Config:
        from_attributes = True
