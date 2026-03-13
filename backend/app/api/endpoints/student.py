"""
Student Portal API endpoints.
Provides dashboard data, live classes, study materials, and fee status.
"""
from fastapi import APIRouter, Depends

from app.schemas.schemas import (
    StudentDashboardData,
    LiveClass,
    StudyMaterial,
    FeeRecord,
)
from app.core.deps import get_current_student

router = APIRouter(
    prefix="/student", 
    tags=["Student Portal"],
    dependencies=[Depends(get_current_student)]
)


# ─── Mock Data ──────────────────────────────────────────────

MOCK_LIVE_CLASSES: list[LiveClass] = [
    LiveClass(
        id=1,
        subject="Physics",
        teacher="Dr. Rajesh Kumar",
        url="https://meet.google.com/abc-def-ghi",
        starts_in="15 minutes",
        status="upcoming",
    ),
    LiveClass(
        id=2,
        subject="Chemistry",
        teacher="Dr. Meena Sharma",
        url="https://meet.google.com/xyz-uvw-rst",
        starts_in="1 hour",
        status="upcoming",
    ),
]

MOCK_STUDY_MATERIALS: list[StudyMaterial] = [
    StudyMaterial(
        id=1,
        title="Newton's Laws Complete Notes",
        subject="Physics",
        file_type="pdf",
        uploaded_at="2026-03-12",
        download_url="/files/physics_newtons_laws.pdf",
    ),
    StudyMaterial(
        id=2,
        title="Organic Chemistry Reactions",
        subject="Chemistry",
        file_type="pdf",
        uploaded_at="2026-03-10",
        download_url="/files/chemistry_organic.pdf",
    ),
    StudyMaterial(
        id=3,
        title="Trigonometry Video Lecture",
        subject="Mathematics",
        file_type="video",
        uploaded_at="2026-03-08",
        download_url="/files/math_trigonometry.mp4",
    ),
]

MOCK_FEE_STATUS = FeeRecord(
    id=1,
    student_name="Abhishek",
    grade="12th",
    amount="₹5500",
    status="paid",
    date="2026-03-10",
)


# ─── Routes ─────────────────────────────────────────────────
@router.get("/dashboard", response_model=StudentDashboardData)
async def get_student_dashboard():
    """Return the full student dashboard data in a single call."""
    return StudentDashboardData(
        student_name="Abhishek",
        live_classes=MOCK_LIVE_CLASSES,
        study_materials=MOCK_STUDY_MATERIALS,
        fee_status=MOCK_FEE_STATUS,
        stats={
            "live_classes": len(MOCK_LIVE_CLASSES),
            "study_materials": len(MOCK_STUDY_MATERIALS),
            "tests_completed": 8,
            "average_score": "87%",
        },
    )


@router.get("/live-classes", response_model=list[LiveClass])
async def get_live_classes():
    """Return the list of upcoming / active live classes."""
    return MOCK_LIVE_CLASSES


@router.get("/study-materials", response_model=list[StudyMaterial])
async def get_study_materials():
    """Return available study materials for download."""
    return MOCK_STUDY_MATERIALS


@router.get("/fee-status", response_model=FeeRecord)
async def get_fee_status():
    """Return the current fee payment status for the student."""
    return MOCK_FEE_STATUS
