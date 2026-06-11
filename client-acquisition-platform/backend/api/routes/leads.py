from fastapi import APIRouter, HTTPException, Query
from api.agents.lead_hunter_agent import hunt_leads

router = APIRouter(prefix='/leads', tags=['leads'])

LEAD_CACHE: dict[str, dict] = {}
LAST_SEARCH: list[dict] = []

@router.get('')
async def get_leads(country: str = '', city: str = 'Berlin', category: str = 'coffee shops', page: int = Query(1, ge=1)):
    global LAST_SEARCH
    items = await hunt_leads(country, city, category, page)
    LAST_SEARCH = items
    for item in items:
        LEAD_CACHE[str(item['id'])] = item
    return {'items': items, 'page': page, 'total': len(items)}

@router.get('/{lead_id}')
async def get_lead(lead_id: str):
    lead = LEAD_CACHE.get(str(lead_id))
    if lead:
        return lead
    # Friendly fallback for first app load/demo IDs without forcing a fresh search every time.
    if LAST_SEARCH:
        raise HTTPException(status_code=404, detail='Lead not found in current cache')
    items = await hunt_leads(city='Berlin', category='coffee shops')
    for item in items:
        LEAD_CACHE[str(item['id'])] = item
    lead = LEAD_CACHE.get(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail='Lead not found')
    return lead
