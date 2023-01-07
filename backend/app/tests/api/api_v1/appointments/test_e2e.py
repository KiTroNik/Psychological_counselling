from fastapi import status

API_URL = "/api/v1/appointments"


def test_appointments_list_returns_200(logged_client):
    response = logged_client.get(f"{API_URL}/")
    assert response.status_code == status.HTTP_200_OK


def test_appointments_list_returns_valid_data(
    logged_client, appointments, expected_appointments_data
):
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == 2
    assert response.json() == expected_appointments_data


def test_appointments_list_is_protected(client):
    response = client.get(f"{API_URL}/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_appointment_returns_200(logged_client, appointments):
    response = logged_client.get(f"{API_URL}/1")
    assert response.status_code == status.HTTP_200_OK


def test_get_appointment_restricts_to_users(logged_client, appointments):
    response = logged_client.get(f"{API_URL}/3")
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_get_appointment_returns_valid_data(
    logged_client, appointments, expected_first_appointment_data
):
    response = logged_client.get(f"{API_URL}/1")
    assert response.json() == expected_first_appointment_data


def test_get_appointment_is_protected(client):
    response = client.get(f"{API_URL}/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_appointment_is_protected(client):
    response = client.post(
        f"{API_URL}/",
        json={"date": "2137-05-15", "patient_id": 1, "name": "fourth"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_appointment_returns_201(logged_client, appointments):
    response = logged_client.post(
        f"{API_URL}/",
        json={"date": "2137-05-15", "patient_id": 1, "name": "first"},
    )
    assert response.status_code == status.HTTP_201_CREATED


def test_create_appointment_creates_appointment(logged_client, appointments):
    response = logged_client.get(f"{API_URL}/")
    num_of_appointments = len(response.json())
    logged_client.post(
        f"{API_URL}/",
        json={"date": "2137-05-15", "patient_id": 1, "name": "first"},
    )
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == num_of_appointments + 1


def test_create_appointment_returns_valid_data(
    logged_client, appointments, expected_created_appointment_data
):
    response = logged_client.post(
        f"{API_URL}/",
        json={"date": "2137-05-15", "patient_id": 1, "name": "fourth"},
    )
    assert response.json() == expected_created_appointment_data


def test_update_appointment_is_protected(client, appointments):
    response = client.patch(
        f"{API_URL}/1",
        json={"notes": "some note"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_update_appointment_restricts_to_users(logged_client, appointments):
    response = logged_client.patch(
        f"{API_URL}/3",
        json={"notes": "some note"},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_update_appointment_returns_200(logged_client, appointments):
    response = logged_client.patch(
        f"{API_URL}/1",
        json={"notes": "some note"},
    )
    assert response.status_code == status.HTTP_200_OK


def test_update_appointment_updates_appointment(
    logged_client, appointments, expected_updated_appointment_data
):
    response = logged_client.patch(
        f"{API_URL}/1",
        json={"notes": "some note"},
    )
    assert response.json() == expected_updated_appointment_data


def test_delete_appointment_is_protected(client, appointments):
    response = client.delete(f"{API_URL}/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_delete_appointment_restricts_to_users(logged_client, appointments):
    response = logged_client.delete(f"{API_URL}/3")
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_delete_appointment_returns_200(logged_client, appointments):
    response = logged_client.delete(f"{API_URL}/1")
    assert response.status_code == status.HTTP_200_OK


def test_delete_appointment_deletes_appointment(logged_client, appointments):
    response = logged_client.get(f"{API_URL}/")
    num_of_appointments = len(response.json())
    logged_client.delete(f"{API_URL}/1")
    response = logged_client.get(f"{API_URL}/")
    assert len(response.json()) == num_of_appointments - 1


def test_delete_appointment_returns_valid_data(logged_client, appointments):
    response = logged_client.delete(f"{API_URL}/1")
    assert response.json() == {"status": "successfully deleted."}


def test_delete_appointment_returns_404_when_not_existing(logged_client, appointments):
    response = logged_client.delete(f"{API_URL}/10")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Appointment not found."}


def test_get_appointment_returns_404_when_not_existing(logged_client, appointments):
    response = logged_client.get(f"{API_URL}/10")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Appointment not found."}


def test_patch_appointment_returns_404_when_not_existing(logged_client, appointments):
    response = logged_client.patch(
        f"{API_URL}/10",
        json={"notes": "some note"},
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Appointment not found."}
