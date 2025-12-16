from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Optional
import razorpay

from app.db.session import get_db
from app.core.config import settings
from app.models.payment import Payment
from app.models.appointment import Appointment
from app.models.settings import CommissionSettings
from app.schemas.payment import PaymentCreate, PaymentResponse, PaymentVerification

router = APIRouter()


# Initialize Razorpay client
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


def calculate_payment_split(total_amount: float, commission_percentage: float = 10.0) -> Dict[str, float]:
    """Calculate payment split between admin and hospital"""
    admin_commission = round(total_amount * (commission_percentage / 100), 2)
    hospital_payout = round(total_amount - admin_commission, 2)
    return {
        "admin_commission": admin_commission,
        "hospital_payout": hospital_payout,
        "commission_percentage": commission_percentage
    }


@router.post("/create-order", status_code=status.HTTP_201_CREATED)
def create_payment_order(payment_data: PaymentCreate, db: Session = Depends(get_db)):
    """Create a payment order with commission calculation"""
    
    # Validate appointment
    appointment = db.query(Appointment).filter(Appointment.id == payment_data.appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if payment_data.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid payment amount")

    # Get commission settings
    commission_setting = db.query(CommissionSettings).filter(CommissionSettings.is_active == True).first()
    commission_percentage = commission_setting.commission_percentage if commission_setting else 10.0

    # Calculate commission split
    split = calculate_payment_split(payment_data.amount, commission_percentage)

    # Create Razorpay order
    try:
        order = razorpay_client.order.create({
            "amount": int(payment_data.amount * 100),  # Razorpay uses paise
            "currency": "INR",
            "payment_capture": 1,
            "receipt": f"receipt_{appointment.id}",
            "notes": {
                "appointment_id": appointment.id,
                "patient_name": appointment.patient_name,
                "hospital_name": appointment.hospital.name if appointment.hospital else "Unknown"
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create payment order: {str(e)}")

    # Create payment record
    payment = Payment(
        appointment_id=appointment.id,
        razorpay_order_id=order.get("id"),
        total_amount=payment_data.amount,
        admin_commission=split["admin_commission"],
        hospital_payout=split["hospital_payout"],
        status="PENDING"
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return {
        "order_id": order.get("id"),
        "amount": payment_data.amount,
        "currency": "INR",
        "commission_split": {
            "admin_commission": split["admin_commission"],
            "hospital_payout": split["hospital_payout"],
            "commission_percentage": split["commission_percentage"]
        }
    }


@router.post("/verify", status_code=status.HTTP_200_OK)
def verify_payment(verification_data: PaymentVerification, db: Session = Depends(get_db)):
    """Verify payment and update status"""
    
    # Verify Razorpay signature
    try:
        payload = {
            'razorpay_order_id': verification_data.razorpay_order_id,
            'razorpay_payment_id': verification_data.razorpay_payment_id,
            'razorpay_signature': verification_data.razorpay_signature
        }
        razorpay_client.utility.verify_payment_signature(payload)
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    # Find payment record
    payment = db.query(Payment).filter(
        Payment.razorpay_order_id == verification_data.razorpay_order_id
    ).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Payment record not found")

    # Update payment status
    payment.razorpay_payment_id = verification_data.razorpay_payment_id
    payment.razorpay_signature = verification_data.razorpay_signature
    payment.status = "SUCCESS"

    # Update appointment status
    appointment = db.query(Appointment).filter(Appointment.id == payment.appointment_id).first()
    if appointment:
        appointment.status = "CONFIRMED"
        appointment.paid_amount = payment.total_amount

    db.commit()
    db.refresh(payment)

    return {
        "message": "Payment successful",
        "payment_id": payment.id,
        "appointment_id": payment.appointment_id,
        "total_amount": payment.total_amount,
        "admin_commission": payment.admin_commission,
        "hospital_payout": payment.hospital_payout,
        "commission_percentage": round((payment.admin_commission / payment.total_amount) * 100, 2)
    }


@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    """Get payment details by ID"""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment


@router.get("/appointment/{appointment_id}", response_model=PaymentResponse)
def get_payment_by_appointment(appointment_id: int, db: Session = Depends(get_db)):
    """Get payment details for a specific appointment"""
    payment = db.query(Payment).filter(Payment.appointment_id == appointment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found for this appointment")
    return payment


@router.get("/status/{payment_id}")
def get_payment_status(payment_id: int, db: Session = Depends(get_db)):
    """Get payment status only"""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    return {
        "payment_id": payment.id,
        "status": payment.status,
        "total_amount": payment.total_amount,
        "created_at": payment.created_at
    }


@router.post("/initiate-partial")
def initiate_partial_payment(
    appointment_id: int,
    partial_amount: float,
    db: Session = Depends(get_db)
):
    """Initiate partial payment for appointment"""
    
    # Validate appointment
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if partial_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid partial payment amount")

    if partial_amount > appointment.total_amount:
        raise HTTPException(status_code=400, detail="Partial amount cannot exceed total amount")

    # Get commission settings
    commission_setting = db.query(CommissionSettings).filter(CommissionSettings.is_active == True).first()
    commission_percentage = commission_setting.commission_percentage if commission_setting else 10.0

    # Calculate commission split for partial payment
    split = calculate_payment_split(partial_amount, commission_percentage)

    # Create Razorpay order for partial payment
    try:
        order = razorpay_client.order.create({
            "amount": int(partial_amount * 100),
            "currency": "INR",
            "payment_capture": 1,
            "receipt": f"partial_receipt_{appointment.id}",
            "notes": {
                "appointment_id": appointment.id,
                "partial_payment": True,
                "remaining_amount": appointment.total_amount - partial_amount
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create partial payment order: {str(e)}")

    # Create payment record for partial payment
    payment = Payment(
        appointment_id=appointment.id,
        razorpay_order_id=order.get("id"),
        total_amount=partial_amount,
        admin_commission=split["admin_commission"],
        hospital_payout=split["hospital_payout"],
        status="PENDING"
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return {
        "order_id": order.get("id"),
        "partial_amount": partial_amount,
        "remaining_amount": appointment.total_amount - partial_amount,
        "currency": "INR",
        "commission_split": {
            "admin_commission": split["admin_commission"],
            "hospital_payout": split["hospital_payout"],
            "commission_percentage": split["commission_percentage"]
        }
    }


@router.put("/commission-settings")
def update_commission_settings(
    commission_percentage: float,
    db: Session = Depends(get_db)
):
    """Update commission percentage (admin only)"""
    
    if commission_percentage < 0 or commission_percentage > 100:
        raise HTTPException(status_code=400, detail="Commission percentage must be between 0 and 100")

    # Update existing setting or create new one
    setting = db.query(CommissionSettings).filter(CommissionSettings.is_active == True).first()
    if setting:
        setting.commission_percentage = commission_percentage
    else:
        setting = CommissionSettings(commission_percentage=commission_percentage)
        db.add(setting)

    db.commit()
    db.refresh(setting)

    return {
        "message": "Commission settings updated successfully",
        "commission_percentage": setting.commission_percentage
    }


@router.get("/commission-settings")
def get_commission_settings(db: Session = Depends(get_db)):
    """Get current commission settings"""
    
    setting = db.query(CommissionSettings).filter(CommissionSettings.is_active == True).first()
    if not setting:
        # Create default setting if none exists
        setting = CommissionSettings(commission_percentage=10.0)
        db.add(setting)
        db.commit()
        db.refresh(setting)

    return {
        "commission_percentage": setting.commission_percentage,
        "description": setting.description,
        "updated_at": setting.updated_at
    }
