
import React, { useState } from 'react';
import { FaUtensils, FaCar, FaFilm, FaShoppingBag, FaHeartbeat, FaEllipsisH } from 'react-icons/fa';

const categoryIcons = {
  Food: <FaUtensils color="#f44336" />,
  Transport: <FaCar color="#2196f3" />,
  Entertainment: <FaFilm color="#9c27b0" />,
  Shopping: <FaShoppingBag color="#ff9800" />,
  Health: <FaHeartbeat color="#4caf50" />,
  Other: <FaEllipsisH color="#607d8b" />,
};

function ExpenseList({ expenses, onDelete, onEdit }) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedDate, setEditedDate] = useState('');

  const now = new Date();

  const filteredExpenses = expenses.filter(expense => {
    const inCategory = categoryFilter === 'All' || expense.category === categoryFilter;

    const expenseDate = new Date(expense.date);
    const inDateRange =
      dateRange === 'All' ||
      (dateRange === 'Last 7 Days' && expenseDate >= new Date(now.setDate(now.getDate() - 7))) ||
      (dateRange === 'This Month' && expenseDate.getMonth() === new Date().getMonth());

    return inCategory && inDateRange;
  });

  const sortedExpenses = filteredExpenses.sort((a, b) => {
    if (sortOrder === 'Newest') return new Date(b.date) - new Date(a.date);
    if (sortOrder === 'Highest amount') return b.amount - a.amount;
    return 0;
  });

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setEditedDescription(expense.description);
    setEditedAmount(expense.amount);
    setEditedCategory(expense.category);
    setEditedDate(new Date(expense.date).toISOString().split('T')[0]); // Set date to YYYY-MM-DD format
  };

  const handleUpdate = () => {
    if (editingExpense) {
      onEdit({ 
        ...editingExpense, 
        description: editedDescription, 
        amount: editedAmount, 
        category: editedCategory, 
        date: editedDate 
      });
      setEditingExpense(null);
      setEditedDescription('');
      setEditedAmount('');
      setEditedCategory('');
      setEditedDate('');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          {['All', 'Last 7 Days', 'This Month'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="Newest">Newest</option>
          <option value="Highest amount">Highest amount</option>
        </select>
      </div>

      {sortedExpenses.map((expense) => (
        <div key={expense.id} style={{
          background: '#fff',
          padding: '10px 15px',
          marginBottom: '12px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 12 }}>{categoryIcons[expense.category] || categoryIcons.Other}</div>
            <div>
              <strong>{expense.category}</strong><br />
              <span style={{ fontSize: 14, color: '#555' }}>{expense.description || 'No description'}</span><br />
              <small>{new Date(expense.date).toLocaleDateString()}</small>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: '#1976d2' }}>₹{parseFloat(expense.amount).toFixed(2)}</div>
            <button
              onClick={() => handleEditClick(expense)}
              style={{
                marginTop: 8,
                padding: '4px 10px',
                backgroundColor: '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                marginRight: '8px'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(expense.id)}
              style={{
                marginTop: 8,
                padding: '4px 10px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingExpense && (
        <div style={{
          background: '#f9f9f9',
          padding: '10px 15px',
          marginBottom: '12px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <h4>Edit Expense</h4>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
            style={{ marginRight: '8px', padding: '5px', width: 'calc(40% - 16px)' }}
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            placeholder="Amount"
            style={{ marginRight: '8px', padding: '5px', width: 'calc(30% - 16px)' }}
          />
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            style={{ marginRight: '8px', padding: '5px', width: 'calc(20% - 16px)' }}
          >
            {['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            style={{ marginRight: '8px', padding: '5px', width: 'calc(20% - 16px)' }}
          />
          <button
            onClick={handleUpdate}
            style={{
              padding: '5px 10px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update
          </button>
          <button
            onClick={() => setEditingExpense(null)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#607d8b',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;