from fastapi import status

API_URL = "/api/v1/patients"


def test_patients_list_returns_200(logged_client):
    response = logged_client.get(f"{API_URL}/")
    assert response.status_code == status.HTTP_200_OK


def test_patients_list_filters(logged_client, patients, expected_patient_filter_data):
    response = logged_client.get(f"{API_URL}/?email=a&first_name=a")
    assert len(response.json()) == 1
    assert response.json() == expected_patient_filter_data


def test_patients_list_returns_valid_data(
    logged_client, patients, expected_patient_data
):
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 3
    assert response.json() == expected_patient_data


def test_patients_list_is_protected(client):
    response = client.get(f"{API_URL}/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_patient_is_protected(client):
    response = client.get(f"{API_URL}/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_patient_returns_200(logged_client, patients):
    response = logged_client.get(f"{API_URL}/1")
    assert response.status_code == status.HTTP_200_OK


def test_get_patient_returns_valid_data(
    logged_client, patients, expected_first_patient_data
):
    response = logged_client.get(f"{API_URL}/1")
    assert response.json() == expected_first_patient_data


def test_create_patient_is_protected(client):
    response = client.post(
        f"{API_URL}/",
        json={
            "first_name": "Bruce",
            "last_name": "Banner",
            "email": "brucer@bannerr.com",
        },
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_patient_returns_201(logged_client):
    response = logged_client.post(
        f"{API_URL}/",
        json={
            "first_name": "Bruce",
            "last_name": "Banner",
            "email": "brucer@bannerr.com",
        },
    )
    assert response.status_code == status.HTTP_201_CREATED


def test_create_patient_creates_patient(logged_client):
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 0
    logged_client.post(
        f"{API_URL}/",
        json={
            "first_name": "Bruce",
            "last_name": "Banner",
            "email": "brucer@bannerr.com",
        },
    )
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 1


def test_create_patient_returns_valid_data(
    logged_client, expected_created_patient_data
):
    response = logged_client.post(
        f"{API_URL}/",
        json={
            "first_name": "Bruce",
            "last_name": "Banner",
            "email": "brucer@bannerr.com",
        },
    )
    assert response.json() == expected_created_patient_data


def test_update_patient_is_protected(client, patients):
    response = client.patch(
        f"{API_URL}/1",
        json={
            "first_name": "Bruce",
        },
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_update_patient_returns_200(logged_client, patients):
    response = logged_client.patch(
        f"{API_URL}/1",
        json={
            "first_name": "Bruce",
        },
    )
    assert response.status_code == status.HTTP_200_OK


def test_update_patient_updates_patient(
    logged_client, patients, expected_updated_patient_data
):
    logged_client.patch(
        f"{API_URL}/1",
        json={
            "first_name": "Bruce",
        },
    )
    response = logged_client.get(f"{API_URL}/1")
    assert response.json() == expected_updated_patient_data


def test_delete_patient_is_protected(client, patients):
    response = client.delete(f"{API_URL}/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_delete_patient_returns_200(logged_client, patients):
    response = logged_client.delete(f"{API_URL}/1")
    assert response.status_code == status.HTTP_200_OK


def test_delete_patient_deletes_patient(logged_client, patients):
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 3
    logged_client.delete(f"{API_URL}/1")
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 2


def test_delete_patient_returns_valid_data(logged_client, patients):
    response = logged_client.delete(f"{API_URL}/1")
    assert response.json() == {"status": "successfully deleted."}


def test_delete_patient_returns_404_when_patient_dont_exist(logged_client, patients):
    response = logged_client.delete(f"{API_URL}/6")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Patient not found."}


def test_get_patient_returns_404_when_patient_dont_exist(logged_client, patients):
    response = logged_client.get(f"{API_URL}/6")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Patient not found."}


def test_patch_patient_returns_404_when_patient_dont_exist(logged_client, patients):
    response = logged_client.patch(
        f"{API_URL}/6",
        json={
            "first_name": "Bruce",
        },
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Patient not found."}
