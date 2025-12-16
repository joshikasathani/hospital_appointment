from pydantic import BaseModel
from datetime import datetime


class AppointmentBase(BaseModel):
    patient_id: int
    hospital_id: int
    service: str
    appointment_date: datetime


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentResponse(AppointmentBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
