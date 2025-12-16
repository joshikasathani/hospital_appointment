from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.db.base import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    hospital_id = Column(Integer, nullable=True)  # If enquiry is about specific hospital
    status = Column(String, default="PENDING")  # PENDING, RESOLVED, CLOSED
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
