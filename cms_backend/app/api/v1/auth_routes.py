# ...auth_routes.py...
# app/api/v1/auth_routes.py
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth_schema import UserRegisterSchema, UserLoginSchema, TokenResponse
from app.utils.jwt_handler import create_access_token
from app.db.database import db
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register", response_model=dict)
async def register_user(payload: UserRegisterSchema):
    user_data = payload.dict()
    existing = await db["users"].find_one({"employee_id": user_data["employee_id"]})
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")

    user_data["password"] = pwd_context.hash(user_data["password"])
    await db["users"].insert_one(user_data)
    return {"msg": "User registered successfully"}

@router.post("/login", response_model=TokenResponse)
async def login_user(payload: UserLoginSchema):
    user = await db["users"].find_one({"employee_id": payload.employee_id})
    if not user or not pwd_context.verify(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["employee_id"], "role": user["role"]})
    return {"access_token": token}
