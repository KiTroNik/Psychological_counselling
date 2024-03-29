from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base
from app.models.appointment import Appointment  # pylint: disable=W0611 # noqa: F401


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    appointments = relationship(
        "Appointment", back_populates="patient", cascade="save-update, merge, delete"
    )

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="patients")  # type: ignore

    def __repr__(self):
        return f"Patient(id={self.id!r}, email={self.email!r})"
