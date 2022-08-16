from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..config import settings

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.DB_USER}:{settings.DB_PASS}\
                            @{settings.DB_HOST}/{settings.DB_NAME}"

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=create_engine(SQLALCHEMY_DATABASE_URL)
)

Base = declarative_base()
