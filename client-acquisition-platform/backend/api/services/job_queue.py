from __future__ import annotations
import asyncio, uuid
from typing import Any, Awaitable, Callable
JOBS: dict[str, dict[str, Any]] = {}
def create_job(message: str = 'Queued') -> str:
    job_id = uuid.uuid4().hex[:12]
    JOBS[job_id] = {'job_id': job_id, 'status': 'queued', 'progress': 0, 'message': message, 'result': None}
    return job_id
async def run_job(job_id: str, func: Callable[[], Awaitable[dict] | dict]):
    try:
        JOBS[job_id].update(status='running', progress=15, message='Agent started')
        await asyncio.sleep(.4)
        JOBS[job_id].update(progress=55, message='Analyzing data')
        result = func()
        if hasattr(result, '__await__'):
            result = await result
        JOBS[job_id].update(status='completed', progress=100, message='Completed', result=result)
    except Exception as exc:
        JOBS[job_id].update(status='failed', progress=100, message=str(exc), result=None)
def get_job(job_id: str) -> dict[str, Any] | None:
    return JOBS.get(job_id)
