from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from sqlalchemy.orm import relationship

from app.db.base import Base


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, nullable=False, unique=True)
    value = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)


class CommissionSettings(Base):
    __tablename__ = "commission_settings"

    id = Column(Integer, primary_key=True, index=True)
    commission_percentage = Column(Float, nullable=False, default=10.0)
    description = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(String, nullable=True)
    updated_at = Column(String, nullable=True)
