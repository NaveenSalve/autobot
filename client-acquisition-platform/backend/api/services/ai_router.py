from __future__ import annotations
import logging
from typing import Any

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from api.core.config import settings

logger = logging.getLogger(__name__)

class AIRouterError(RuntimeError):
    pass


def _messages_to_prompt(prompt: str, system: str | None = None) -> str:
    return f"{system.strip()}\n\n{prompt.strip()}" if system else prompt.strip()


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=8), reraise=True)
async def _call_gemini(prompt: str, system: str | None, temperature: float, max_tokens: int) -> str:
    if not settings.gemini_api_key:
        raise AIRouterError('GEMINI_API_KEY is not configured')
    try:
        import google.generativeai as genai
    except Exception as exc:  # pragma: no cover - depends on environment package install
        raise AIRouterError('google-generativeai is not installed') from exc

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel(
        model_name='gemini-1.5-flash',
        system_instruction=system or None,
    )
    response = await model.generate_content_async(
        prompt,
        generation_config={
            'temperature': temperature,
            'max_output_tokens': max_tokens,
        },
    )
    text = getattr(response, 'text', None)
    if not text:
        raise AIRouterError('Gemini returned an empty response')
    logger.info('AI provider selected: gemini-1.5-flash')
    return text


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=8), reraise=True)
async def _call_openrouter(prompt: str, system: str | None, temperature: float, max_tokens: int) -> str:
    if not settings.openrouter_api_key:
        raise AIRouterError('OPENROUTER_API_KEY is not configured')

    messages: list[dict[str, str]] = []
    if system:
        messages.append({'role': 'system', 'content': system})
    messages.append({'role': 'user', 'content': prompt})

    async with httpx.AsyncClient(timeout=45) as client:
        res = await client.post(
            'https://openrouter.ai/api/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {settings.openrouter_api_key}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'AcquireAI',
            },
            json={
                'model': 'google/gemini-2.0-flash-exp:free',
                'messages': messages,
                'temperature': temperature,
                'max_tokens': max_tokens,
            },
        )
        res.raise_for_status()
        data: dict[str, Any] = res.json()
    text = data.get('choices', [{}])[0].get('message', {}).get('content')
    if not text:
        raise AIRouterError('OpenRouter returned an empty response')
    logger.info('AI provider selected: openrouter')
    return text


async def generate_text(
    prompt: str,
    system: str | None = None,
    temperature: float = 0.3,
    max_tokens: int = 2000,
) -> str:
    """Central LLM router.

    Order:
    1. Gemini gemini-1.5-flash using GEMINI_API_KEY
    2. OpenRouter using OPENROUTER_API_KEY
    3. Deterministic mock response if both are missing/fail
    """
    errors: list[str] = []

    if settings.gemini_api_key:
        try:
            return await _call_gemini(prompt, system, temperature, max_tokens)
        except Exception as exc:
            logger.warning('Gemini failed; falling back. error=%s', exc)
            errors.append(f'Gemini: {exc}')

    if settings.openrouter_api_key:
        try:
            return await _call_openrouter(prompt, system, temperature, max_tokens)
        except Exception as exc:
            logger.warning('OpenRouter failed; falling back to mock. error=%s', exc)
            errors.append(f'OpenRouter: {exc}')

    logger.warning('Using mock AI response. errors=%s', ' | '.join(errors) if errors else 'no provider keys configured')
    return (
        '[Mock AI draft]\n'
        + _messages_to_prompt(prompt, system)[:1600]
        + '\n\n(Mock mode: configure GEMINI_API_KEY or OPENROUTER_API_KEY for live generation.)'
    )
