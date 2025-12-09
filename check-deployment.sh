#!/bin/bash

echo "=== Checking Deployment Setup ==="
echo ""

echo "1. Checking PM2:"
if command -v pm2 &> /dev/null; then
    echo "   ✅ PM2 is installed"
    pm2 --version
    echo ""
    echo "   PM2 Processes:"
    pm2 list
else
    echo "   ❌ PM2 is NOT installed"
fi

echo ""
echo "2. Checking Node processes:"
ps aux | grep node | grep -v grep

echo ""
echo "3. Checking systemd services:"
systemctl list-units | grep -E "(node|react|express|wtwr)" || echo "   No systemd services found"

echo ""
echo "4. Checking if ports are in use:"
netstat -tulpn | grep -E ":(3000|3001|80|443)" || ss -tulpn | grep -E ":(3000|3001|80|443)"

echo ""
echo "5. Checking PM2 directory:"
if [ -d ~/.pm2 ]; then
    echo "   ✅ PM2 directory exists"
    ls -la ~/.pm2
else
    echo "   ❌ PM2 directory does not exist"
fi

