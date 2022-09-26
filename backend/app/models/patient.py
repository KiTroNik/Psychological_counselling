from sqlalchemy import Column, Integer, String

from app.db.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    def __repr__(self):
        return f"Patient(id={self.id!r}, email={self.email!r}"
