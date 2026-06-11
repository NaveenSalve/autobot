from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.core.config import settings
from api.db.database import Base, engine
from api import models  # noqa: F401
from api.routes import profile_router, leads_router, audit_router, proposals_router, crm_router, jobs_router, negotiation_router, email_router

Base.metadata.create_all(bind=engine)
app = FastAPI(title='AcquireAI API', version='0.1.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=r'https://.*\.(trycloudflare|onrender)\.com',
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(profile_router)
app.include_router(leads_router)
app.include_router(audit_router)
app.include_router(proposals_router)
app.include_router(crm_router)
app.include_router(jobs_router)
app.include_router(negotiation_router)
app.include_router(email_router)

@app.get('/health')
async def health():
    return {'ok': True}
