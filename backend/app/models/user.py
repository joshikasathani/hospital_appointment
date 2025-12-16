from sqlalchemy import Column, Integer, String, Boolean

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # admin, hospital, patient
    is_active = Column(Boolean, default=True)

    # Temporarily remove all relationships to avoid circular imports
    # hospital = relationship("Hospital", back_populates="owner", uselist=False)
    # appointments = relationship("Appointment", back_populates="patient")
