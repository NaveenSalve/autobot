from __future__ import annotations
from uuid import uuid4
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix='/crm', tags=['crm'])

DEALS: dict[str, dict] = {
    'd1': {'id': 'd1', 'lead_id': '1', 'name': 'Kreuzberg Coffee Lab', 'stage': 'New', 'value': 1800, 'notes': '', 'next_follow_up': '2026-06-14'},
    'd2': {'id': 'd2', 'lead_id': '2', 'name': 'Mitte Dental Studio', 'stage': 'Proposal Sent', 'value': 4200, 'notes': '', 'next_follow_up': '2026-06-18'},
}

@router.get('/deals')
async def list_deals():
    return {'items': list(DEALS.values()), 'total': len(DEALS)}

@router.post('/deals')
async def create_deal(payload: dict):
    deal_id = payload.get('id') or uuid4().hex[:10]
    deal = {
        'id': deal_id,
        'lead_id': payload.get('lead_id'),
        'name': payload.get('name') or payload.get('company_name') or 'Untitled deal',
        'stage': payload.get('stage', 'New'),
        'value': int(payload.get('value') or 0),
        'notes': payload.get('notes', ''),
        'next_follow_up': payload.get('next_follow_up'),
    }
    DEALS[deal_id] = deal
    return deal

@router.patch('/deals/{deal_id}')
async def update_deal(deal_id: str, payload: dict):
    deal = DEALS.get(deal_id)
    if not deal:
        raise HTTPException(status_code=404, detail='Deal not found')
    allowed = {'lead_id', 'name', 'stage', 'value', 'notes', 'next_follow_up'}
    for key, value in payload.items():
        if key in allowed:
            deal[key] = int(value) if key == 'value' and value is not None else value
    return deal

@router.delete('/deals/{deal_id}')
async def delete_deal(deal_id: str):
    if deal_id not in DEALS:
        raise HTTPException(status_code=404, detail='Deal not found')
    return {'deleted': DEALS.pop(deal_id)}
