from fastapi import APIRouter, HTTPException
from api.services.job_queue import get_job
router = APIRouter(prefix='/jobs', tags=['jobs'])
@router.get('/{job_id}')
async def job_status(job_id: str):
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail='Job not found')
    return job
