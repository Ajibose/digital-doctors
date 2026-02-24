from pydantic import BaseModel, Field, field_validator
from typing import Optional


class RiskRequest(BaseModel):
    age: int = Field(..., ge=0, le=120)
    bmi: float = Field(..., ge=10, le=80)
    systolic_bp: float = Field(..., ge=50, le=250)
    diastolic_bp: float = Field(..., ge=30, le=150)
    severity_score: float = Field(..., ge=0, le=10)
    chronic_conditions: Optional[str] = None


class TreatmentRequest(BaseModel):
    patient_age: int = Field(..., ge=0, le=120)
    severity_score: float = Field(..., ge=0, le=10)
    compliance_rate: float = Field(..., ge=0, le=1)
    medication: str
    condition: str