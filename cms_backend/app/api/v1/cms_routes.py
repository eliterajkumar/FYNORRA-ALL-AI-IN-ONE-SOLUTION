# app/api/v1/cms_routes.py

from fastapi import APIRouter, HTTPException, Depends, Path, Query
from typing import List
from datetime import datetime
from bson import ObjectId

from app.schemas.client_schema import ClientCreateSchema, ClientResponseSchema
from app.db.database import db
from app.core.security import require_role

router = APIRouter()


# ✅ Helper to safely convert to ObjectId
def oid(id: str):
    try:
        return ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Client ID")


# ✅ CREATE CLIENT
@router.post("/create", response_model=dict, dependencies=[Depends(require_role(["cms_user", "admin"]))])
async def create_client(payload: ClientCreateSchema):
    client_data = payload.dict()
    client_data["created_at"] = datetime.utcnow()
    result = await db["clients"].insert_one(client_data)
    return {"msg": "Client created", "id": str(result.inserted_id)}


# ✅ GET ALL CLIENTS
@router.get("/list", response_model=List[ClientResponseSchema], dependencies=[Depends(require_role(["cms_user", "admin", "superadmin"]))])
async def get_all_clients():
    raw_clients = await db["clients"].find().to_list(100)
    formatted = []
    for client in raw_clients:
        client["id"] = str(client["_id"])
        formatted.append(ClientResponseSchema(**client))
    return formatted


# ✅ GET CLIENT BY ID
@router.get("/client/{client_id}", response_model=ClientResponseSchema, dependencies=[Depends(require_role(["cms_user", "admin"]))])
async def get_client_by_id(client_id: str):
    client = await db["clients"].find_one({"_id": oid(client_id)})
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    client["id"] = str(client["_id"])
    return ClientResponseSchema(**client)


# ✅ SEARCH CLIENTS
@router.get("/search", response_model=List[ClientResponseSchema], dependencies=[Depends(require_role(["cms_user", "admin"]))])
async def search_clients(
    keyword: str = Query(..., description="Search by name, GST, email, or phone")
):
    query = {
        "$or": [
            {"company_name": {"$regex": keyword, "$options": "i"}},
            {"gst_number": {"$regex": keyword, "$options": "i"}},
            {"email": {"$regex": keyword, "$options": "i"}},
            {"phone": {"$regex": keyword, "$options": "i"}}
        ]
    }

    raw_clients = await db["clients"].find(query).to_list(100)
    formatted = []
    for client in raw_clients:
        client["id"] = str(client["_id"])
        formatted.append(ClientResponseSchema(**client))
    return formatted


# ✅ UPDATE CLIENT
@router.put("/update/{client_id}", dependencies=[Depends(require_role(["admin", "cms_user"]))])
async def update_client(client_id: str, payload: ClientCreateSchema):
    update_data = payload.dict()
    result = await db["clients"].update_one({"_id": oid(client_id)}, {"$set": update_data})
    if result.modified_count == 1:
        return {"msg": "Client updated successfully"}
    raise HTTPException(status_code=404, detail="Client not found")


# ✅ DELETE CLIENT
@router.delete("/delete/{client_id}", dependencies=[Depends(require_role(["admin", "superadmin"]))])
async def delete_client(client_id: str):
    result = await db["clients"].delete_one({"_id": oid(client_id)})
    if result.deleted_count == 1:
        return {"msg": "Client deleted successfully"}
    raise HTTPException(status_code=404, detail="Client not found")
