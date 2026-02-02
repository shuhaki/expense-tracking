import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount || '',
        description: initialData.description || '',
        category: initialData.category || 'Food',
        date: initialData.date 
          ? new Date(initialData.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const { amount, description, category, date, notes } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(amount)
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Food',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Dining Out',
    'Subscriptions',
    'Insurance',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h2>{initialData ? '✏️ Edit Expense' : '➕ Add Expense'}</h2>
        <button type="button" className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={onChange}
          placeholder="Enter amount"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="What was this expense for?"
          maxLength="200"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={onChange}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={onChange}
          placeholder="Add any additional notes..."
          maxLength="500"
          rows="3"
        />
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initialData ? 'Update' : 'Add Expense')}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;

