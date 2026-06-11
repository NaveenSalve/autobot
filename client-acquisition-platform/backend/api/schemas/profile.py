from pydantic import BaseModel, Field
class ProfileIn(BaseModel):
    name: str | None = None
    email: str | None = None
    headline: str | None = None
    bio: str | None = None
    services: list[str] = Field(default_factory=list)
    target_industries: list[str] = Field(default_factory=list)
    target_locations: list[str] = Field(default_factory=list)
