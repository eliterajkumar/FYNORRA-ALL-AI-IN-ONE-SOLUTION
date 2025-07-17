# ...main.py...
# app/main.py
from fastapi import FastAPI
from app.api.v1 import cms_routes, auth_routes, service_routes
from app.db.database import connect_db

app = FastAPI(title="Fynorra CMS Backend")

@app.on_event("startup")
async def startup():
    await connect_db()

# Route includes
app.include_router(auth_routes.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(cms_routes.router, prefix="/api/v1/cms", tags=["CMS"])
app.include_router(service_routes.router, prefix="/api/v1/services", tags=["Services"])
# In app/main.py
app.include_router(cms_routes.router, prefix="/api/v1/cms", tags=["CMS"])

