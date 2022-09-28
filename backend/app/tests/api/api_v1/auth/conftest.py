import pytest


@pytest.fixture
def expected_user_fields() -> list:
    return ["first_name", "last_name", "email", "is_admin", "id"]


@pytest.fixture
def expected_token_fields() -> list:
    return ["access_token", "token_type"]


@pytest.fixture
def expected_user_data() -> dict:
    return {
        "first_name": "Jan",
        "last_name": "Nowak",
        "email": "jan@nowak.pl",
        "is_admin": False,
        "id": 1,
    }
