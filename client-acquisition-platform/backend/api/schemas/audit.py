from pydantic import BaseModel, HttpUrl
class AuditRequest(BaseModel):
    url: HttpUrl
class AuditCheck(BaseModel):
    id: str
    label: str
    passed: bool
    severity: str
    recommendation: str
class AuditResult(BaseModel):
    score: int
    checks: list[AuditCheck]
