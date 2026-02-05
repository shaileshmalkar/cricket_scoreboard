
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get database URL from environment variable or use default
# Using PostgreSQL - database is running on localhost:5432
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/cricket_db"
)

# Note: Update the password above if you set a different password during PostgreSQL installation
# Format: postgresql://username:password@localhost:5432/database_name

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
