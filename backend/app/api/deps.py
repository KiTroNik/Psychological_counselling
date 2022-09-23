from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_user_from_jwt, oauth2_scheme
from app.db.database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    return get_user_from_jwt(db=db, token=token)
