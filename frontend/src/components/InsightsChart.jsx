import React from 'react';
import { FaApple, FaCar, FaTheaterMasks, FaShoppingBag, FaHeart, FaCog } from 'react-icons/fa'; // Import category icons

function InsightsChart({ expenses }) {
  const categories = [
    { name: 'Food', icon: <FaApple />, color: '#ff5722' },
    { name: 'Transport', icon: <FaCar />, color: '#4caf50' },
    { name: 'Entertainment', icon: <FaTheaterMasks />, color: '#2196f3' },
    { name: 'Shopping', icon: <FaShoppingBag />, color: '#9c27b0' },
    { name: 'Health', icon: <FaHeart />, color: '#e91e63' },
    { name: 'Other', icon: <FaCog />, color: '#607d8b' }
  ];

  const data = categories.map(cat => {
    const total = expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return { ...cat, total };
  });

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '0 auto',
    }}>
      <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#333' }}>Spending by Category</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map(d => (
          <li key={d.name} style={{
            padding: '8px 0',
            borderBottom: '1px solid #e0e0e0',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ marginRight: '10px', color: d.color }}>
              {d.icon}
            </div>
            <div style={{ flexGrow: 1 }}>{d.name}</div>
            <span style={{ color: d.color }}>₹{d.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InsightsChart;
