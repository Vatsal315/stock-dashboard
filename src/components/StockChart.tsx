import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StockData } from '../services/stockApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  stocks: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ stocks }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Performance',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label === 'Price') {
              return `${label}: $${value.toFixed(2)}`;
            } else {
              return `${label}: ${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: stocks.map(stock => stock.symbol),
    datasets: [
      {
        label: 'Price ($)',
        data: stocks.map(stock => stock.price),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Change (%)',
        data: stocks.map(stock => stock.changePercent),
        backgroundColor: stocks.map(stock => 
          stock.changePercent >= 0 
            ? 'rgba(34, 197, 94, 0.5)' 
            : 'rgba(239, 68, 68, 0.5)'
        ),
        borderColor: stocks.map(stock => 
          stock.changePercent >= 0 
            ? 'rgba(34, 197, 94, 1)' 
            : 'rgba(239, 68, 68, 1)'
        ),
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  if (stocks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center text-gray-500">
          No data available for chart visualization.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockChart;
