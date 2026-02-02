import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import ExpenseChart from './ExpenseChart';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
    sort: 'newest'
  });

  const fetchExpenses = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.category) params.append('category', filters.category);
      if (filters.sort) params.append('sort', filters.sort);

      const res = await axios.get(`/api/expenses?${params.toString()}`);
      setExpenses(res.data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [filters]);

  const fetchSummary = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const res = await axios.get(`/api/expenses/summary?${params.toString()}`);
      setSummary(res.data.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  }, [filters]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchExpenses(), fetchSummary()]);
      setLoading(false);
    };
    loadData();
  }, [fetchExpenses, fetchSummary]);

  const handleAddExpense = async (formData) => {
    try {
      await axios.post('/api/expenses', formData);
      await Promise.all([fetchExpenses(), fetchSummary()]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleUpdateExpense = async (formData) => {
    try {
      await axios.put(`/api/expenses/${editingExpense._id}`, formData);
      await Promise.all([fetchExpenses(), fetchSummary()]);
      setShowModal(false);
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await axios.delete(`/api/expenses/${id}`);
      await Promise.all([fetchExpenses(), fetchSummary()]);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExpense(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your expenses...</p>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      {summary && <ExpenseSummary summary={summary} />}

      {/* Charts */}
      {summary && (
        <ExpenseChart 
          categoryBreakdown={summary.categoryBreakdown}
          monthlyBreakdown={summary.monthlyBreakdown}
        />
      )}

      {/* Filters */}
      <div className="expense-list-container">
        <div className="expense-list-header">
          <h2>💵 Recent Expenses</h2>
          <div className="filter-controls">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
            />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
        </div>

        <ExpenseList 
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
        />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ExpenseForm 
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              onClose={handleCloseModal}
              initialData={editingExpense}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

