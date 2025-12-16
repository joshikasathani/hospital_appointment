from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

from app.db.session import get_db
from app.models.hospital import Hospital
from app.models.appointment import Appointment
from app.models.payment import Payment
from app.models.user import User
from app.models.contact import Contact
from app.core.dependencies import require_admin

router = APIRouter()


@router.get("/dashboard")
def get_admin_dashboard(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    """Get comprehensive admin dashboard statistics"""
    
    # Basic counts
    total_hospitals = db.query(Hospital).count()
    approved_hospitals = db.query(Hospital).filter(Hospital.is_approved == True).count()
    pending_hospitals = total_hospitals - approved_hospitals
    
    total_appointments = db.query(Appointment).count()
    
    # Payment statistics
    total_payments = db.query(Payment).filter(Payment.status == "SUCCESS").count()
    total_revenue = db.query(func.sum(Payment.total_amount)).filter(Payment.status == "SUCCESS").scalar() or 0
    total_commission = db.query(func.sum(Payment.admin_commission)).filter(Payment.status == "SUCCESS").scalar() or 0
    
    # Recent activity
    recent_appointments = db.query(Appointment).order_by(desc(Appointment.created_at)).limit(5).all()
    recent_payments = db.query(Payment).filter(Payment.status == "SUCCESS").order_by(desc(Payment.created_at)).limit(5).all()
    pending_enquiries = db.query(Contact).filter(Contact.status == "PENDING").count()
    
    return {
        "overview": {
            "total_hospitals": total_hospitals,
            "approved_hospitals": approved_hospitals,
            "pending_hospitals": pending_hospitals,
            "total_appointments": total_appointments,
            "total_payments": total_payments,
            "pending_enquiries": pending_enquiries
        },
        "financials": {
            "total_revenue": float(total_revenue),
            "total_commission": float(total_commission),
            "hospital_payouts": float(total_revenue - total_commission)
        },
        "recent_activity": {
            "recent_appointments": [
                {
                    "id": apt.id,
                    "patient_name": apt.patient_name,
                    "hospital_name": apt.hospital.name if apt.hospital else "Unknown",
                    "service_name": apt.service_name,
                    "appointment_date": apt.appointment_date.isoformat() if apt.appointment_date else None,
                    "status": apt.status
                }
                for apt in recent_appointments
            ],
            "recent_payments": [
                {
                    "id": pay.id,
                    "amount": float(pay.total_amount),
                    "commission": float(pay.admin_commission),
                    "hospital_payout": float(pay.hospital_payout),
                    "created_at": pay.created_at.isoformat() if pay.created_at else None
                }
                for pay in recent_payments
            ]
        }
    }


@router.get("/payments/tracking")
def get_payment_tracking(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    hospital_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get detailed payment tracking with commission breakdown"""
    
    query = db.query(Payment).join(Appointment).join(Hospital)
    
    # Date filtering
    if start_date:
        start = datetime.fromisoformat(start_date)
        query = query.filter(Payment.created_at >= start)
    
    if end_date:
        end = datetime.fromisoformat(end_date)
        query = query.filter(Payment.created_at <= end)
    
    # Hospital filtering
    if hospital_id:
        query = query.filter(Payment.appointment.has(Appointment.hospital_id == hospital_id))
    
    # Only successful payments
    query = query.filter(Payment.status == "SUCCESS")
    
    payments = query.order_by(desc(Payment.created_at)).all()
    
    # Calculate totals
    total_amount = sum(p.total_amount for p in payments)
    total_commission = sum(p.admin_commission for p in payments)
    total_hospital_payout = sum(p.hospital_payout for p in payments)
    
    return {
        "summary": {
            "total_payments": len(payments),
            "total_amount": float(total_amount),
            "total_commission": float(total_commission),
            "total_hospital_payout": float(total_hospital_payout),
            "commission_rate": float(total_commission / total_amount * 100) if total_amount > 0 else 0
        },
        "payments": [
            {
                "id": p.id,
                "appointment_id": p.appointment_id,
                "hospital_name": p.appointment.hospital.name if p.appointment and p.appointment.hospital else "Unknown",
                "patient_name": p.appointment.patient_name if p.appointment else "Unknown",
                "total_amount": float(p.total_amount),
                "admin_commission": float(p.admin_commission),
                "hospital_payout": float(p.hospital_payout),
                "commission_percentage": float(p.admin_commission / p.total_amount * 100) if p.total_amount > 0 else 0,
                "status": p.status,
                "created_at": p.created_at.isoformat() if p.created_at else None
            }
            for p in payments
        ]
    }


@router.get("/hospitals/performance")
def get_hospital_performance(db: Session = Depends(get_db), current_user: User = Depends(require_admin)):
    """Get performance metrics for all hospitals"""
    
    hospitals = db.query(Hospital).filter(Hospital.is_approved == True).all()
    
    performance_data = []
    for hospital in hospitals:
        # Get appointments count
        appointments_count = db.query(Appointment).filter(
            Appointment.hospital_id == hospital.id
        ).count()
        
        # Get revenue
        revenue = db.query(func.sum(Payment.total_amount)).join(Appointment).filter(
            Appointment.hospital_id == hospital.id,
            Payment.status == "SUCCESS"
        ).scalar() or 0
        
        # Get commission earned
        commission = db.query(func.sum(Payment.admin_commission)).join(Appointment).filter(
            Appointment.hospital_id == hospital.id,
            Payment.status == "SUCCESS"
        ).scalar() or 0
        
        performance_data.append({
            "hospital_id": hospital.id,
            "hospital_name": hospital.name,
            "city": hospital.city,
            "appointments_count": appointments_count,
            "total_revenue": float(revenue),
            "commission_earned": float(commission),
            "hospital_payout": float(revenue - commission)
        })
    
    # Sort by revenue
    performance_data.sort(key=lambda x: x["total_revenue"], reverse=True)
    
    return {
        "hospitals": performance_data,
        "summary": {
            "total_hospitals": len(performance_data),
            "total_revenue": sum(h["total_revenue"] for h in performance_data),
            "total_commission": sum(h["commission_earned"] for h in performance_data)
        }
    }


@router.get("/analytics/revenue")
def get_revenue_analytics(
    period: str = Query("month", regex="^(week|month|year)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get revenue analytics over time"""
    
    # Calculate date range based on period
    end_date = datetime.now()
    if period == "week":
        start_date = end_date - timedelta(days=7)
        date_trunc = "day"
    elif period == "month":
        start_date = end_date - timedelta(days=30)
        date_trunc = "day"
    else:  # year
        start_date = end_date - timedelta(days=365)
        date_trunc = "month"
    
    # Get payments grouped by date
    payments = db.query(
        func.date(Payment.created_at).label('date'),
        func.sum(Payment.total_amount).label('revenue'),
        func.sum(Payment.admin_commission).label('commission'),
        func.count(Payment.id).label('payment_count')
    ).filter(
        Payment.status == "SUCCESS",
        Payment.created_at >= start_date,
        Payment.created_at <= end_date
    ).group_by(func.date(Payment.created_at)).all()
    
    return {
        "period": period,
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "data": [
            {
                "date": str(p.date),
                "revenue": float(p.revenue or 0),
                "commission": float(p.commission or 0),
                "payment_count": p.payment_count or 0
            }
            for p in payments
        ],
        "summary": {
            "total_revenue": float(sum(p.revenue or 0 for p in payments)),
            "total_commission": float(sum(p.commission or 0 for p in payments)),
            "total_payments": sum(p.payment_count or 0 for p in payments)
        }
    }
