from fastapi import FastAPI

from app.api.api_v1.api import api_router
from app.core.config import settings

from sqladmin import Admin
from app.db.database import engine
from app.admin.user import UserAdmin

app = FastAPI(
    title="Psychological Counselling", openapi_url=f"{settings.API_V1_STR}/openapi.json"
)
app.include_router(api_router, prefix=settings.API_V1_STR)


admin = Admin(app, engine)
admin.add_view(UserAdmin)


@app.get("/healthcheck")
async def healthcheck():
    return {"status": "alive"}
