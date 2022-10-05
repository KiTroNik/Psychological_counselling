from fastapi import APIRouter

from app.api.api_v1.endpoints import appointments, auth, patients

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(patients.router, prefix="/patients", tags=["patients"])
api_router.include_router(
    appointments.router, prefix="/appointments", tags=["appointments"]
)
