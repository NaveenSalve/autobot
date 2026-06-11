#!/bin/bash
# Oracle Cloud Free Tier VM Setup — AcquireAI + Space Landing
# Run this on a fresh Oracle Cloud Ubuntu 22.04/24.04 VM

set -euo pipefail

echo "=== 1. System Updates ==="
sudo apt update && sudo apt upgrade -y

echo "=== 2. Install Docker ==="
curl -fsSL https://get.docker.com | sudo bash
sudo usermod -aG docker $USER

echo "=== 3. Install Docker Compose ==="
sudo apt install -y docker-compose-plugin

echo "=== 4. Clone Repo ==="
cd /opt
sudo git clone https://github.com/NaveenSalve/autobot.git
sudo chown -R $USER:$USER autobot
cd autobot/client-acquisition-platform

echo "=== 5. Create .env ==="
cat > .env << 'EOF'
DATABASE_URL=postgresql://acquire:acquire@postgres:5432/client_acquisition
REDIS_URL=redis://redis:6379/0
FRONTEND_ORIGIN=http://localhost
GEMINI_API_KEY=
OPENROUTER_API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_USE_TLS=true
SMTP_USE_SSL=false
EOF

echo "=== 6. Firewall — Allow ports 80, 443 ==="
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "=== 7. Start App ==="
docker compose -f docker-compose.prod.yml up --build -d

echo ""
echo "=== DONE ==="
echo "Check status: docker compose -f docker-compose.prod.yml ps"
echo "View logs: docker compose -f docker-compose.prod.yml logs -f"
echo "App: http://$(curl -s ifconfig.me)"
