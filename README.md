# Stock Price Dashboard

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS. Features real-time stock data, interactive charts, and comprehensive search and sorting capabilities.

## 🚀 Live Demo

[View Live Dashboard](https://stock-dashboard-flax-seven.vercel.app/)

## ✨ Features

### Core Requirements ✅
- **Stock Data Table**: Display stock symbol, current price, and percentage change
- **Tailwind CSS Styling**: Fully responsive design with modern UI components
- **API Integration**: Fetches real-time data from Finnhub API
- **Deployment Ready**: Configured for Vercel deployment

### Optional Features (Bonus) ✅
- **Loading States**: Beautiful spinner animations while fetching data
- **Interactive Charts**: Bar chart visualization using Chart.js
- **Search & Sort**: Real-time search and multi-column sorting
- **Error Handling**: Comprehensive error boundaries and fallback states
- **Auto-refresh**: Data updates every 30 seconds
- **Mock Data Fallback**: Demo data when API is unavailable
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Statistics Cards**: Summary of gainers, losers, and total stocks
- **View Toggle**: Switch between table and chart views
- **Professional UI**: Modern design with hover effects and transitions

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + React Chart.js 2
- **API**: Finnhub Stock API
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

The app is configured for easy deployment to Vercel:

1. **Deploy with Vercel CLI**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Or deploy via GitHub**
   - Push to GitHub repository
   - Connect repository to Vercel
   - Automatic deployments on push

## 🔧 Configuration

The app uses Finnhub's sandbox mode by default for demo purposes. For production use with real-time data:

1. Get a free API key from [Finnhub](https://finnhub.io/)
2. Update the `API_KEY` in `src/services/stockApi.ts`
3. Change the BASE_URL to use the production endpoint

## 📱 Features Overview

### Stock Table
- **Real-time Data**: Current price, change amount, and percentage
- **Search**: Filter stocks by symbol
- **Sorting**: Click column headers to sort by any field
- **Responsive**: Optimized for all screen sizes
- **Visual Indicators**: Color-coded gains/losses with trend icons

### Interactive Chart
- **Dual Axis**: Price and percentage change visualization
- **Color Coding**: Green for gains, red for losses
- **Responsive**: Adapts to container size
- **Tooltips**: Detailed information on hover

### Error Handling
- **API Failures**: Graceful fallback to demo data
- **Network Issues**: Retry mechanism with exponential backoff
- **Error Boundaries**: Prevents app crashes
- **User Feedback**: Clear error messages and recovery options

### Performance Optimizations
- **Memoization**: Optimized re-renders with useMemo
- **Debounced Search**: Smooth search experience
- **Lazy Loading**: Components loaded on demand
- **Caching**: Efficient data fetching and caching

## 🎨 Design Highlights

- **Modern UI**: Clean, professional interface
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Mode Ready**: Prepared for theme switching
- **Micro-interactions**: Smooth hover effects and transitions
- **Mobile-First**: Responsive design starting from mobile

## 📊 Stock Symbols

Default stocks tracked:
- AAPL (Apple)
- GOOGL (Google)
- MSFT (Microsoft)
- AMZN (Amazon)
- TSLA (Tesla)
- META (Meta)
- NVDA (NVIDIA)
- NFLX (Netflix)

## 🔄 Data Updates

- **Auto-refresh**: Every 30 seconds
- **Manual refresh**: Click refresh button
- **Last updated**: Timestamp display
- **Offline handling**: Cached data when offline

## 🚦 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


