from __future__ import annotations

import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_appointment
from app.models import appointment as models
from app.models.user import User
from app.schemas import appointment as schemas

router = APIRouter()


@router.get("/", response_model=list[schemas.Appointment])
def my_appointments_list(  # pylint: disable=R0913
    date: datetime.date | None = None,
    is_cancelled: bool | None = None,
    is_completed: bool | None = None,
    patient_first_name: str | None = None,
    patient_last_name: str | None = None,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
):
    """
    Get list of users appointments.
    """

    return crud_appointment.get_all_user_appointments(
        db=db,
        user=current_user,
        date=date,
        is_cancelled=is_cancelled,
        is_completed=is_completed,
        patient_first_name=patient_first_name,
        patient_last_name=patient_last_name,
    )


@router.get("/{appointment_id}", response_model=schemas.Appointment)
def read_my_appointment(
    appointment_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Get user appointment specified by appointment_id.
    """

    db_appointment: models.Appointment = crud_appointment.get_appointment_by_id(
        db, appointment_id
    )
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found."
        )
    if db_appointment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Appointment doesn't belong to currently logged in user.",
        )
    return db_appointment


@router.post(
    "/", response_model=schemas.Appointment, status_code=status.HTTP_201_CREATED
)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Create appointment.
    """

    return crud_appointment.create_appointment(db, appointment, current_user.id)


@router.patch("/{appointment_id}", response_model=schemas.Appointment)
def update_user_appointment(
    appointment_id: int,
    updated_appointment: schemas.AppointmentUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Update user appointment specified by appointment_id.
    """

    db_appointment: models.Appointment = crud_appointment.get_appointment_by_id(
        db, appointment_id
    )
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found."
        )
    if db_appointment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Appointment doesn't belong to currently logged in user.",
        )
    return crud_appointment.update_appointment(
        db, appointment_updated=updated_appointment, appointment=db_appointment
    )


@router.delete("/{appointment_id}")
def delete_my_appointment(
    appointment_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Delete user appointment specified by appointment_id.
    """

    db_appointment: models.Appointment = crud_appointment.get_appointment_by_id(
        db, appointment_id
    )
    if db_appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found."
        )
    if db_appointment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Appointment doesn't belong to currently logged in user.",
        )
    crud_appointment.delete_appointment(db, db_appointment)
    return {"status": "successfully deleted."}
