#!/bin/bash

# Frontend and Backend Deployment Script
# Usage: ./deploy.sh

SERVER_USER="bgold6562"
SERVER_IP="34.134.30.14"
FRONTEND_DIR="/c/Users/bgold/se_project_react"
BACKEND_DIR="/c/Users/bgold/se_project_express"
SERVER_FRONTEND="/var/www/html"
SERVER_BACKEND="~/backend"

echo "🚀 Starting deployment..."

# Build frontend
echo "📦 Building frontend..."
cd "$FRONTEND_DIR" || exit
npm run build

# Deploy frontend
echo "📤 Deploying frontend..."
scp -r dist/* ${SERVER_USER}@${SERVER_IP}:${SERVER_FRONTEND}/

# Deploy backend
echo "📤 Deploying backend..."
# Create a temporary directory for backend files (excluding node_modules, .git, dist)
cd "$BACKEND_DIR" || exit
scp -r app.js package.json package-lock.json .env controllers/ errors/ middlewares/ models/ routes/ utils/ ${SERVER_USER}@${SERVER_IP}:${SERVER_BACKEND}/

echo "✅ Deployment complete!"
echo ""
echo "Next steps on server:"
echo "1. SSH into server: ssh ${SERVER_USER}@${SERVER_IP}"
echo "2. cd ~/backend"
echo "3. npm install --production"
echo "4. Update .env file with your MongoDB URI and JWT_SECRET"
echo "5. pm2 start app.js --name wtwr-backend"
echo "6. pm2 save"

