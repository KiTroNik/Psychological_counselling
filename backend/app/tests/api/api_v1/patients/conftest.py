import pytest

from app.crud import crud_patient
from app.schemas.patient import PatientBase


@pytest.fixture
def patients(db):
    crud_patient.create_patient(
        db,
        PatientBase(
            first_name="Albert", last_name="Einstein", email="albert@einstein.com"
        ),
        user_id=1,
    )
    crud_patient.create_patient(
        db,
        PatientBase(first_name="Nicola", last_name="Tesla", email="nicola@tesla.com"),
        user_id=1,
    )
    crud_patient.create_patient(
        db,
        PatientBase(first_name="Sigmund", last_name="Freud", email="sigmund@freud.com"),
        user_id=1,
    )


@pytest.fixture
def expected_patient_filter_data() -> list:
    return [
        {
            "first_name": "Albert",
            "last_name": "Einstein",
            "email": "albert@einstein.com",
            "id": 1,
        }
    ]


@pytest.fixture
def expected_first_patient_data() -> dict:
    return {
        "first_name": "Albert",
        "last_name": "Einstein",
        "email": "albert@einstein.com",
        "appointments": [],
        "id": 1,
    }


@pytest.fixture
def expected_created_patient_data() -> dict:
    return {
        "first_name": "Bruce",
        "last_name": "Banner",
        "email": "brucer@bannerr.com",
        "id": 1,
    }


@pytest.fixture
def expected_updated_patient_data() -> dict:
    return {
        "first_name": "Bruce",
        "last_name": "Einstein",
        "email": "albert@einstein.com",
        "appointments": [],
        "id": 1,
    }


@pytest.fixture
def expected_patient_data() -> list:
    return [
        {
            "first_name": "Albert",
            "last_name": "Einstein",
            "email": "albert@einstein.com",
            "id": 1,
        },
        {
            "first_name": "Nicola",
            "last_name": "Tesla",
            "email": "nicola@tesla.com",
            "id": 2,
        },
        {
            "first_name": "Sigmund",
            "last_name": "Freud",
            "email": "sigmund@freud.com",
            "id": 3,
        },
    ]
