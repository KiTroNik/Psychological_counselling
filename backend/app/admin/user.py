from sqladmin import ModelView  # type: ignore

from app.models.user import User


class UserAdmin(ModelView, model=User):  # type: ignore
    column_list = [User.id, User.email, User.is_admin]
