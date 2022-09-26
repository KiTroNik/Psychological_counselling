from sqladmin import ModelView  # type: ignore

from app.models.patient import Patient


class PatientAdmin(ModelView, model=Patient):  # type: ignore
    column_list = [Patient.id, Patient.first_name, Patient.last_name]
