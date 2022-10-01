from sqladmin import ModelView  # type: ignore

from app.models.appointment import Appointment


class AppointmentAdmin(ModelView, model=Appointment):  # type: ignore
    column_list = [
        Appointment.id,
        Appointment.date,
        Appointment.user_id,
        Appointment.patient_id,
    ]
    form_widget_args = dict(active={"class": "form-check-input"})
