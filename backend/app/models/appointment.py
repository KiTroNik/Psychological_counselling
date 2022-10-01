from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    is_cancelled = Column(Boolean, default=False)
    is_completed = Column(Boolean, default=False)
    notes = Column(String, nullable=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    patient = relationship("Patient", back_populates="appointments")  # type: ignore

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="appointments")  # type: ignore

    def __repr__(self):
        return (f"Appointment(id={self.id!r}), date={self.date!r},"
                f" patient_id={self.patient_id!r}, user_id={self.user_id!r}")
