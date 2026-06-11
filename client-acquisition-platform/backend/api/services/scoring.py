import hashlib

def deterministic_score(lead: dict, user_profile: dict | None = None, category_query: str = '') -> int:
    """Deterministic v1 lead score, normalized 0-100."""
    score = 0
    if lead.get('website'):
        score += 20
    if lead.get('phone'):
        score += 15
    if lead.get('email'):
        score += 10
    category = (lead.get('category') or '').lower()
    if category_query and any(part.strip().lower() in category for part in category_query.replace(',', ' ').split() if len(part.strip()) > 3):
        score += 15
    targets = (user_profile or {}).get('target_locations') or []
    location = (lead.get('location') or '').lower()
    if any(str(t).lower() in location for t in targets):
        score += 10
    if not lead.get('website'):
        score += 15  # outdated/missing web presence opportunity
    # Stable tie-breaker so same input always returns same score.
    seed = int(hashlib.sha1(f"{lead.get('name')}|{lead.get('location')}|{category}".encode()).hexdigest(), 16) % 16
    score += seed
    return max(0, min(100, score))
