from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from pydantic import ValidationError

from app.core.config import settings
from app.db.database import get_db
from app.models.user import User

# This will expect the token in the Authorization header: Bearer <token>
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    """Dependency that decodes token and fetches the current user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, ValidationError):
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Dependency to ensure the user is active."""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


# Role-Based Access Control (RBAC) Dependencies
def get_current_student(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user


def get_current_teacher(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role not in ["teacher", "owner"]:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user


def get_current_owner(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role != "owner":
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user
