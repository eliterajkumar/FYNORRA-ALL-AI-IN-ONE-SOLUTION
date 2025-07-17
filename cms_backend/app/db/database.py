# ...database.py...
# app/db/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from os import getenv
from dotenv import load_dotenv

load_dotenv()

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(getenv("MONGODB_URI"))
    db = client["fynorra_cms"]
