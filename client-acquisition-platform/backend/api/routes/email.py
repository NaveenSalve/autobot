from fastapi import APIRouter
from api.services.email_service import send_email

router = APIRouter(prefix='/email', tags=['email'])

@router.post('/send')
async def send_outreach_email(payload: dict):
    return send_email(payload)
