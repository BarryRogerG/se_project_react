#!/bin/bash

echo "Starting WTWR Application Servers..."
echo

echo "Starting Mock API Server (Port 3001)..."
npm run server &
API_PID=$!

echo "Waiting 3 seconds for API server to start..."
sleep 3

echo "Starting React Development Server (Port 3000)..."
npm run dev &
DEV_PID=$!

echo
echo "Both servers are starting..."
echo "- Mock API Server: http://localhost:3001"
echo "- React App: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers..."

# Wait for user to stop
wait
