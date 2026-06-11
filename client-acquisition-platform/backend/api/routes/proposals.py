from fastapi import APIRouter, BackgroundTasks
from api.schemas.proposal import ProposalRequest
from api.services.job_queue import create_job, run_job
from api.agents.proposal_agent import generate_proposal
router = APIRouter(prefix='/proposals', tags=['proposals'])
@router.post('')
async def start_proposal(req: ProposalRequest, background_tasks: BackgroundTasks):
    job_id = create_job('Proposal queued')
    background_tasks.add_task(run_job, job_id, lambda: generate_proposal(req.model_dump()))
    return {'job_id': job_id, 'status': 'queued'}
@router.get('')
async def list_proposals():
    return {'items': []}
