from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin  # type: ignore

from app.admin.appointment import AppointmentAdmin
from app.admin.patient import PatientAdmin
from app.admin.user import UserAdmin
from app.api.api_v1.api import api_router
from app.core.config import settings
from app.db.database import engine

app = FastAPI(
    title="Psychological Counselling", openapi_url=f"{settings.API_V1_STR}/openapi.json"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.API_V1_STR)


admin = Admin(app, engine)
admin.add_view(UserAdmin)
admin.add_view(PatientAdmin)
admin.add_view(AppointmentAdmin)
