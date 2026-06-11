#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

cleanup() {
  echo ""
  echo "Stopping AcquireAI dev servers..."
  if [[ -n "${BACKEND_PID:-}" ]]; then kill "$BACKEND_PID" 2>/dev/null || true; fi
  if [[ -n "${FRONTEND_PID:-}" ]]; then kill "$FRONTEND_PID" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

cd "$BACKEND_DIR"
if ! python3 -c "import fastapi, uvicorn" >/dev/null 2>&1; then
  echo "Installing backend dependencies..."
  python3 -m pip install --user -r requirements.txt
fi

echo "Starting backend on http://localhost:8000 ..."
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd "$FRONTEND_DIR"
if [[ ! -d node_modules ]]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Starting frontend on http://localhost:5173 ..."
npm run dev -- --host 0.0.0.0 &
FRONTEND_PID=$!

echo ""
echo "AcquireAI is starting..."
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "API docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."
wait
