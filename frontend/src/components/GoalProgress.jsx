import React from 'react';
import { FaRegSmile, FaDollarSign } from 'react-icons/fa'; // Importing icons from react-icons

function GoalProgress({ totalSpent, goal }) {
  const progress = goal ? Math.min((totalSpent / goal) * 100, 100) : 0;

  return (
    <div style={{ textAlign: 'center', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <p><strong>Goal:</strong> ₹{goal.toFixed(2)}</p>
      <p><strong>Spent:</strong> ₹{totalSpent.toFixed(2)}</p>
      
      <div style={{ background: '#eee', height: '20px', width: '100%', borderRadius: '5px', marginBottom: '10px' }}>
        <div
          style={{
            width: `${progress}%`,
            background: 'green',
            height: '100%',
            borderRadius: '5px',
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>
      
      <p>{progress.toFixed(1)}% of your goal reached</p>
      
      {/* Display an icon based on the progress */}
      <div>
        {progress === 100 ? (
          <FaRegSmile style={{ color: 'green', fontSize: '30px' }} />
        ) : (
          <FaDollarSign style={{ color: 'gold', fontSize: '30px' }} />
        )}
      </div>
    </div>
  );
}

export default GoalProgress;
