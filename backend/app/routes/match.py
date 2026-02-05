from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Match

router = APIRouter()

class MatchCreate(BaseModel):
    team_a: str
    team_b: str
    overs: int

class MatchResponse(BaseModel):
    id: int
    team_a: str
    team_b: str
    overs: int
    status: str

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=MatchResponse)
def create_match(match: MatchCreate, db: Session = Depends(get_db)):
    try:
        # Create new match in database
        db_match = Match(
            team_a=match.team_a,
            team_b=match.team_b,
            overs=match.overs,
            status="LIVE"
        )
        db.add(db_match)
        db.commit()
        db.refresh(db_match)
        
        return db_match
    except Exception as e:
        db.rollback()
        from fastapi import HTTPException
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create match: {str(e)}"
        )

@router.get("/{match_id}", response_model=MatchResponse)
def get_match(match_id: int, db: Session = Depends(get_db)):
    """Get match details by ID"""
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Match not found")
    return match

@router.get("/", response_model=list[MatchResponse])
def list_matches(db: Session = Depends(get_db)):
    """Get all matches"""
    matches = db.query(Match).all()
    return matches
