from __future__ import annotations

import datetime

from pydantic import BaseModel, EmailStr


class AppointmentForPatient(BaseModel):
    id: int
    date: datetime.date
    is_cancelled: bool
    is_completed: bool

    class Config:
        orm_mode = True


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class Patient(PatientBase):
    id: int
    appointments: list[AppointmentForPatient]

    class Config:
        orm_mode = True


class PatientList(PatientBase):
    id: int

    class Config:
        orm_mode = True


class PatientUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr | None
