from __future__ import annotations
import time
from typing import Any
import httpx
from api.services.scoring import deterministic_score

_CACHE: dict[str, tuple[float, list[dict[str, Any]]]] = {}
TTL_SECONDS = 60 * 60 * 24

CATEGORY_TAGS = {
    'coffee shops': ('amenity', 'cafe'),
    'coffee shop': ('amenity', 'cafe'),
    'cafes': ('amenity', 'cafe'),
    'restaurants': ('amenity', 'restaurant'),
    'restaurant': ('amenity', 'restaurant'),
    'dentists': ('amenity', 'dentist'),
    'dentist': ('amenity', 'dentist'),
    'hotels': ('tourism', 'hotel'),
    'hotel': ('tourism', 'hotel'),
    'gyms': ('leisure', 'fitness_centre'),
    'gym': ('leisure', 'fitness_centre'),
}

FALLBACK_BASE = [
    ('Kreuzberg Coffee Lab', 'coffee shop', 'https://example.com/coffee', 52.499, 13.421),
    ('Mitte Dental Studio', 'dentist', 'https://example.com/dental', 52.520, 13.405),
    ('Hotel Spreeblick', 'hotel', None, 52.512, 13.388),
    ('Prenzlauer Fitness', 'gym', 'https://example.com/gym', 52.538, 13.424),
    ('Cafe Orbit', 'coffee shop', None, 52.506, 13.456),
]

def _fallback(city: str, category: str) -> list[dict[str, Any]]:
    items = []
    for i, (name, cat, website, lat, lng) in enumerate(FALLBACK_BASE, start=1):
        lead = {
            'id': str(i), 'name': name, 'category': cat, 'website': website, 'phone': None, 'email': None,
            'location': city or 'Berlin', 'lat': lat, 'lng': lng, 'source': 'fallback', 'status': 'New'
        }
        lead['score'] = deterministic_score(lead, category_query=category)
        items.append(lead)
    return sorted(items, key=lambda x: x['score'], reverse=True)

async def _geocode(country: str, city: str) -> tuple[float, float, float, float]:
    query = ', '.join([x for x in [city, country] if x]) or 'Berlin, Germany'
    async with httpx.AsyncClient(timeout=12, headers={'User-Agent': 'AcquireAI/0.1 contact@example.com'}) as client:
        res = await client.get('https://nominatim.openstreetmap.org/search', params={'q': query, 'format': 'json', 'limit': 1})
        res.raise_for_status()
        data = res.json()
        if not data:
            raise RuntimeError(f'Could not geocode {query}')
        south, north, west, east = map(float, data[0]['boundingbox'])
        return south, west, north, east

async def search_businesses(country: str = '', city: str = '', category: str = '', page: int = 1) -> list[dict[str, Any]]:
    """Search businesses through OpenStreetMap Overpass API with 24h in-memory cache.

    The implementation is production-shaped but mock-safe: if Nominatim/Overpass is unavailable,
    deterministic fallback data is returned so the UI remains usable.
    """
    key = f'{country}|{city}|{category}|{page}'.lower()
    cached = _CACHE.get(key)
    if cached and time.time() - cached[0] < TTL_SECONDS:
        return cached[1]

    tag_key, tag_value = CATEGORY_TAGS.get(category.lower(), ('amenity', 'cafe'))
    try:
        south, west, north, east = await _geocode(country, city)
        # Keep query reasonably bounded. Overpass bbox format: south,west,north,east.
        query = f'''
        [out:json][timeout:25];
        (
          node["{tag_key}"="{tag_value}"]({south},{west},{north},{east});
          way["{tag_key}"="{tag_value}"]({south},{west},{north},{east});
          relation["{tag_key}"="{tag_value}"]({south},{west},{north},{east});
        );
        out center tags 75;
        '''
        async with httpx.AsyncClient(timeout=30, headers={'User-Agent': 'AcquireAI/0.1 contact@example.com'}) as client:
            res = await client.post('https://overpass-api.de/api/interpreter', data={'data': query})
            res.raise_for_status()
            elements = res.json().get('elements', [])
        leads: list[dict[str, Any]] = []
        seen: set[str] = set()
        for el in elements:
            tags = el.get('tags') or {}
            name = tags.get('name')
            if not name or name.lower() in seen:
                continue
            seen.add(name.lower())
            center = el.get('center') or {}
            lead = {
                'id': str(el.get('id')),
                'name': name,
                'category': tags.get(tag_key) or category,
                'website': tags.get('website') or tags.get('contact:website'),
                'phone': tags.get('phone') or tags.get('contact:phone'),
                'email': tags.get('email') or tags.get('contact:email'),
                'location': city or country or 'Unknown',
                'lat': el.get('lat') or center.get('lat'),
                'lng': el.get('lon') or center.get('lon'),
                'source': 'overpass',
                'status': 'New'
            }
            lead['score'] = deterministic_score(lead, category_query=category)
            leads.append(lead)
        if not leads:
            leads = _fallback(city, category)
        leads = sorted(leads, key=lambda x: x['score'], reverse=True)
    except Exception:
        leads = _fallback(city, category)

    _CACHE[key] = (time.time(), leads)
    return leads
