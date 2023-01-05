from __future__ import annotations

import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import appointment as models
from app.models.patient import Patient
from app.models.user import User
from app.schemas import appointment as schemas


def get_all_user_appointments(
    *,
    db: Session,
    user: User,
    date: datetime.date | None,
    name: str | None,
    is_cancelled: bool | None,
    is_completed: bool | None,
    patient_first_name: str | None,
    patient_last_name: str | None,
):
    return (
        db.query(models.Appointment)
        .join(Patient)
        .filter(
            *_create_filter_list(
                date, name, is_cancelled, is_completed, patient_first_name, patient_last_name
            ),
            models.Appointment.user_id == user.id,
        )
        .all()
    )


def get_appointment_by_id(db: Session, appointment_id: int):
    return (
        db.query(models.Appointment)
        .filter(models.Appointment.id == appointment_id)
        .first()
    )


def create_appointment(
    db: Session, appointment: schemas.AppointmentCreate, user_id: int
):
    create_data = appointment.dict()
    db_obj = models.Appointment(**create_data, user_id=user_id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_appointment(
    db: Session,
    *,
    appointment_updated: schemas.AppointmentUpdate,
    appointment: models.Appointment,
):
    update_data = appointment_updated.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appointment, key, value)

    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


def delete_appointment(db: Session, appointment: models.Appointment):
    db.delete(appointment)
    db.commit()


def _create_filter_list(
    date: datetime.date | None,
    name: str | None,
    is_cancelled: bool | None,
    is_completed: bool | None,
    patient_first_name: str | None,
    patient_last_name: str | None,
):
    all_filters: list = []

    if date:
        all_filters.append(func.DATE(models.Appointment.date) == date)

    if name:
        all_filters.append(models.Appointment.name == name)

    if is_cancelled:
        all_filters.append(models.Appointment.is_cancelled == is_cancelled)

    if is_completed:
        all_filters.append(models.Appointment.is_completed == is_completed)

    if patient_first_name:
        all_filters.append(
            func.lower(Patient.first_name).startswith(patient_first_name.lower())
        )

    if patient_last_name:
        all_filters.append(
            func.lower(Patient.last_name).startswith(patient_last_name.lower())
        )

    return all_filters
