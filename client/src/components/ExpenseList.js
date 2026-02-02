import React from 'react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryClass = (category) => {
    return `category ${category.toLowerCase().replace(/\s+/g, '-')}`;
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="no-expenses">
        <h3>No expenses found</h3>
        <p>Start tracking your expenses by adding your first one!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{formatDate(expense.date)}</td>
              <td>
                <strong>{expense.description}</strong>
                {expense.notes && (
                  <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '4px' }}>
                    {expense.notes.length > 50 
                      ? `${expense.notes.substring(0, 50)}...` 
                      : expense.notes}
                  </div>
                )}
              </td>
              <td>
                <span className={getCategoryClass(expense.category)}>
                  {expense.category}
                </span>
              </td>
              <td className="amount">{formatCurrency(expense.amount)}</td>
              <td>
                <div className="expense-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(expense)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(expense._id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;

