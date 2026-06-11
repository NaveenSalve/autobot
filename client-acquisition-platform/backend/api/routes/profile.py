from fastapi import APIRouter, File, UploadFile
from api.schemas.profile import ProfileIn
from api.services.profile_extractor import extract_profile_with_ai, extract_text_from_upload

router = APIRouter(prefix='/profile', tags=['profile'])
PROFILE: dict = {}

@router.post('')
async def save_profile(profile: ProfileIn):
    PROFILE.update(profile.model_dump())
    return {'ok': True, 'profile': PROFILE}

@router.get('')
async def get_profile():
    return PROFILE

@router.post('/extract')
async def extract_profile(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_upload(file.filename or 'upload', content)
    profile = await extract_profile_with_ai(text)
    PROFILE.update(profile)
    return {'ok': True, 'filename': file.filename, 'chars': len(text), 'profile': profile}
