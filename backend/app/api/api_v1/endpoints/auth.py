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
from app.crud import crud_user
from app.models import user as models
from app.schemas import user as schemas
from app.schemas.token import Token

router = APIRouter()


@router.post(
    "/register", response_model=schemas.User, status_code=status.HTTP_201_CREATED
)
def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(deps.get_db),
):
    """
    Create User.
    """

    return crud_user.create_user(db, user)


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
        key="refresh_token",
        value=create_refresh_token(sub=str(user.id)),
        httponly=True,
        samesite="none",
        secure=True,
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


@router.get(
    "/logout",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(deps.get_current_user)],
)
def logout(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
):
    """
    Remove JWT from cookie.
    """

    if refresh_token:
        response.delete_cookie("refresh_token", samesite="none", secure=True)
    return {"status": "success"}


@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(deps.get_current_user)):
    """
    Fetch the current logged-in user.
    """

    return current_user


@router.patch("/me", response_model=schemas.User)
def update_users_me(
    updated_user: schemas.UserUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """
    Update the current logged-in user.
    """

    return crud_user.update_user(db, updated_user, current_user.id)
