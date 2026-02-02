import React from 'react';

const ExpenseSummary = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatMonth = (monthData) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[monthData._id.month - 1]} ${monthData._id.year}`;
  };

  if (!summary) return null;

  return (
    <div className="stats-grid fade-in">
      {/* Total Expenses Card */}
      <div className="stat-card expense">
        <h3>💸 Total Expenses</h3>
        <div className="amount">{formatCurrency(summary.totalExpenses)}</div>
      </div>

      {/* Category Breakdown Card */}
      <div className="stat-card">
        <h3>📁 Top Category</h3>
        <div className="amount" style={{ fontSize: '1.5rem' }}>
          {summary.categoryBreakdown.length > 0 ? (
            <>
              <span style={{ fontSize: '1rem', color: '#7f8c8d' }}>
                {summary.categoryBreakdown[0]._id}
              </span>
              <br />
              {formatCurrency(summary.categoryBreakdown[0].total)}
            </>
          ) : (
            '-'
          )}
        </div>
      </div>

      {/* Monthly Average Card */}
      <div className="stat-card">
        <h3>📅 This Month</h3>
        <div className="amount" style={{ fontSize: '1.5rem' }}>
          {summary.monthlyBreakdown.length > 0 ? (
            <>
              <span style={{ fontSize: '1rem', color: '#7f8c8d' }}>
                {formatMonth(summary.monthlyBreakdown[0])}
              </span>
              <br />
              {formatCurrency(summary.monthlyBreakdown[0].total)}
            </>
          ) : (
            '-'
          )}
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div className="stat-card">
        <h3>🛒 Recent</h3>
        <div className="amount" style={{ fontSize: '1.5rem' }}>
          {summary.recentExpenses.length > 0 ? (
            <>
              <span style={{ fontSize: '1rem', color: '#7f8c8d' }}>
                {summary.recentExpenses.length} transactions
              </span>
              <br />
              Latest: {summary.recentExpenses[0].description.substring(0, 20)}...
            </>
          ) : (
            'No recent transactions'
          )}
        </div>
      </div>

      {/* Category Summary Table */}
      {summary.categoryBreakdown.length > 0 && (
        <div className="stat-card" style={{ gridColumn: 'span 4' }}>
          <h3>📊 Spending by Category</h3>
          <div style={{ marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ecf0f1' }}>Category</th>
                  <th style={{ textAlign: 'right', padding: '8px', borderBottom: '2px solid #ecf0f1' }}>Amount</th>
                  <th style={{ textAlign: 'right', padding: '8px', borderBottom: '2px solid #ecf0f1' }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {summary.categoryBreakdown.map((cat) => {
                  const percentage = ((cat.total / summary.totalExpenses) * 100).toFixed(1);
                  return (
                    <tr key={cat._id}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ecf0f1' }}>
                        {cat._id} ({cat.count})
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ecf0f1', textAlign: 'right', fontWeight: '600' }}>
                        {formatCurrency(cat.total)}
                      </td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ecf0f1', textAlign: 'right' }}>
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;

