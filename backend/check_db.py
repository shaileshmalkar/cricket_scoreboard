"""
Check database connection and provide helpful error messages
"""
import sys
import os

def check_database_connection():
    """Check if database is accessible"""
    try:
        from app.database import engine
        from sqlalchemy import text
        
        print("[*] Checking database connection...")
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            result.fetchone()
        print("[OK] Database connection successful!")
        return True
    except Exception as e:
        print("[ERROR] Database connection failed!")
        print(f"\nError: {str(e)}")
        print("\n" + "="*60)
        print("SOLUTION: Start PostgreSQL Database")
        print("="*60)
        print("\nOption 1: Using Docker (Recommended)")
        print("  1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/")
        print("  2. Start Docker Desktop")
        print("  3. Run: docker compose up -d")
        print("\nOption 2: Using Local PostgreSQL")
        print("  1. Install PostgreSQL: https://www.postgresql.org/download/windows/")
        print("  2. Create database: cricket_db")
        print("  3. Update DATABASE_URL in backend/app/database.py if needed")
        print("\n" + "="*60)
        return False

def check_tables():
    """Check if tables exist"""
    try:
        from app.database import engine
        from sqlalchemy import inspect
        
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if 'matches' in tables:
            print("[OK] Database tables exist!")
            return True
        else:
            print("[WARNING] Database tables not found!")
            print("\nRun this command to create tables:")
            print("  py init_db.py")
            return False
    except Exception as e:
        print(f"[ERROR] Error checking tables: {str(e)}")
        return False

if __name__ == "__main__":
    print("="*60)
    print("Database Connection Checker")
    print("="*60)
    print()
    
    if check_database_connection():
        check_tables()
    else:
        sys.exit(1)
