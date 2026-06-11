from pydantic import BaseModel
class LeadOut(BaseModel):
    id: str | int
    name: str
    category: str | None = None
    website: str | None = None
    phone: str | None = None
    email: str | None = None
    location: str | None = None
    lat: float | None = None
    lng: float | None = None
    source: str | None = 'mock'
    score: int = 0
    status: str = 'New'
class LeadsPage(BaseModel):
    items: list[LeadOut]
    page: int = 1
    total: int
