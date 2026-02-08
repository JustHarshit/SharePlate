# SharePlate Deployment Guide

This guide provides comprehensive instructions for deploying the SharePlate application to various platforms and environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
  - [Vercel (Frontend)](#vercel-frontend)
  - [Netlify (Frontend)](#netlify-frontend)
  - [Render (Full Stack)](#render-full-stack)
  - [Railway (Full Stack)](#railway-full-stack)
  - [Heroku (Full Stack)](#heroku-full-stack)
  - [AWS (Full Stack)](#aws-full-stack)
- [Docker Deployment](#docker-deployment)
- [Mobile Deployment](#mobile-deployment)
- [Database Deployment](#database-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud instance like MongoDB Atlas)
- **Git** installed
- Account on your chosen hosting platform

---

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shareplate?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS (if needed for specific domains)
# ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=https://your-backend-url.com

# For local development
# REACT_APP_API_URL=http://localhost:5000
```

---

## Local Development

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JustHarshit/SharePlate.git
   cd SharePlate
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies (if any)
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables:**
   - Create `.env` files as described in the Environment Setup section

4. **Start the backend:**
   ```bash
   cd backend
   npm start
   # Backend will run on http://localhost:5000
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm start
   # Frontend will run on http://localhost:3000
   ```

---

## Production Deployment

### Vercel (Frontend)

Vercel is ideal for deploying the React frontend.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow the prompts:**
   - Link to your Vercel account
   - Configure project settings
   - Set environment variables in Vercel dashboard

4. **Environment Variables in Vercel:**
   - Go to your project settings on Vercel dashboard
   - Add `REACT_APP_API_URL` with your backend URL

5. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

#### Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Select the `frontend` directory as root
4. Configure environment variables
5. Deploy!

---

### Netlify (Frontend)

Another excellent option for React frontend deployment.

#### Steps:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Or use Netlify Dashboard:**
   - Go to [Netlify](https://www.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/build`
   - Add environment variable: `REACT_APP_API_URL`

---

### Render (Full Stack)

Render supports both frontend and backend deployment.

#### Backend Deployment on Render:

1. **Sign up at [Render](https://render.com)**

2. **Create a new Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `shareplate-backend`
     - Region: Choose closest to your users
     - Branch: `main` (or your production branch)
     - Root Directory: `backend`
     - Runtime: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `PORT`: 5000 (Render will override with their port)
   - `NODE_ENV`: production

4. **Deploy:**
   - Click "Create Web Service"
   - Note the URL (e.g., `https://shareplate-backend.onrender.com`)

#### Frontend Deployment on Render:

1. **Create a new Static Site:**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - Name: `shareplate-frontend`
     - Branch: `main`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Publish Directory: `build`

2. **Add Environment Variables:**
   - `REACT_APP_API_URL`: Your backend URL from above

3. **Deploy!**

---

### Railway (Full Stack)

Railway provides easy deployment for full-stack applications.

#### Steps:

1. **Sign up at [Railway](https://railway.app)**

2. **Deploy Backend:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js
   - Configure:
     - Root Directory: `backend`
     - Start Command: `npm start`
   - Add environment variables in Settings → Variables
   - Deploy and note the backend URL

3. **Deploy Frontend:**
   - Add a new service to the same project
   - Select the same repository
   - Configure:
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Start Command: `npx serve -s build`
   - Add environment variable: `REACT_APP_API_URL`

4. **Add MongoDB:**
   - In your project, click "New" → "Database" → "Add MongoDB"
   - Copy the connection string
   - Update `MONGODB_URI` in backend environment variables

---

### Heroku (Full Stack)

#### Backend Deployment:

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a Heroku app for backend:**
   ```bash
   heroku create shareplate-backend
   ```

4. **Add MongoDB:**
   ```bash
   heroku addons:create mongolab:sandbox
   # Or use MongoDB Atlas and set MONGODB_URI manually
   ```

5. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   # MONGODB_URI is set automatically if using mongolab addon
   ```

6. **Create a `Procfile` in backend directory:**
   ```
   web: node server.js
   ```

7. **Deploy:**
   ```bash
   cd backend
   git init
   heroku git:remote -a shareplate-backend
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

#### Frontend Deployment:

Deploy to Vercel or Netlify (easier) or create another Heroku app with a buildpack for React.

---

### AWS (Full Stack)

For AWS deployment, you have several options:

#### Option 1: AWS Elastic Beanstalk

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB:**
   ```bash
   cd backend
   eb init
   ```

3. **Create environment:**
   ```bash
   eb create shareplate-backend-env
   ```

4. **Deploy:**
   ```bash
   eb deploy
   ```

#### Option 2: AWS EC2 (Manual Setup)

1. **Launch an EC2 instance** (Ubuntu recommended)

2. **SSH into your instance:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js and npm:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2 (process manager):**
   ```bash
   sudo npm install -g pm2
   ```

5. **Clone and setup your application:**
   ```bash
   git clone https://github.com/JustHarshit/SharePlate.git
   cd SharePlate/backend
   npm install
   ```

6. **Create .env file** with production variables

7. **Start with PM2:**
   ```bash
   pm2 start server.js --name shareplate-backend
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx as reverse proxy** (optional but recommended)

9. **For frontend:** Build and serve with Nginx or use S3 + CloudFront

---

## Docker Deployment

### Using Docker and Docker Compose

1. **Create `Dockerfile` in backend directory** (already provided in repository)

2. **Create `Dockerfile` in frontend directory** (already provided in repository)

3. **Use docker-compose.yml** (already provided in repository root)

4. **Build and run:**
   ```bash
   docker-compose up -d
   ```

5. **Access:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

6. **For production, push to Docker Hub and deploy to:**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

---

## Mobile Deployment

The project includes Capacitor for mobile deployment.

### Android Deployment

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   npm run cap:sync
   ```

3. **Open in Android Studio:**
   ```bash
   npm run android
   ```

4. **In Android Studio:**
   - Update app signing configuration
   - Build → Generate Signed Bundle/APK
   - Choose release variant
   - Follow the wizard to sign your app

5. **Upload to Google Play Console:**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create a new app
   - Upload your signed APK/AAB
   - Fill in store listing details
   - Submit for review

### iOS Deployment

1. **Ensure you have:**
   - macOS with Xcode installed
   - Apple Developer account ($99/year)

2. **Build and sync:**
   ```bash
   cd frontend
   npm run build
   npm run cap:sync
   ```

3. **Open in Xcode:**
   ```bash
   npm run ios
   ```

4. **In Xcode:**
   - Select your team in Signing & Capabilities
   - Configure app icons and launch screens
   - Archive the app: Product → Archive
   - Distribute to App Store

5. **Upload to App Store Connect:**
   - Use Xcode Organizer
   - Validate and upload
   - Configure app metadata in App Store Connect
   - Submit for review

---

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create a new cluster:**
   - Choose free tier (M0) for development
   - Select region closest to your application server

3. **Create database user:**
   - Database Access → Add New Database User
   - Choose username/password authentication
   - Save credentials securely

4. **Whitelist IP addresses:**
   - Network Access → Add IP Address
   - For development: Add 0.0.0.0/0 (allow from anywhere)
   - For production: Add specific IP addresses of your servers

5. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `shareplate`)

6. **Update environment variable:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shareplate?retryWrites=true&w=majority
   ```

### Self-Hosted MongoDB

For self-hosting MongoDB on a server:

1. **Install MongoDB:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install -y mongodb
   
   # Start service
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

2. **Configure MongoDB:**
   - Edit `/etc/mongodb.conf`
   - Set bind IP and enable authentication

3. **Create database and user:**
   ```bash
   mongo
   use shareplate
   db.createUser({
     user: "shareplate_user",
     pwd: "secure_password",
     roles: [{role: "readWrite", db: "shareplate"}]
   })
   ```

4. **Update connection string:**
   ```env
   MONGODB_URI=mongodb://shareplate_user:secure_password@localhost:27017/shareplate
   ```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. CORS Errors

**Problem:** Frontend can't connect to backend due to CORS policy.

**Solution:**
- Ensure backend CORS configuration includes your frontend URL
- Update `backend/server.js` CORS settings:
  ```javascript
  const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };
  app.use(cors(corsOptions));
  ```

#### 2. MongoDB Connection Failed

**Problem:** Backend can't connect to MongoDB.

**Solution:**
- Verify `MONGODB_URI` is correct
- Check network access settings in MongoDB Atlas
- Ensure IP addresses are whitelisted
- Verify database user credentials

#### 3. Environment Variables Not Loading

**Problem:** App can't read environment variables.

**Solution:**
- Ensure `.env` file exists in correct directory
- Verify `dotenv` package is installed: `npm install dotenv`
- In React apps, ensure variables start with `REACT_APP_`
- Restart development server after changing .env

#### 4. Build Failures

**Problem:** `npm run build` fails.

**Solution:**
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Reinstall: `npm install`
- Check Node.js version compatibility

#### 5. Port Already in Use

**Problem:** "Port 5000 is already in use"

**Solution:**
```bash
# Find process using the port
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

#### 6. Module Not Found Errors

**Problem:** Import errors or module not found.

**Solution:**
- Ensure all dependencies are installed: `npm install`
- Check `package.json` for missing dependencies
- Verify import paths are correct
- For TypeScript: Check `tsconfig.json` paths

#### 7. Mobile Build Issues

**Problem:** Capacitor sync or build fails.

**Solution:**
```bash
# Clear Capacitor cache
npx cap sync --force

# Rebuild
cd frontend
npm run build
npx cap sync

# For Android
cd android
./gradlew clean

# For iOS
cd ios/App
pod install
```

#### 8. JWT Authentication Errors

**Problem:** Token validation fails or users can't authenticate.

**Solution:**
- Verify `JWT_SECRET` matches between deployment and local
- Check token expiration settings
- Ensure tokens are being sent in Authorization header
- Clear browser cookies/local storage

### Getting Help

If you encounter issues not covered here:

1. Check existing [GitHub Issues](https://github.com/JustHarshit/SharePlate/issues)
2. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Error messages/logs
   - Environment details (OS, Node version, etc.)
3. Contact: 
   - laxman.chauhan223344@gmail.com
   - hpal52787@gmail.com

---

## Security Best Practices

Before deploying to production:

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT secrets** - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
3. **Enable HTTPS** - Use SSL certificates (free with Let's Encrypt)
4. **Sanitize user inputs** - Prevent injection attacks
5. **Rate limiting** - Prevent abuse
6. **Regular updates** - Keep dependencies updated
7. **Database backups** - Regular automated backups
8. **Environment-specific configs** - Different settings for dev/staging/prod
9. **Error handling** - Don't expose stack traces in production
10. **Monitoring** - Set up logging and monitoring (e.g., Sentry, LogRocket)

---

## Monitoring and Maintenance

### Recommended Tools

- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry, Rollbar
- **Performance:** New Relic, DataDog
- **Logs:** Loggly, Papertrail
- **Analytics:** Google Analytics, Mixpanel

### Regular Maintenance

- Monitor error rates and response times
- Review and rotate secrets periodically
- Keep dependencies updated: `npm outdated`
- Monitor database performance and storage
- Review and optimize API endpoints
- Backup database regularly
- Test disaster recovery procedures

---

## Conclusion

This guide covers the most common deployment scenarios for SharePlate. Choose the deployment method that best fits your needs, budget, and technical expertise.

For quick prototyping: **Vercel + Render + MongoDB Atlas**  
For production at scale: **AWS + MongoDB Atlas**  
For containerized deployments: **Docker + Kubernetes**

Good luck with your deployment! 🚀
