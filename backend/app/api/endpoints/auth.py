from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core import security
from app.db.database import get_db
from app.models.user import User
from app.schemas.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return a JWT token.
    Follows the flow: Validates credentials -> Generates JWT -> Returns Token.
    """
    # 1. Find user in DB
    user = db.query(User).filter(User.username == login_data.username).first()
    
    # 2. Compare password using bcrypt
    if not user or not security.verify_password(login_data.password, user.hashed_password):
        # 3. Valid? -> No -> Return Error Response (401)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Optional role check if frontend specifies it
    if login_data.role and user.role != login_data.role:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"This account does not have access to the {login_data.role} portal.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 4. Valid? -> Yes -> Generate JWT Payload
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Payload: user_id (sub), role, expiration
    access_token = security.create_access_token(
        data={"sub": user.username, "role": user.role, "user_id": user.id},
        expires_delta=access_token_expires
    )
    
    # 5. Send JWT Token to React Frontend
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "role": user.role,
        "username": user.username
    }
