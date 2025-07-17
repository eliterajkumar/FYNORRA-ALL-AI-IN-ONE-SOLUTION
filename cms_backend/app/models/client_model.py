# ...client_model.py...
# app/models/client_model.py
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class ContactPerson(BaseModel):
    name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    designation: Optional[str]

class ServiceInfo(BaseModel):
    name: str
    start_date: datetime
    end_date: datetime
    billing_cycle: str  # Monthly / Quarterly / Yearly
    amount: float
    status: str  # Running / Expired

class ClientModel(BaseModel):
    company_name: str = Field(...)
    gst_number: Optional[str]
    address: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    contact_persons: List[ContactPerson] = []
    services: List[ServiceInfo] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
