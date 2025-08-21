import React, { useState, useEffect } from 'react';
import { StockData, stockApi } from './services/stockApi';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { BarChart3, Table, AlertCircle, TrendingUp } from 'lucide-react';

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStockData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const symbols = stockApi.getDefaultSymbols();
      
      // Try to fetch real data first, fallback to mock data if API fails
      try {
        const data = await stockApi.getMultipleStockQuotes(symbols);
        setStocks(data);
      } catch (apiError) {
        console.warn('API failed, using mock data:', apiError);
        // Use mock data as fallback for demo purposes
        const mockData = stockApi.generateMockData(symbols);
        setStocks(mockData);
        setError('Using demo data - API may be unavailable');
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to load stock data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchStockData();
  };

  if (isLoading && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading stock data..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Stock Dashboard</h1>
                  <p className="text-sm text-gray-500">
                    Real-time stock market data
                    {lastUpdated && (
                      <span className="ml-2">
                        • Updated {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('table')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    view === 'table'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Table className="w-4 h-4 mr-2" />
                  Table
                </button>
                <button
                  onClick={() => setView('chart')}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    view === 'chart'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Chart
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {view === 'table' ? (
              <StockTable 
                stocks={stocks} 
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            ) : (
              <StockChart stocks={stocks} />
            )}
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Gainers</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stocks.filter(s => s.changePercent > 0).length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Losers</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stocks.filter(s => s.changePercent < 0).length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Stocks</p>
                    <p className="text-lg font-semibold text-gray-900">{stocks.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>
                Built with React, TypeScript, and Tailwind CSS • 
                Data updates every 30 seconds • 
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  View Source
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
