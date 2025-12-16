from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, JSON

from app.db.base import Base


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)
    contact_email = Column(String, nullable=False)
    contact_phone = Column(String, nullable=False)
    website = Column(String, nullable=True)
    
    # Enhanced hospital details
    category = Column(String, nullable=False)  # e.g., "General", "Specialty", "Multi-Specialty"
    specialties = Column(JSON, nullable=True)  # List of specialties
    facilities = Column(JSON, nullable=True)   # List of facilities
    services = Column(JSON, nullable=True)     # List of services
    timings = Column(JSON, nullable=True)      # Operating hours
    images = Column(JSON, nullable=True)       # List of image URLs
    description = Column(Text, nullable=True)  # Hospital description
    emergency_services = Column(Boolean, default=False)
    rating = Column(Integer, default=0)  # Rating out of 5 (stored as integer for simplicity)
    price_range = Column(String, default="Moderate")
    established_year = Column(Integer, nullable=True)
    bed_count = Column(Integer, nullable=True)
    doctor_count = Column(Integer, nullable=True)
    accreditation = Column(JSON, nullable=True)
    insurance_accepted = Column(JSON, nullable=True)

    # Approval workflow
    is_approved = Column(Boolean, default=False)

    # Owner (hospital admin user) - temporarily remove foreign key constraint
    # owner_id = Column(Integer, ForeignKey("users.id"))
    owner_id = Column(Integer, nullable=True)

    # Temporarily remove all relationships to avoid circular imports
    # owner = relationship("User", back_populates="hospital")
    # appointments = relationship("Appointment", back_populates="hospital")
    # services_offered = relationship("Service", back_populates="hospital")
