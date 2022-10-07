from __future__ import annotations

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class UserUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    password: str | None


class UserCreate(UserBase):
    password: str


class User(UserBase):
    is_admin: bool
    id: int

    class Config:
        orm_mode = True
