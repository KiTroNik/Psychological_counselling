from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas import patient as schemas
from app.models.user import User
from app.api import deps
from app.crud import crud_patient

router = APIRouter()


# todo: sprawdzic jak dac dependecja tak po prostu i wyszukiwanie
@router.get("/", response_model=list[schemas.Patient])
def patients_list(
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_current_user)  # pylint: disable=W0613
):
    """
    Get list of all patients.
    """

    return crud_patient.get_all_patients(db)


@router.get("/{patient_id}", response_model=schemas.Patient)
def read_patient(
    patient_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_current_user)  # pylint: disable=W0613
):
    """
    Get patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found."
        )
    return db_patient


@router.post("/", response_model=schemas.Patient, status_code=status.HTTP_201_CREATED)
def create_patient(
    patient: schemas.PatientBase,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_current_user)  # pylint: disable=W0613
):
    """
    Create Patient.
    """

    return crud_patient.create_patient(db, patient)


@router.patch("/{patient_id}", response_model=schemas.Patient)
def update_patient(
    patient_id: int,
    updated_patient: schemas.PatientUpdate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_current_user)  # pylint: disable=W0613
):
    """
    Update patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found."
        )
    return crud_patient.update_patient(
        db,
        patient_updated=updated_patient,
        patient=db_patient
    )


@router.delete("/{patient_id}")
def delete_patient(
    patient_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_current_user)  # pylint: disable=W0613
):
    """
    Delete patient specified by patient_id.
    """

    db_patient = crud_patient.get_patient_by_id(db, patient_id)
    if db_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found."
        )
    crud_patient.delete_patient(db, db_patient)
    return {"status": "successfully deleted."}
