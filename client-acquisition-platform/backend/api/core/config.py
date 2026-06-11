from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    gemini_api_key: str | None = None
    openrouter_api_key: str | None = None
    database_url: str = 'sqlite:///./dev.db'
    redis_url: str = 'redis://localhost:6379/0'
    frontend_origin: str = 'http://localhost:5173'
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None
    smtp_use_tls: bool = True
    smtp_use_ssl: bool = False
    class Config:
        env_file = '.env'
settings = Settings()
