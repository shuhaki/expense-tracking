import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ categoryBreakdown, monthlyBreakdown }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Category Pie Chart Data
  const categoryPieData = {
    labels: categoryBreakdown.map(cat => cat._id),
    datasets: [
      {
        data: categoryBreakdown.map(cat => cat.total),
        backgroundColor: [
          '#ffeaa7',
          '#81ecec',
          '#dfe6e9',
          '#fab1a0',
          '#ff7675',
          '#74b9ff',
          '#a29bfe',
          '#55efc4',
          '#81ecec',
          '#ffeaa7',
          '#b2bec3',
          '#dcdde1',
          '#636e72'
        ],
        borderColor: [
          '#d68910',
          '#00a8ff',
          '#636e72',
          '#e17055',
          '#d63031',
          '#0984e3',
          '#6c5ce7',
          '#00b894',
          '#00cec9',
          '#fdcb6e',
          '#2d3436',
          '#636e72',
          '#636e72'
        ],
        borderWidth: 2
      }
    ]
  };

  const categoryPieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Monthly Bar Chart Data
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const sortedMonthlyBreakdown = [...monthlyBreakdown].sort((a, b) => {
    if (a._id.year !== b._id.year) return b._id.year - a._id.year;
    return b._id.month - a._id.month;
  }).reverse();

  const barData = {
    labels: sortedMonthlyBreakdown.map(
      item => `${monthNames[item._id.month - 1]} ${item._id.year}`
    ),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: sortedMonthlyBreakdown.map(item => item.total),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
        borderRadius: 5
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return null;
  }

  return (
    <div className="charts-section fade-in">
      {/* Category Pie Chart */}
      <div className="chart-card">
        <h3>📈 Spending by Category</h3>
        <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
          <Pie data={categoryPieData} options={categoryPieOptions} />
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="chart-card">
        <h3>📊 Monthly Expenses</h3>
        <div style={{ height: '300px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;

