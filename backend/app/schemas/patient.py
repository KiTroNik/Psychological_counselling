from __future__ import annotations

from pydantic import BaseModel, EmailStr


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True


class PatientUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr | None
