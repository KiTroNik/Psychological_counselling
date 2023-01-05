import datetime

import pytest

from app.crud import crud_appointment, crud_patient, crud_user
from app.schemas.appointment import AppointmentCreate
from app.schemas.patient import PatientBase
from app.schemas.user import UserCreate


@pytest.fixture
def appointments(db):
    crud_patient.create_patient(
        db,
        PatientBase(first_name="Albert", last_name="Fish", email="albert@fish.com"),
        user_id=1
    )
    crud_user.create_user(
        db,
        UserCreate(
            first_name="Jan",
            last_name="Kowalski",
            email="jan@kowalski.pl",
            password="foobar",
        ),
    )

    crud_appointment.create_appointment(
        db,
        AppointmentCreate(date=datetime.datetime(2022, 5, 15), patient_id=1),
        user_id=1,
    )
    crud_appointment.create_appointment(
        db,
        AppointmentCreate(date=datetime.datetime(2022, 5, 12), patient_id=1),
        user_id=1,
    )
    crud_appointment.create_appointment(
        db,
        AppointmentCreate(date=datetime.datetime(2022, 5, 16), patient_id=1),
        user_id=2,
    )


@pytest.fixture
def expected_appointments_data() -> list:
    return [
        {
            "date": "2022-05-15T00:00:00",
            "is_cancelled": False,
            "is_completed": False,
            "notes": None,
            "id": 1,
            "patient": {
                "first_name": "Albert",
                "last_name": "Fish",
                "email": "albert@fish.com",
                "id": 1,
            },
        },
        {
            "date": "2022-05-12T00:00:00",
            "is_cancelled": False,
            "is_completed": False,
            "notes": None,
            "id": 2,
            "patient": {
                "first_name": "Albert",
                "last_name": "Fish",
                "email": "albert@fish.com",
                "id": 1,
            },
        },
    ]


@pytest.fixture
def expected_first_appointment_data() -> dict:
    return {
        "date": "2022-05-15T00:00:00",
        "is_cancelled": False,
        "is_completed": False,
        "notes": None,
        "id": 1,
        "patient": {
            "first_name": "Albert",
            "last_name": "Fish",
            "email": "albert@fish.com",
            "id": 1,
        },
    }


@pytest.fixture
def expected_created_appointment_data() -> dict:
    return {
        "date": "2137-05-15T00:00:00",
        "is_cancelled": False,
        "is_completed": False,
        "notes": None,
        "id": 4,
        "patient": {
            "first_name": "Albert",
            "last_name": "Fish",
            "email": "albert@fish.com",
            "id": 1,
        },
    }


@pytest.fixture
def expected_updated_appointment_data() -> dict:
    return {
        "date": "2022-05-15T00:00:00",
        "is_cancelled": False,
        "is_completed": False,
        "notes": "some note",
        "id": 1,
        "patient": {
            "first_name": "Albert",
            "last_name": "Fish",
            "email": "albert@fish.com",
            "id": 1,
        },
    }
