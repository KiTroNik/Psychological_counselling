import json

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy_utils import create_database, database_exists  # type: ignore

from app.api.deps import get_db
from app.db.database import Base
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"


@pytest.fixture(scope="session")
def db_engine():
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    if not database_exists:
        create_database(engine.url)

    Base.metadata.create_all(bind=engine)
    yield engine


@pytest.fixture(scope="function")
def db(db_engine):
    connection = db_engine.connect()
    connection.begin()
    db = Session(bind=connection)
    app.dependency_overrides[get_db] = lambda: db

    yield db
    db.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db):
    app.dependency_overrides[get_db] = lambda: db

    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="function")
def logged_client(db, user):
    app.dependency_overrides[get_db] = lambda: db

    with TestClient(app) as c:
        response = c.post(
            "api/v1/auth/token", data={"username": "jan@nowak.pl", "password": "foobar"}
        )
        response_content = json.loads(response.content.decode("utf-8"))
        token = response_content["access_token"]
        c.headers = {"Authorization": f"Bearer {token}"}
        yield c
