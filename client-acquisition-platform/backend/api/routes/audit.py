import asyncio
from fastapi import APIRouter, BackgroundTasks
from api.schemas.audit import AuditRequest
from api.services.job_queue import create_job, run_job
from api.agents.website_audit_agent import audit_website
from api.agents.opportunity_agent import detect_opportunities
router = APIRouter(prefix='/audit', tags=['audit'])
@router.post('')
async def start_audit(req: AuditRequest, background_tasks: BackgroundTasks):
    job_id = create_job('Audit queued')
    async def task():
        audit = await audit_website(str(req.url))
        opportunities = await detect_opportunities(audit)
        return {'audit': audit, 'opportunities': opportunities}
    background_tasks.add_task(run_job, job_id, task)
    return {'job_id': job_id, 'status': 'queued'}
