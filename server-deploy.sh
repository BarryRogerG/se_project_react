#!/bin/bash

# Server-side deployment script
# Run this script on the server after uploading files
# Usage: bash server-deploy.sh

set -e  # Exit on error

echo "🚀 Starting server deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Deploy Frontend
echo -e "${YELLOW}📤 Deploying frontend to /var/www/html/...${NC}"
if [ -d ~/frontend-temp ]; then
    sudo rm -rf /var/www/html/*
    sudo cp -r ~/frontend-temp/* /var/www/html/
    sudo chown -R www-data:www-data /var/www/html/
    sudo chmod -R 755 /var/www/html/
    rm -rf ~/frontend-temp
    echo -e "${GREEN}✅ Frontend deployed successfully${NC}"
else
    echo -e "${RED}❌ Frontend temp directory not found. Make sure you uploaded files to ~/frontend-temp/${NC}"
fi

# 2. Setup Backend
echo -e "${YELLOW}📦 Setting up backend...${NC}"
if [ -d ~/backend ]; then
    cd ~/backend
    
    # Check if .env exists
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠️  .env file not found. Creating template...${NC}"
        cat > .env << EOF
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
JWT_SECRET=your-secret-key-here-change-this
NODE_ENV=production
EOF
        echo -e "${YELLOW}⚠️  Please edit .env file with: nano .env${NC}"
    fi
    
    # Install dependencies
    echo -e "${YELLOW}📥 Installing backend dependencies...${NC}"
    npm install --production
    
    # Install PM2 if not installed
    if ! command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}📥 Installing PM2...${NC}"
        npm install -g pm2
    fi
    
    # Stop existing PM2 process if running
    if pm2 list | grep -q "wtwr-backend"; then
        echo -e "${YELLOW}🛑 Stopping existing wtwr-backend process...${NC}"
        pm2 stop wtwr-backend
        pm2 delete wtwr-backend
    fi
    
    # Start backend with PM2
    echo -e "${YELLOW}▶️  Starting backend with PM2...${NC}"
    pm2 start app.js --name wtwr-backend
    
    # Save PM2 configuration
    pm2 save
    
    echo -e "${GREEN}✅ Backend deployed and started successfully${NC}"
    
    # Show PM2 status
    echo -e "${YELLOW}📊 PM2 Status:${NC}"
    pm2 status
    
    echo ""
    echo -e "${YELLOW}⚠️  Important: Run 'pm2 startup' to enable auto-start on reboot${NC}"
    echo -e "${YELLOW}   Then follow the instructions it provides.${NC}"
    
else
    echo -e "${RED}❌ Backend directory not found. Make sure you uploaded files to ~/backend/${NC}"
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Check backend logs: pm2 logs wtwr-backend"
echo "2. Check frontend: Visit http://34.134.30.14"
echo "3. Check backend API: Visit http://34.134.30.14:3001"
echo "4. Setup PM2 startup: pm2 startup (then follow instructions)"

