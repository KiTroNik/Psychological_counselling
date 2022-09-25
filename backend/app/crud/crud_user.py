from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.models import user as models
from app.schemas import user as schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    create_data = user.dict()
    create_data.pop("password")
    db_obj = models.User(**create_data)
    db_obj.hashed_password = get_password_hash(user.password)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return db_obj


def update_user(db: Session, user: schemas.UserUpdate, user_id: int):
    db_user: models.User = (
        db.query(models.User).filter(models.User.id == user_id).first()  # type: ignore
    )

    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        db_user.hashed_password = get_password_hash(update_data.pop("password"))

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
