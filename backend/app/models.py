
from sqlalchemy import Column, Integer, String
from .database import Base

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True)
    team_a = Column(String)
    team_b = Column(String)
    overs = Column(Integer)
    status = Column(String, default="LIVE")
