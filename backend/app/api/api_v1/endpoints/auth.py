from __future__ import annotations

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core.auth import (
    authenticate,
    create_access_token,
    create_refresh_token,
    get_user_from_jwt,
)
from app.models.user import User
from app.schemas.token import Token

router = APIRouter()


@router.post("/token", response_model=Token)
def login_for_token(
    response: Response,
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """
    Get the JWT for a user with data from OAuth2 request form body.
    """

    user = authenticate(email=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    response.set_cookie(
        key="refresh_token", value=create_refresh_token(sub=str(user.id)), httponly=True
    )
    return {
        "access_token": create_access_token(sub=str(user.id)),
        "token_type": "bearer",
    }


@router.get("/refresh", response_model=Token)
def refresh_access_token(
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(deps.get_db),
):
    """
    Refresh JWT from Httponly refresh token.
    """

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing refresh token"
        )

    user = get_user_from_jwt(token=refresh_token, db=db)
    return {
        "access_token": create_access_token(sub=str(user.id)),
        "token_type": "bearer",
    }


@router.get("/logout", status_code=status.HTTP_200_OK)
def logout(
    response: Response,
    user: User = Depends(deps.get_current_user),  # pylint: disable=W0613
    refresh_token: str | None = Cookie(default=None),
):
    """
    Remove JWT from cookie.
    """

    if refresh_token:
        response.delete_cookie("refresh_token")
    return {"status": "success"}
