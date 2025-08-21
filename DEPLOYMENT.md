# Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. In the project directory, run:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Login to your Vercel account
   - Choose project settings (defaults are fine)
   - Deploy!

### Method 2: GitHub Integration

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Stock Dashboard"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a React app and deploy

### Method 3: Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `build` folder to deploy

## Environment Variables (Optional)

If you want to use a real Finnhub API key:

1. Get a free API key from [Finnhub](https://finnhub.io/)
2. In Vercel dashboard, go to your project settings
3. Add environment variable:
   - Name: `REACT_APP_FINNHUB_API_KEY`
   - Value: Your API key
4. Update `src/services/stockApi.ts` to use the environment variable

## Build Commands

- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

## Custom Domain (Optional)

After deployment, you can add a custom domain in your Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

## Performance Tips

The app is already optimized with:
- Code splitting
- Asset optimization
- Gzip compression
- CDN delivery via Vercel

Your deployment URL will be provided after successful deployment!
