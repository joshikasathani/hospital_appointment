from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    # Foreign keys
    appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=False)

    # Razorpay details
    razorpay_order_id = Column(String, nullable=True)
    razorpay_payment_id = Column(String, nullable=True)
    razorpay_signature = Column(String, nullable=True)

    # Payment amounts
    total_amount = Column(Float, nullable=False)
    admin_commission = Column(Float, nullable=False)   # 10%
    hospital_payout = Column(Float, nullable=False)    # 90%

    # Payment status
    status = Column(String, default="PENDING")  # PENDING, SUCCESS, FAILED

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    appointment = relationship("Appointment")
