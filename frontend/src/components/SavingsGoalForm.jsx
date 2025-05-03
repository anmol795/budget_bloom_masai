import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  TextField,
  LinearProgress,
} from '@mui/material';
import api from '../services/api';
 function SavingsGoalForm({ onSetGoal }) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goal = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      targetDate,
      currentAmount: 0 // default if not input by user
    };
  
    try {
      const response = await api.post('/api/savings-goals', goal);
      console.log('✅ Goal saved:', response.data);
      onSetGoal(goal.targetAmount); // Set the goal in parent component
      setGoalName('');
      setTargetAmount('');
      setTargetDate('');
    } catch (error) {
      console.error('❌ Error saving goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Target Amount"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Target Date"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Set Savings Goal
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}



export default SavingsGoalForm;
