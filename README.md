# Hospital Appointment Booking System

## Overview
This is a full-stack Hospital Appointment Booking Web Application where hospitals must register and get admin approval before being visible to patients. Patients can book appointments, make online payments, and receive confirmation notifications.

## Core Features
- Hospital registration with admin approval
- Only approved hospitals are visible to patients
- Appointment booking system
- Online payments using Razorpay
- Automatic payment split (10% admin, 90% hospital)
- Role-based authentication (Admin, Hospital, Patient)
- Email notifications for bookings

## Tech Stack
### Frontend
- React.js
- Tailwind CSS

### Backend
- Python (FastAPI)
- SQLAlchemy ORM
- JWT Authentication

### Database
- PostgreSQL

### Payments
- Razorpay (Test Mode)

## Project Structure
- backend/: FastAPI backend application
- frontend/: React frontend application

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup
1. Navigate to backend directory
2. Create virtual environment
3. Install dependencies using requirements.txt
4. Configure environment variables
5. Run FastAPI server

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies using npm install
3. Start development server

## Environment Variables
Create a .env file based on .env.example and configure database, JWT, and Razorpay keys.

## Payment Logic
- Patient pays full amount
- 10% commission goes to admin
- 90% payout goes to hospital

## Roles
- Admin: Approves hospitals and tracks revenue
- Hospital: Manages appointments and earnings
- Patient: Books appointments and makes payments

## Status
Project is under active development.
