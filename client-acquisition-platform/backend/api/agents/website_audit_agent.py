from __future__ import annotations
import re, time
from urllib.parse import urlparse
import httpx

CHATBOT_PATTERNS = ['intercom', 'drift', 'tawk', 'crisp', 'chatbot', 'livechat', 'zendesk']
BOOKING_PATTERNS = ['calendly', 'book now', 'appointment', 'reservation', 'schedule', 'booking']
SOCIAL_PATTERNS = ['instagram.com', 'facebook.com', 'linkedin.com', 'x.com/', 'twitter.com', 'tiktok.com']

def _has_any(html: str, patterns: list[str]) -> bool:
    low = html.lower()
    return any(p in low for p in patterns)

def _meta_description(html: str) -> bool:
    return bool(re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=', html, flags=re.I))

async def _httpx_audit(url: str) -> tuple[str, float, int]:
    started = time.perf_counter()
    async with httpx.AsyncClient(timeout=18, follow_redirects=True, headers={'User-Agent': 'AcquireAI-Audit/0.1'}) as client:
        res = await client.get(url)
        elapsed = time.perf_counter() - started
        return res.text[:1_000_000], elapsed, res.status_code

async def audit_website(url: str) -> dict:
    """Run a practical 7-point website audit.

    This uses HTTP analysis by default so it works in lightweight environments. It is structured so
    Playwright checks can be added/replaced without changing the API contract.
    """
    parsed = urlparse(url)
    if parsed.scheme not in {'http', 'https'}:
        raise ValueError('Only http/https URLs can be audited')

    try:
        html, load_time, status = await _httpx_audit(url)
    except Exception as exc:
        html, load_time, status = '', 99.0, 0
        fetch_error = str(exc)
    else:
        fetch_error = ''

    title_ok = bool(re.search(r'<title>[^<]{8,}</title>', html, flags=re.I))
    desc_ok = _meta_description(html)
    viewport_ok = 'name="viewport"' in html.lower() or "name='viewport'" in html.lower()
    checks = [
        {'id':'chatbot','label':'Chatbot present','passed':_has_any(html, CHATBOT_PATTERNS),'severity':'medium','recommendation':'Add a lightweight AI chat assistant to capture visitors.'},
        {'id':'booking','label':'Booking widget','passed':_has_any(html, BOOKING_PATTERNS),'severity':'high','recommendation':'Add direct booking or consultation scheduling.'},
        {'id':'speed','label':'Page speed','passed':load_time < 3.0 and status < 500,'severity':'medium','recommendation':f'Observed load time was {load_time:.2f}s. Compress assets and reduce render-blocking scripts.'},
        {'id':'design','label':'Design quality signal','passed':len(html) > 5000 and ('button' in html.lower() or 'cta' in html.lower()),'severity':'low','recommendation':'Ensure the primary call-to-action is visible above the fold.'},
        {'id':'seo','label':'SEO basics','passed':title_ok and desc_ok,'severity':'medium','recommendation':'Add a descriptive title and meta description for local search visibility.'},
        {'id':'mobile','label':'Mobile responsiveness signal','passed':viewport_ok,'severity':'medium','recommendation':'Add a viewport meta tag and test lead capture on mobile devices.'},
        {'id':'social','label':'Social presence','passed':_has_any(html, SOCIAL_PATTERNS),'severity':'low','recommendation':'Add visible social proof and active social profile links.'},
    ]
    penalty = {'high': 18, 'medium': 12, 'low': 7}
    score = max(0, 100 - sum(penalty[c['severity']] for c in checks if not c['passed']))
    result = {'score': score, 'checks': checks, 'load_time_seconds': round(load_time, 2), 'status_code': status}
    if fetch_error:
        result['warning'] = fetch_error
    return result
