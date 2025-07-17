# ...security.py...
# app/core/security.py
from fastapi import Depends, HTTPException, Header
from app.utils.jwt_handler import verify_token

async def get_current_user(Authorization: str = Header(...)):
    token = Authorization.replace("Bearer ", "")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

def require_role(required_roles: list):
    async def role_checker(user=Depends(get_current_user)):
        if user["role"] not in required_roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user
    return role_checker
