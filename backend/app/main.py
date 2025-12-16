from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, hospitals, appointments, payments, contact, services, admin
from app.db.session import engine
from app.db.base import Base

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Hospital Appointment Booking API",
    description="A comprehensive hospital listing and appointment booking system",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(hospitals.router, prefix="/api/hospitals", tags=["Hospitals"])
app.include_router(services.router, prefix="/api/services", tags=["Services"])
app.include_router(appointments.router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
def root():
    return {"message": "Hospital Appointment Booking API v2.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "2.0.0"}
