from celery import Celery
from api.core.config import settings
celery_app = Celery('client_acquisition', broker=settings.redis_url, backend=settings.redis_url)
@celery_app.task
def ping():
    return 'pong'
