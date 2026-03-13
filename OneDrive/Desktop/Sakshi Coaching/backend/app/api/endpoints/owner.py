"""
Owner Portal API endpoints.
Provides system-wide stats, admission data, fee audits, and management actions.
"""
from fastapi import APIRouter, Depends

from app.schemas.schemas import (
    OwnerDashboardData,
    SystemStats,
    AdmissionPulseEntry,
    FeeAuditEntry,
)
from app.core.deps import get_current_owner

router = APIRouter(
    prefix="/owner", 
    tags=["Owner Portal"],
    dependencies=[Depends(get_current_owner)]
)


# ─── Mock Data ──────────────────────────────────────────────
MOCK_STATS = SystemStats(
    total_students=1247,
    total_teachers=18,
    total_revenue="₹48,50,000",
    pending_fees="₹3,20,000",
    active_classes=6,
)

MOCK_ADMISSION_PULSE: list[AdmissionPulseEntry] = [
    AdmissionPulseEntry(month="Jan", count=42),
    AdmissionPulseEntry(month="Feb", count=58),
    AdmissionPulseEntry(month="Mar", count=65),
    AdmissionPulseEntry(month="Apr", count=71),
    AdmissionPulseEntry(month="May", count=48),
    AdmissionPulseEntry(month="Jun", count=35),
    AdmissionPulseEntry(month="Jul", count=90),
    AdmissionPulseEntry(month="Aug", count=80),
    AdmissionPulseEntry(month="Sep", count=75),
    AdmissionPulseEntry(month="Oct", count=60),
    AdmissionPulseEntry(month="Nov", count=55),
    AdmissionPulseEntry(month="Dec", count=45),
]

MOCK_FEE_AUDIT: list[FeeAuditEntry] = [
    FeeAuditEntry(id=1, student_name="Aarav Sharma", grade="10th", amount="₹5000", status="paid", date="2026-03-10"),
    FeeAuditEntry(id=2, student_name="Ishani Gupta", grade="12th", amount="₹6500", status="due", date="-"),
    FeeAuditEntry(id=3, student_name="Vihaan Patel", grade="9th", amount="₹4500", status="paid", date="2026-03-05"),
    FeeAuditEntry(id=4, student_name="Riya Verma", grade="11th", amount="₹5500", status="due", date="-"),
]


# ─── Routes ─────────────────────────────────────────────────
@router.get("/dashboard", response_model=OwnerDashboardData)
async def get_owner_dashboard():
    """Return the complete owner dashboard including stats, pulse, and fees."""
    return OwnerDashboardData(
        stats=MOCK_STATS,
        admission_pulse=MOCK_ADMISSION_PULSE,
        recent_fees=MOCK_FEE_AUDIT,
        system_health={
            "server_uptime": "99.9%",
            "database_status": "healthy",
            "last_backup": "2026-03-13T02:00:00",
            "storage_used": "12.4 GB / 50 GB",
        },
    )


@router.get("/stats", response_model=SystemStats)
async def get_system_stats():
    """Return overall coaching institute statistics."""
    return MOCK_STATS


@router.get("/admission-pulse", response_model=list[AdmissionPulseEntry])
async def get_admission_pulse():
    """Return month-by-month admission data for the chart."""
    return MOCK_ADMISSION_PULSE


@router.get("/fee-audit", response_model=list[FeeAuditEntry])
async def get_fee_audit():
    """Return the fee audit log for all students."""
    return MOCK_FEE_AUDIT


@router.post("/fee-audit/{student_id}/toggle", response_model=FeeAuditEntry)
async def toggle_fee_status(student_id: int):
    """Toggle a student's fee status between paid and due."""
    for entry in MOCK_FEE_AUDIT:
        if entry.id == student_id:
            if entry.status == "paid":
                entry.status = "due"
                entry.date = "-"
            else:
                entry.status = "paid"
                entry.date = "2026-03-13"
            return entry
    return FeeAuditEntry(id=0, student_name="Not Found", grade="-", amount="-", status="-", date="-")
