from fastapi import APIRouter
from api.agents.negotiation_agent import advise_negotiation

router = APIRouter(prefix='/negotiate', tags=['negotiation'])

@router.post('')
async def negotiate(payload: dict):
    return advise_negotiation(payload)
