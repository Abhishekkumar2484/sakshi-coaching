"""
Sakshi Coaching Backend — FastAPI Application Entry Point.

Run with:
    cd backend
    .venv\\Scripts\\uvicorn app.main:app --reload

Interactive docs available at:
    http://127.0.0.1:8000/docs   (Swagger UI)
    http://127.0.0.1:8000/redoc  (ReDoc)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router


def create_app() -> FastAPI:
    """Factory function that builds and configures the FastAPI instance."""

    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.VERSION,
        description="Backend API for the Sakshi Coaching Institute platform. "
        "Provides endpoints for Student, Teacher, and Owner portals.",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ── CORS ────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routers ─────────────────────────────────────────────
    app.include_router(api_router)

    # ── Health check ────────────────────────────────────────
    @app.get("/", tags=["Health"])
    async def root():
        return {
            "status": "online",
            "app": settings.APP_NAME,
            "version": settings.VERSION,
        }

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "healthy"}

    return app


# Create the app instance (uvicorn looks for this)
app = create_app()
