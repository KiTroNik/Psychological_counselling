from __future__ import annotations

from datetime import datetime, timedelta

from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import verify_password
from app.crud import crud_user
from app.models.user import User
from app.schemas.token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/token")


def authenticate(*, email: str, password: str, db: Session) -> User | None:
    user = crud_user.get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_user_from_jwt(*, db: Session, token: str) -> User:
    token_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate token.",
    )

    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: id = int(payload.get("sub"))  # type: ignore
        if not user_id:
            raise token_exception
        token_data = TokenData(id=user_id)
    except JWTError as exc:
        raise token_exception from exc

    user = crud_user.get_user_by_id(db=db, user_id=token_data.id)
    if not user:
        raise token_exception
    return user


def create_access_token(*, sub: str) -> str:
    return _create_token(
        token_type="access_token",
        lifetime=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        sub=sub,
    )


def create_refresh_token(*, sub: str) -> str:
    return _create_token(
        token_type="refresh_token",
        lifetime=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        sub=sub,
    )


def _create_token(token_type: str, lifetime: timedelta, sub: str) -> str:
    payload: dict[str, str | datetime] = {}
    expire = datetime.utcnow() + lifetime
    payload["type"] = token_type
    payload["exp"] = expire
    payload["iat"] = datetime.utcnow()
    payload["sub"] = sub

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
