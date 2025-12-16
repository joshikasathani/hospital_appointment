from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text

from app.db.base import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=False)
    service_name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)  # e.g., "Consultation", "Test", "Procedure"
    duration_minutes = Column(Integer, nullable=True)  # Estimated duration
    is_active = Column(String, default=True)  # Whether service is currently offered

    # Temporarily remove all relationships to avoid circular imports
    # hospital = relationship("Hospital", back_populates="services_offered")
    # appointments = relationship("Appointment", back_populates="service")
