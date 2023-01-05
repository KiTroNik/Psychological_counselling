from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_patient
from app.models.user import User
from app.schemas import patient as schemas

router = APIRouter()


@router.get(
    "/",
    response_model=list[schemas.PatientList],
)
def patients_list(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    email: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
):
    """
    Get list of all user patients.
    """

    return crud_patient.get_all_user_patients(
        db, email=email, first_name=first_name, last_name=last_name, user=current_user
    )


@router.get(
    "/{patient_id}",
    response_model=schemas.Patient,
)
def read_patient(
    patient_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Get user patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found."
        )
    if db_patient.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient doesn't belong to currently logged in user.",
        )
    return db_patient


@router.post(
    "/",
    response_model=schemas.PatientList,
    status_code=status.HTTP_201_CREATED,
)
def create_patient(
    patient: schemas.PatientBase,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Create Patient.
    """

    return crud_patient.create_patient(db, patient, current_user.id)


@router.patch(
    "/{patient_id}",
    response_model=schemas.PatientList,
)
def update_patient(
    patient_id: int,
    updated_patient: schemas.PatientUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Update user patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found."
        )
    if db_patient.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient doesn't belong to currently logged in user.",
        )
    return crud_patient.update_patient(
        db, patient_updated=updated_patient, patient=db_patient
    )


@router.delete("/{patient_id}")
def delete_patient(
    patient_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Delete user patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found."
        )
    if db_patient.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient doesn't belong to currently logged in user.",
        )
    crud_patient.delete_patient(db, db_patient)
    return {"status": "successfully deleted."}
