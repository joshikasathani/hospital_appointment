from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.db.session import get_db
from app.models.appointment import Appointment
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentResponse
from app.core.dependencies import require_patient, require_hospital, get_current_user

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def book_appointment(appointment_in: AppointmentCreate, db: Session = Depends(get_db), current_user: User = Depends(require_patient)):
    # Validate hospital
    hospital = db.query(Hospital).filter(
        Hospital.id == appointment_in.hospital_id,
        Hospital.is_approved == True
    ).first()

    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found or not approved")

    # Validate patient
    patient = db.query(User).filter(
        User.id == appointment_in.patient_id,
        User.role == "patient"
    ).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Create appointment
    appointment = Appointment(
        patient_id=appointment_in.patient_id,
        hospital_id=appointment_in.hospital_id,
        service=appointment_in.service,
        appointment_date=appointment_in.appointment_date,
        status="BOOKED",
        created_at=datetime.utcnow()
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment


@router.get("/hospital/{hospital_id}", response_model=List[AppointmentResponse])
def get_hospital_appointments(hospital_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_hospital)):
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")

    return db.query(Appointment).filter(Appointment.hospital_id == hospital_id).all()


@router.get("/patient/{patient_id}", response_model=List[AppointmentResponse])
def get_patient_appointments(patient_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_patient)):
    patient = db.query(User).filter(User.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    return db.query(Appointment).filter(Appointment.patient_id == patient_id).all()


@router.put("/{appointment_id}/cancel", response_model=AppointmentResponse)
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if appointment.status == "CANCELLED":
        raise HTTPException(status_code=400, detail="Appointment already cancelled")

    appointment.status = "CANCELLED"
    db.commit()
    db.refresh(appointment)

    return appointment
