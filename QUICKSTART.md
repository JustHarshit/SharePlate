# SharePlate Quick Start Guide

This guide will help you get SharePlate up and running in minutes!

## 🚀 Three Ways to Deploy

### 1. Docker (Recommended - Easiest)

**Prerequisites:** Docker and Docker Compose installed

```bash
# Clone the repository
git clone https://github.com/JustHarshit/SharePlate.git
cd SharePlate

# Run the deployment script
./deploy.sh

# Or use docker-compose directly
docker-compose up -d
```

Access your app:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 2. Local Development

**Prerequisites:** Node.js 14+ and MongoDB

```bash
# Clone the repository
git clone https://github.com/JustHarshit/SharePlate.git
cd SharePlate

# Setup Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm start

# In a new terminal, setup Frontend
cd frontend
cp .env.example .env
# Edit .env with backend URL (default: http://localhost:5000)
npm install
npm start
```

### 3. Cloud Deployment (Production)

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Options:**
- **Frontend:** Deploy to Vercel or Netlify (5 minutes)
- **Backend:** Deploy to Render or Railway (10 minutes)
- **Database:** Use MongoDB Atlas (free tier available)

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] Create a MongoDB Atlas account or set up MongoDB
- [ ] Generate a secure JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Update environment variables (see `.env.example` files)
- [ ] Test locally first
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure domain names (if applicable)

## 🔒 Security Notes

- Never commit `.env` files to Git
- Use strong, unique JWT secrets in production
- Enable HTTPS for production deployments
- Whitelist only necessary IP addresses in MongoDB
- Regularly update dependencies

## 📱 Mobile App Deployment

For Android/iOS deployment:

```bash
cd frontend
npm run build
npm run cap:sync

# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

See [DEPLOYMENT.md - Mobile Deployment](DEPLOYMENT.md#mobile-deployment) for complete instructions.

## 🆘 Need Help?

- **Documentation:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues:** [GitHub Issues](https://github.com/JustHarshit/SharePlate/issues)
- **Email:** 
  - laxman.chauhan223344@gmail.com
  - hpal52787@gmail.com

## 🎯 Next Steps

1. **Customize:** Update branding, colors, and content
2. **Configure:** Set up email services, payment gateways, etc.
3. **Monitor:** Set up error tracking and analytics
4. **Scale:** Optimize for performance and scalability
5. **Maintain:** Keep dependencies updated

Happy deploying! 🍽️
