# ...user_model.py...
# app/models/user_model.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Literal

class UserModel(BaseModel):
    employee_id: str = Field(...)
    name: str
    email: EmailStr
    password: str  # Hashed
    role: Literal["superadmin", "admin", "cms_user", "hr", "employee"]
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
