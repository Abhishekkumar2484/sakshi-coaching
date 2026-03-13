import os
import sys

# Add backend directory to sis path so absolute imports work
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.database import engine, Base, SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if users exist
        if db.query(User).first():
            print("Database already seeded.")
            return

        print("Seeding initial users...")
        
        # 1. Student User
        student = User(
            username="student_abhi",
            email="abhi@sakshi.com",
            hashed_password=get_password_hash("password123"),
            role="student",
        )
        
        # 2. Teacher User
        teacher = User(
            username="dr_rajesh",
            email="rajesh@sakshi.com",
            hashed_password=get_password_hash("password123"),
            role="teacher",
        )
        
        # 3. Owner User
        owner = User(
            username="admin_owner",
            email="admin@sakshi.com",
            hashed_password=get_password_hash("admin123"),
            role="owner",
        )

        db.add_all([student, teacher, owner])
        db.commit()
        print("Database initialized and users seeded successfully!")
        
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
