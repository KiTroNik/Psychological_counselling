from sqlalchemy.orm import Session

from app.models import patient as models
from app.schemas import patient as schemas


def get_patient_by_id(db: Session, patient_id: int) -> models.Patient:
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()


def get_all_patients(db: Session):
    return db.query(models.Patient).all()


def create_patient(db: Session, patient: schemas.PatientBase):
    create_data = patient.dict()
    db_obj = models.Patient(**create_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_patient(
    db: Session,
    *,
    patient_updated: schemas.PatientUpdate,
    patient: models.Patient
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
