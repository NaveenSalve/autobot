# AcquireAI — AI Client Acquisition Platform

Full-stack scaffold for a premium AI-powered client acquisition and business development platform.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Routes included:

- `/dashboard`
- `/leads`
- `/map`
- `/lead/:id`
- `/pipeline`
- `/proposals`
- `/settings`
- `/onboarding`

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

API includes mock-safe endpoints for profile, leads, audits, proposals, CRM, and jobs.

## Infra

```bash
docker compose up -d
```

Starts Postgres and Redis for production-like local development.

## Current implementation status

- Frontend SaaS shell complete
- Dark/light mode complete
- Onboarding complete
- Lead search/table complete
- React Leaflet map complete
- Lead detail audit/proposal UI complete
- CRM Kanban complete
- FastAPI backend mock endpoints complete
- Async job polling contract complete
- AI router mock/fallback contract complete
- Real Overpass/Nominatim service implemented with deterministic fallback
- HTTP website audit implemented with Playwright-compatible API contract
- Opportunity/proposal agents implemented with mock-safe AI fallback
- Real Gemini `gemini-1.5-flash` router implemented with OpenRouter + mock fallback
- Negotiation advisor API and Lead Detail UI implemented
- Full CRM deal CRUD routes implemented
- Lead detail cache lookup implemented after search

Production hardening still recommended before deployment: persistent job storage, auth, encrypted credentials, provider-specific LLM HTTP calls, Docker image for Playwright browsers, and external Redis cache wiring for Overpass results.

## Completed pending upgrades

### Resume Upload + PDF/DOCX Parse

Backend endpoint:

```bash
POST /profile/extract
multipart/form-data: file=.pdf/.docx/.txt/.md/.rtf
```

The backend extracts text with PyMuPDF or python-docx, then uses the AI router to structure the profile. If AI is unavailable, it falls back to deterministic heuristic extraction.

Frontend integration:

- `ResumeUploader.jsx`
- Added to Onboarding step 1

### Email Outreach

Backend endpoint:

```bash
POST /email/send
{
  "to": "client@example.com",
  "subject": "Quick website growth ideas",
  "body": "..."
}
```

If SMTP credentials are configured, email is sent through SMTP/Gmail app password. If not configured, the endpoint returns mock mode safely.

SMTP environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_USE_TLS=true
SMTP_USE_SSL=false
```

Frontend integration:

- Email send panel added to `ProposalEditor.jsx`

### Production Docker Deploy Setup

Added:

```txt
backend/Dockerfile
frontend/Dockerfile
frontend/nginx.conf
docker-compose.prod.yml
render.yaml
railway.json
.env.production.example
```

Local production-style run:

```bash
docker compose -f docker-compose.prod.yml up --build
```

### Negotiation UI Upgrade

`NegotiationAdvisor.jsx` now includes:

- floor/target/premium pricing cards
- pricing bar chart
- visual counteroffer flow
- warning and strategy block

### Space Landing Polish

`space-landing/index.html` tightened:

- BlurText has explicit 3-step blur/opacity/y/scale keyframes
- glass border mask retains `-webkit-mask-composite: xor` and `mask-composite: exclude`
- added perspective context for word depth feel

## Final verification commands run

```bash
python3 -m compileall -q client-acquisition-platform/backend
cd client-acquisition-platform/frontend && npm run build
cd client-acquisition-platform/backend && python3 -m uvicorn main:app --reload
cd client-acquisition-platform/frontend && npm run dev
```

Verified:

- `/health` returns `{"ok": true}`
- `/profile/extract` works with TXT upload; PDF/DOCX parser code installed
- `/email/send` works in mock mode without SMTP credentials
- `/audit` job completes
- `/proposals` job returns proposal/outreach_email/follow_ups
- `/negotiate` returns pricing suggestions
- all 8 frontend routes return 200 in Vite dev server
