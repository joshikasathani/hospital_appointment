#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.hospital import Hospital
from app.schemas.hospital import HospitalResponse
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/test-hospitals")
def test_hospitals():
    try:
        db = SessionLocal()
        hospitals = db.query(Hospital).all()
        print(f"Found {len(hospitals)} hospitals")
        
        result = []
        for hospital in hospitals:
            try:
                hospital_data = HospitalResponse.model_validate(hospital)
                result.append(hospital_data.model_dump())
                print(f"Successfully serialized: {hospital.name}")
            except Exception as e:
                print(f"Serialization error for {hospital.name}: {str(e)}")
                return JSONResponse(
                    status_code=500,
                    content={"error": f"Serialization error: {str(e)}"}
                )
        
        db.close()
        return JSONResponse(content=result)
        
    except Exception as e:
        print(f"Database error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Database error: {str(e)}"}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
    print("Test server running on http://localhost:8001")
