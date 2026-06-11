from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column
from api.db.database import Base
class Opportunity(Base):
    __tablename__ = 'opportunities'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey('leads.id'))
    service: Mapped[str] = mapped_column(String(255))
    value_estimate: Mapped[int] = mapped_column(Integer)
    urgency: Mapped[str] = mapped_column(String(50))
    probability: Mapped[float] = mapped_column(Float)
    reasoning: Mapped[str] = mapped_column(String(2000))
    created_at: Mapped[str] = mapped_column(DateTime, server_default=func.now())
