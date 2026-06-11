from __future__ import annotations
from pydantic import BaseModel, Field

class NegotiationInput(BaseModel):
    industry: str = 'general'
    company_size: str = 'small'
    user_services: list[str] = Field(default_factory=list)
    audit_score: int = 60


def advise_negotiation(payload: dict) -> dict:
    data = NegotiationInput(**payload)
    industry = data.industry.lower()
    size = data.company_size.lower()
    services = [s.lower() for s in data.user_services]

    base = 1200
    if any(x in industry for x in ['hotel', 'hospitality', 'restaurant', 'coffee', 'cafe']):
        base += 500
    if any(x in industry for x in ['health', 'dentist', 'clinic', 'medical']):
        base += 900
    if any(x in size for x in ['medium', '50', '100']):
        base *= 1.6
    elif any(x in size for x in ['large', 'enterprise', '200']):
        base *= 2.6

    service_multiplier = max(1, min(3, len(services)))
    if any('chatbot' in s or 'ai' in s for s in services):
        base += 700
    if any('seo' in s for s in services):
        base += 450
    if any('web' in s or 'design' in s for s in services):
        base += 900

    urgency_multiplier = 1.25 if data.audit_score < 50 else 1.1 if data.audit_score < 70 else 1.0
    suggested = int(round(base * service_multiplier * urgency_multiplier / 100) * 100)
    minimum = int(round(suggested * 0.68 / 100) * 100)

    if data.audit_score < 50:
        warning = 'Do not underprice: the audit indicates urgent conversion gaps. Anchor on revenue recovery, not task hours.'
        strategy = 'Lead with a premium implementation price, then offer phased delivery rather than discounting the core setup.'
    elif data.audit_score < 75:
        warning = 'Moderate leverage: focus negotiation on quick wins and measurable conversion lift.'
        strategy = 'Offer two tiers: essential setup at the minimum acceptable price and growth package at the suggested price.'
    else:
        warning = 'The website is relatively mature. Avoid aggressive pricing unless you can tie scope to clear ROI.'
        strategy = 'Position as optimization/experimentation. Use a lower entry project with a success-based expansion path.'

    return {
        'suggested_price': suggested,
        'min_price': minimum,
        'counteroffer_strategy': strategy,
        'warning': warning,
    }
