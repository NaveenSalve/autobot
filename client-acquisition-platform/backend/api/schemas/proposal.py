from pydantic import BaseModel
class ProposalRequest(BaseModel):
    lead_id: str | int | None = None
    audit: dict | None = None
    opportunities: list[dict] = []
class ProposalResult(BaseModel):
    proposal: str
    outreach_email: str
    follow_ups: list[str]
