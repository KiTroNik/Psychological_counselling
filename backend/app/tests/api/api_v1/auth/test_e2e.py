from fastapi import status

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
