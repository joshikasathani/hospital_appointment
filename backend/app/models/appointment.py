from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

from app.db.base import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=False)

    # Appointment details
    service = Column(String, nullable=False)
    appointment_date = Column(DateTime, nullable=False)
    status = Column(String, default="BOOKED")  # BOOKED, COMPLETED, CANCELLED

    created_at = Column(DateTime, default=datetime.utcnow)

    # Temporarily remove all relationships to avoid circular imports
    # patient = relationship("User", back_populates="appointments")
    # hospital = relationship("Hospital", back_populates="appointments")
