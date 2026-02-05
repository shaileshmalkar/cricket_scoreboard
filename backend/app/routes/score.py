
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class BallScore(BaseModel):
    match_id: int
    runs: int
    is_wicket: bool = False
    is_wide: bool = False
    is_no_ball: bool = False
    striker: str
    bowler: str

@router.post("/ball")
def score_ball(ball: BallScore):
    """
    Record a ball in the match
    """
    try:
        # Here you would save to database
        # For now, just return success
        return {
            "message": "Ball recorded successfully",
            "ball": {
                "match_id": ball.match_id,
                "runs": ball.runs,
                "is_wicket": ball.is_wicket,
                "is_wide": ball.is_wide,
                "is_no_ball": ball.is_no_ball,
                "striker": ball.striker,
                "bowler": ball.bowler
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to record ball: {str(e)}"
        )
