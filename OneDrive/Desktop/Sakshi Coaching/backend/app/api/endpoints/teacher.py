"""
Teacher Portal API endpoints.
Provides dashboard data, class link management, and resource upload handling.
"""
from fastapi import APIRouter, Depends
from datetime import datetime

from app.schemas.schemas import (
    TeacherDashboardData,
    ClassLinkRequest,
    ClassLinkResponse,
)
from app.core.deps import get_current_teacher

router = APIRouter(
    prefix="/teacher", 
    tags=["Teacher Portal"],
    dependencies=[Depends(get_current_teacher)]
)


# ─── In-memory store (replace with DB later) ────────────────
_saved_links: list[ClassLinkResponse] = [
    ClassLinkResponse(
        id=1,
        url="https://meet.google.com/abc-def-ghi",
        subject="Physics",
        created_at="2026-03-13T10:00:00",
        status="active",
    ),
]

_next_link_id = 2


# ─── Routes ─────────────────────────────────────────────────
@router.get("/dashboard", response_model=TeacherDashboardData)
async def get_teacher_dashboard():
    """Return the full teacher dashboard overview."""
    return TeacherDashboardData(
        teacher_name="Dr. Rajesh Kumar",
        active_students=842,
        recent_links=_saved_links,
        stats={
            "total_classes_today": 4,
            "resources_uploaded": 23,
            "tests_created": 12,
            "avg_student_score": "82%",
        },
    )


@router.get("/class-links", response_model=list[ClassLinkResponse])
async def get_class_links():
    """Return all saved class meeting links."""
    return _saved_links


@router.post("/class-links", response_model=ClassLinkResponse, status_code=201)
async def save_class_link(payload: ClassLinkRequest):
    """Save a new live-class meeting link."""
    global _next_link_id

    new_link = ClassLinkResponse(
        id=_next_link_id,
        url=payload.url,
        subject=payload.subject,
        created_at=datetime.now().isoformat(),
        status="active",
    )
    _saved_links.append(new_link)
    _next_link_id += 1
    return new_link


@router.delete("/class-links/{link_id}", status_code=204)
async def delete_class_link(link_id: int):
    """Remove a class link by its ID."""
    global _saved_links
    _saved_links = [link for link in _saved_links if link.id != link_id]
    return None


@router.get("/students-count")
async def get_active_students():
    """Return the number of currently active students."""
    return {"active_students": 842}
