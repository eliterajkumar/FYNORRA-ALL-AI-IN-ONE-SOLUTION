# ...client_schema.py...
# app/schemas/client_schema.py
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactPersonSchema(BaseModel):
    name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    designation: Optional[str]

class ServiceSchema(BaseModel):
    name: str
    start_date: datetime
    end_date: datetime
    billing_cycle: str
    amount: float
    status: str

class ClientCreateSchema(BaseModel):
    company_name: str
    gst_number: Optional[str]
    address: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    contact_persons: List[ContactPersonSchema] = []
    services: List[ServiceSchema] = []

class ClientResponseSchema(ClientCreateSchema):
    id: str
    created_at: datetime
