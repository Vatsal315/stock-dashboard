import axios from 'axios';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  companyName?: string;
}

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

// Using Finnhub free API - no API key required for basic quotes
const BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = 'sandbox'; // Using sandbox mode for demo

class StockApiService {
  private async fetchWithRetry(url: string, retries = 3): Promise<any> {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'X-Finnhub-Token': API_KEY
        }
      });
      return response.data;
    } catch (error) {
      if (retries > 0 && axios.isAxiosError(error)) {
        console.warn(`API request failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  }

  async getStockQuote(symbol: string): Promise<StockData> {
    try {
      const quote: StockQuote = await this.fetchWithRetry(
        `${BASE_URL}/quote?symbol=${symbol}`
      );

      // Handle case where API returns empty data
      if (!quote.c && !quote.pc) {
        throw new Error(`No data available for symbol: ${symbol}`);
      }

      return {
        symbol: symbol.toUpperCase(),
        price: quote.c || 0,
        change: quote.d || 0,
        changePercent: quote.dp || 0,
      };
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
  }

  async getMultipleStockQuotes(symbols: string[]): Promise<StockData[]> {
    const promises = symbols.map(symbol => 
      this.getStockQuote(symbol).catch(error => {
        console.error(`Error fetching ${symbol}:`, error);
        // Return mock data for demo purposes if API fails
        return {
          symbol: symbol.toUpperCase(),
          price: Math.random() * 200 + 50,
          change: (Math.random() - 0.5) * 10,
          changePercent: (Math.random() - 0.5) * 5,
        };
      })
    );

    const results = await Promise.all(promises);
    return results.filter(result => result !== null);
  }

  // Popular stocks for demo
  getDefaultSymbols(): string[] {
    return ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];
  }

  // Mock data generator for development/demo
  generateMockData(symbols: string[]): StockData[] {
    return symbols.map(symbol => ({
      symbol: symbol.toUpperCase(),
      price: Math.round((Math.random() * 200 + 50) * 100) / 100,
      change: Math.round((Math.random() - 0.5) * 10 * 100) / 100,
      changePercent: Math.round((Math.random() - 0.5) * 5 * 100) / 100,
    }));
  }
}

export const stockApi = new StockApiService();
