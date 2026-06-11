from pydantic import BaseModel
class JobStart(BaseModel):
    job_id: str
    status: str = 'queued'
class JobStatus(BaseModel):
    job_id: str
    status: str
    progress: int = 0
    message: str = ''
    result: dict | None = None
