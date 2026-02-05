"""
Initialize database tables
Run this script to create all database tables
"""
from app.database import engine, Base
from app.models import Match

def init_db():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("[OK] Database tables created successfully!")
    print("You can now use the application!")

if __name__ == "__main__":
    init_db()
