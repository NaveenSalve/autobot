from api.services.ai_router import generate_text

async def generate_proposal(payload: dict) -> dict:
    lead_id = payload.get('lead_id') or 'the business'
    opportunities = payload.get('opportunities') or []
    opp_lines = '\n'.join(f"- {o.get('service')}: ${o.get('value_estimate')} ({o.get('urgency')} urgency)" for o in opportunities) or '- AI chatbot setup\n- Booking/conversion workflow\n- Follow-up automation'
    prompt = f"""
Create a concise, personalized business-development proposal for lead {lead_id}.
Use this opportunity context:
{opp_lines}
Return practical recommendations, scope, expected value, and next steps.
"""
    draft = await generate_text(prompt, system='You are a senior business development consultant. Be specific and concise.')
    return {
        'proposal': '# Growth Proposal\n\n' + draft + '\n\n## Recommended Scope\n' + opp_lines + '\n\n## Next Step\nSchedule a 20-minute walkthrough to validate priorities and implementation timing.\n',
        'outreach_email': 'Hi — I reviewed your website and found a few quick wins around lead capture, booking conversion, and follow-up. Open to a short walkthrough this week?',
        'follow_ups': ['After 3 days: send the audit summary and one screenshot-backed recommendation.', 'After 7 days: send a quantified quick-win estimate and ask for a 20-minute call.']
    }
