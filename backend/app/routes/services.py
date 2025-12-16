from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.models.service import Service
from app.models.hospital import Hospital
from app.schemas.service import ServiceCreate, ServiceResponse, ServiceUpdate
from app.core.dependencies import require_admin, require_hospital, get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=ServiceResponse)
def create_service(
    service: ServiceCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    """Create a new service (hospital owner or admin only)"""
    # Verify hospital exists and user has permission
    hospital = db.query(Hospital).filter(Hospital.id == service.hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    # Check permissions
    if current_user.role not in ["admin"] and hospital.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to add services to this hospital")
    
    db_service = Service(
        hospital_id=service.hospital_id,
        service_name=service.service_name,
        price=service.price,
        description=service.description,
        category=service.category,
        duration_minutes=service.duration_minutes,
        is_active=service.is_active
    )
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


@router.get("/", response_model=List[ServiceResponse])
def get_services(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    hospital_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    active_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Get services with filtering"""
    query = db.query(Service)
    
    if hospital_id:
        query = query.filter(Service.hospital_id == hospital_id)
    
    if category:
        query = query.filter(Service.category == category)
    
    if active_only:
        query = query.filter(Service.is_active == True)
    
    services = query.offset(skip).limit(limit).all()
    return services


@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """Get service details by ID"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.get("/hospital/{hospital_id}", response_model=List[ServiceResponse])
def get_hospital_services(hospital_id: int, active_only: bool = Query(True), db: Session = Depends(get_db)):
    """Get all services for a specific hospital"""
    # Verify hospital exists
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    query = db.query(Service).filter(Service.hospital_id == hospital_id)
    if active_only:
        query = query.filter(Service.is_active == True)
    
    services = query.all()
    return services


@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    service_update: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update service details (hospital owner or admin only)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Check permissions
    hospital = db.query(Hospital).filter(Hospital.id == service.hospital_id).first()
    if current_user.role not in ["admin"] and hospital.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this service")
    
    # Update fields
    update_data = service_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(service, field, value)
    
    db.commit()
    db.refresh(service)
    return service


@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Delete a service (admin only)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(service)
    db.commit()
    return {"message": "Service deleted successfully"}


@router.get("/categories/list")
def get_service_categories(db: Session = Depends(get_db)):
    """Get list of all service categories"""
    categories = db.query(Service.category).distinct().all()
    return {"categories": [cat[0] for cat in categories if cat[0]]}
