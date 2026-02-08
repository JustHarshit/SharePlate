#!/bin/bash

# SharePlate Quick Deployment Script
# This script helps you quickly deploy SharePlate using Docker

set -e

echo "🍽️  SharePlate Deployment Setup"
echo "================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Prompt for environment variables
echo "📝 Setting up environment variables..."
echo ""

read -p "Enter MongoDB admin username (default: admin): " MONGO_USER
MONGO_USER=${MONGO_USER:-admin}

read -sp "Enter MongoDB admin password (default: changeme): " MONGO_PASS
MONGO_PASS=${MONGO_PASS:-changeme}
echo ""

read -p "Enter JWT secret (press Enter to generate random): " JWT_SECRET
if [ -z "$JWT_SECRET" ]; then
    JWT_SECRET=$(openssl rand -hex 64)
    echo "Generated JWT secret: $JWT_SECRET"
fi

read -p "Enter backend port (default: 5000): " BACKEND_PORT
BACKEND_PORT=${BACKEND_PORT:-5000}

read -p "Enter frontend port (default: 3000): " FRONTEND_PORT
FRONTEND_PORT=${FRONTEND_PORT:-3000}

echo ""
echo "🔧 Updating docker-compose.yml with your configuration..."

# Update docker-compose.yml with user inputs
sed -i.bak "s/MONGO_INITDB_ROOT_USERNAME: admin/MONGO_INITDB_ROOT_USERNAME: $MONGO_USER/" docker-compose.yml
sed -i.bak "s/MONGO_INITDB_ROOT_PASSWORD: changeme/MONGO_INITDB_ROOT_PASSWORD: $MONGO_PASS/" docker-compose.yml
sed -i.bak "s/MONGODB_URI: mongodb:\/\/admin:changeme/MONGODB_URI: mongodb:\/\/$MONGO_USER:$MONGO_PASS/" docker-compose.yml
sed -i.bak "s/JWT_SECRET: your-super-secret-jwt-key-change-this/JWT_SECRET: $JWT_SECRET/" docker-compose.yml
sed -i.bak "s/\"5000:5000\"/\"$BACKEND_PORT:5000\"/" docker-compose.yml
sed -i.bak "s/\"3000:80\"/\"$FRONTEND_PORT:80\"/" docker-compose.yml

# Remove backup files
rm -f docker-compose.yml.bak

echo "✅ Configuration updated"
echo ""

# Build and start containers
echo "🚀 Building and starting containers..."
echo "This may take a few minutes on first run..."
echo ""

docker-compose up -d --build

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:$FRONTEND_PORT"
echo "   Backend API: http://localhost:$BACKEND_PORT"
echo "   MongoDB: mongodb://localhost:27017"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop the application:"
echo "   docker-compose down"
echo ""
echo "🗑️  Stop and remove all data:"
echo "   docker-compose down -v"
echo ""
echo "Happy sharing! 🍽️"
