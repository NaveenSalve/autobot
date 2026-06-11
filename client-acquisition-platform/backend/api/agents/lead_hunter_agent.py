from api.services.overpass_service import search_businesses
async def hunt_leads(country: str='', city: str='', category: str='', page: int=1) -> list[dict]:
    return await search_businesses(country, city, category, page)
