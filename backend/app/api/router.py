"""
API router aggregator.
Collects all portal sub-routers and mounts them under /api/v1.
"""
from fastapi import APIRouter

from app.api.endpoints import auth, student, teacher, owner

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(student.router)
api_router.include_router(teacher.router)
api_router.include_router(owner.router)

