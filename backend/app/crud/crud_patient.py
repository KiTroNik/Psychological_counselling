from __future__ import annotations

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import patient as models
from app.models.user import User
from app.schemas import patient as schemas


def get_patient_by_id(db: Session, patient_id: int) -> models.Patient | None:
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()


def get_all_user_patients(
    db: Session,
    *,
    user: User,
    email: str | None,
    first_name: str | None,
    last_name: str | None,
):
    return (
        db.query(models.Patient)
        .filter(
            *_create_filter_list(
                email, first_name, last_name
            ),
            models.Patient.user_id == user.id,
        )
        .all()
    )


def create_patient(db: Session, patient: schemas.PatientBase, user_id: int):
    create_data = patient.dict()
    db_obj = models.Patient(**create_data, user_id=user_id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_patient(
    db: Session, *, patient_updated: schemas.PatientUpdate, patient: models.Patient
):
    update_data = patient_updated.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(patient, key, value)

    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def delete_patient(db: Session, patient: models.Patient):
    db.delete(patient)
    db.commit()


def _create_filter_list(
    email: str | None, first_name: str | None, last_name: str | None
):
    all_filters: list = []

    if email:
        all_filters.append(func.lower(models.Patient.email).startswith(email.lower()))

    if first_name:
        all_filters.append(
            func.lower(models.Patient.first_name).startswith(first_name.lower())
        )

    if last_name:
        all_filters.append(
            func.lower(models.Patient.last_name).startswith(last_name.lower())
        )

    return all_filters
