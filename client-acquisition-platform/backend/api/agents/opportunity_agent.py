async def detect_opportunities(audit: dict, user_services: list[str] | None = None) -> list[dict]:
    checks = {c['id']: c for c in audit.get('checks', [])}
    opportunities: list[dict] = []
    if checks.get('chatbot') and not checks['chatbot']['passed']:
        opportunities.append({'service':'AI chatbot setup','value_estimate':1800,'urgency':'high','probability':0.72,'reasoning':'The website lacks automated lead capture and after-hours visitor qualification.'})
    if checks.get('booking') and not checks['booking']['passed']:
        opportunities.append({'service':'Booking funnel optimization','value_estimate':2400,'urgency':'high','probability':0.68,'reasoning':'No direct booking path is visible, creating conversion friction for high-intent visitors.'})
    if checks.get('seo') and not checks['seo']['passed']:
        opportunities.append({'service':'Local SEO cleanup','value_estimate':1200,'urgency':'medium','probability':0.61,'reasoning':'Basic metadata gaps reduce search click-through and local discovery.'})
    if checks.get('mobile') and not checks['mobile']['passed']:
        opportunities.append({'service':'Mobile conversion redesign','value_estimate':3200,'urgency':'medium','probability':0.58,'reasoning':'Mobile responsiveness signals are missing, which can harm mobile lead conversion.'})
    if not opportunities:
        opportunities.append({'service':'Conversion rate audit','value_estimate':900,'urgency':'low','probability':0.45,'reasoning':'Core basics are present; a focused conversion review may still uncover quick wins.'})
    return opportunities
