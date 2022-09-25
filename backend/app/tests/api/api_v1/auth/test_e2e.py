from fastapi import status

from app.core.security import verify_password
from app.models import user as models

API_URL = "/api/v1/auth"


def test_login_with_valid_credentials(user, client, expected_token_fields):
    response = client.post(
        f"{API_URL}/token", data={"username": "jan@nowak.pl", "password": "foobar"}
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.cookies.get("refresh_token") is not None
    assert list(response.json().keys()) == expected_token_fields


def test_login_with_invalid_credentials(user, client):
    response = client.post(
        f"{API_URL}/token", data={"username": "jan@nowak.pl", "password": "barfoo"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.cookies.get("refresh_token") is None


def test_refresh_token_with_valid_token(user, client, expected_token_fields):
    response_login = client.post(
        f"{API_URL}/token", data={"username": "jan@nowak.pl", "password": "foobar"}
    )
    response_refresh = client.get(
        f"{API_URL}/refresh",
        cookies={"refresh_token": response_login.cookies.get("refresh_token")},
    )
    assert response_refresh.status_code == status.HTTP_200_OK
    assert list(response_refresh.json().keys()) == expected_token_fields


def test_refresh_token_with_invalid_token(user, client):
    response_login = client.post(
        f"{API_URL}/token", data={"username": "jan@nowak.pl", "password": "foobar"}
    )
    assert response_login.status_code == status.HTTP_200_OK

    response_refresh = client.get(
        f"{API_URL}/refresh", cookies={"refresh_token": "wrong_refresh_token"}
    )
    assert response_refresh.status_code == status.HTTP_401_UNAUTHORIZED


def test_logout(logged_client):
    assert logged_client.cookies.get("refresh_token") is not None
    response = logged_client.get(f"{API_URL}/logout")
    assert response.status_code == status.HTTP_200_OK
    assert logged_client.cookies.get("refresh_token") is None


def test_logout_is_protected(client):
    assert client.cookies.get("refresh_token") is None
    response = client.get(f"{API_URL}/logout")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_users_me(logged_client, expected_user_fields, expected_user_data):
    response = logged_client.get(f"{API_URL}/me")
    assert response.status_code == status.HTTP_200_OK
    assert list(response.json().keys()) == expected_user_fields
    assert response.json() == expected_user_data


def test_get_users_me_is_protected(client):
    response = client.get(f"{API_URL}/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_patch_me(logged_client, expected_user_fields):
    response = logged_client.patch(f"{API_URL}/me", json={"first_name": "test"})
    assert response.status_code == status.HTTP_200_OK
    assert list(response.json().keys()) == expected_user_fields
    assert response.json()["first_name"] == "test"


def test_patch_me_password(logged_client, db):
    response = logged_client.patch(f"{API_URL}/me", json={"password": "test"})
    assert response.status_code == status.HTTP_200_OK
    db_user: models.User = (
        db.query(models.User).filter(models.User.id == 1).first()  # type: ignore
    )
    assert verify_password("test", db_user.hashed_password)
