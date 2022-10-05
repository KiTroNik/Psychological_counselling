from __future__ import annotations

import datetime

from pydantic import BaseModel

from app.schemas.patient import Patient


class AppointmentCreate(BaseModel):
    date: datetime.datetime
    patient_id: int


class AppointmentBase(BaseModel):
    date: datetime.datetime
    is_cancelled: bool
    is_completed: bool
    notes: str | None


class Appointment(AppointmentBase):
    id: int
    patient: Patient

    class Config:
        orm_mode = True


class AppointmentUpdate(BaseModel):
    date: datetime.datetime | None
    is_cancelled: bool | None
    is_completed: bool | None
    notes: str | None
