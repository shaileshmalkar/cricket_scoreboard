from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import match, score

app = FastAPI(title="Cricket Scoreboard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match.router, prefix="/match")
app.include_router(score.router, prefix="/score")
