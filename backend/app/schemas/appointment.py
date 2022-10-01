from __future__ import annotations

import datetime

from pydantic import BaseModel


class AppointmentCreate(BaseModel):
    date: datetime.datetime
    patient_id: int
    user_id: int


class AppointmentBase(AppointmentCreate):
    is_cancelled: bool
    is_completed: bool
    notes: str


class Appointment(AppointmentBase):
    id: int

    class Config:
        orm_mode = True


class AppointmentUpdate(BaseModel):
    date: datetime.datetime | None
    is_cancelled: bool | None
    is_completed: bool | None
    notes: str | None
