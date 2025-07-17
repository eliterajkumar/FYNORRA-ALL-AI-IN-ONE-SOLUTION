# ...auth_schema.py...
# app/schemas/auth_schema.py
from pydantic import BaseModel, EmailStr
from typing import Literal

class UserRegisterSchema(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    password: str
    role: Literal["superadmin", "admin", "cms_user", "hr", "employee"]

class UserLoginSchema(BaseModel):
    employee_id: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
