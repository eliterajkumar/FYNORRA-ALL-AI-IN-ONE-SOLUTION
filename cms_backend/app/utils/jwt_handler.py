# ...jwt_handler.py...
# app/utils/jwt_handler.py
from datetime import datetime, timedelta
from jose import jwt, JWTError
from os import getenv

SECRET_KEY = getenv("JWT_SECRET")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_minutes: int = 120):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
