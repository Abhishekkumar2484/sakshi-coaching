"""
Pydantic schemas for request / response validation.
These define the shape of data flowing through the API.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ─── Authentication ─────────────────────────────────────────
class LoginRequest(BaseModel):
    username: str
    password: str
    role: str  # "student" | "teacher" | "owner"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str


# ─── Student Schemas ────────────────────────────────────────
class LiveClass(BaseModel):
    id: int
    subject: str
    teacher: str
    url: str
    starts_in: str  # e.g. "15 minutes"
    status: str = "upcoming"  # upcoming | live | ended


class StudyMaterial(BaseModel):
    id: int
    title: str
    subject: str
    file_type: str  # pdf | ppt | video
    uploaded_at: str
    download_url: str


class FeeRecord(BaseModel):
    id: int
    student_name: str
    grade: str
    amount: str
    status: str  # paid | due
    date: str


class StudentDashboardData(BaseModel):
    student_name: str
    live_classes: list[LiveClass]
    study_materials: list[StudyMaterial]
    fee_status: FeeRecord
    stats: dict  # flexible key-value stats


# ─── Teacher Schemas ────────────────────────────────────────
class ClassLinkRequest(BaseModel):
    url: str
    subject: Optional[str] = None


class ClassLinkResponse(BaseModel):
    id: int
    url: str
    subject: Optional[str]
    created_at: str
    status: str = "active"


class ResourceUploadResponse(BaseModel):
    id: int
    filename: str
    subject: str
    uploaded_at: str
    status: str = "processed"


class TeacherDashboardData(BaseModel):
    teacher_name: str
    active_students: int
    recent_links: list[ClassLinkResponse]
    stats: dict


# ─── Owner Schemas ──────────────────────────────────────────
class SystemStats(BaseModel):
    total_students: int
    total_teachers: int
    total_revenue: str
    pending_fees: str
    active_classes: int


class AdmissionPulseEntry(BaseModel):
    month: str
    count: int


class FeeAuditEntry(BaseModel):
    id: int
    student_name: str
    grade: str
    amount: str
    status: str
    date: str


class OwnerDashboardData(BaseModel):
    stats: SystemStats
    admission_pulse: list[AdmissionPulseEntry]
    recent_fees: list[FeeAuditEntry]
    system_health: dict
