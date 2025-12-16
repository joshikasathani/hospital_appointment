from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PaymentCreate(BaseModel):
    appointment_id: int
    amount: float


class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class PaymentResponse(BaseModel):
    id: int
    appointment_id: int
    razorpay_order_id: Optional[str]
    razorpay_payment_id: Optional[str]
    razorpay_signature: Optional[str]
    total_amount: float
    admin_commission: float
    hospital_payout: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
