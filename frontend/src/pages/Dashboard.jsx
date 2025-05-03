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
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import InsightsChart from '../components/InsightsChart';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('✅ Goal saved.');
      onSetGoal(goal.targetAmount); // Set the goal in parent component
      // setGoalName('');
      // setTargetAmount('');
      // setTargetDate('');
      
    } catch (error) {
      console.error('❌ Error saving goal:', error);
    }
  };

  const fetchData = async () => {
    try {
      const [goalsRes] = await Promise.all([
        api.get('/api/savings-goals'),
      ]);

      const goals = goalsRes.data;
      if (goals.length > 0) {
        const latestGoal = goals[goals.length - 1]; 
        // or filter by userId if needed
        setTargetAmount(latestGoal.targetAmount);
        setGoalName(latestGoal.goalName)
        const formattedDate = new Date(latestGoal.targetDate).toISOString().split('T')[0];
        setTargetDate(formattedDate);
      }

      
      // setLoading(false); // stop loading when data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      // stop loading if error occurs
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Monthly Income"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Saving Amount"
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

function GoalProgress({ totalSpent, goal, monthlyIncome }) {
  const [budget, setBudget] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const income = Number(monthlyIncome);
    const computedBudget = income - goal;
    const computedProgress = goal > 0 ? Math.min((totalSpent / computedBudget) * 100, 100) : 0;

    setBudget(computedBudget);
    setProgress(computedProgress);
  }, [goal, monthlyIncome, totalSpent]);

  
  // useEffect(()=> {
  //   console.log('monthlyIncome',typeof Number(goal))
  // },[])
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Goal Progress
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
      <Typography variant="body1">
        Spent: ₹{totalSpent.toFixed(2)} / Total Budget: ₹{budget.toFixed(2)} ({progress.toFixed(0)}%)
      </Typography>
    </div>
  );
}

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [goal, setGoal] = useState(0);
  const [monthlyIncome, setMonthlyIncome] =useState ('')
  const [loading, setLoading] = useState(true); // for showing loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsRes, expenseRes] = await Promise.all([
          api.get('/api/savings-goals'),
          api.get('/api/expenses'),
        ]);
  
        const goals = goalsRes.data;
        if (goals.length > 0) {
          const latestGoal = goals[goals.length - 1]; 
          // or filter by userId if needed
          setGoal(latestGoal.targetAmount);
          setMonthlyIncome(latestGoal.goalName)
        }
  
        setExpenses(expenseRes.data || []);
        setLoading(false); // stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // stop loading if error occurs
      }
    };
  
    fetchData();
  }, []);

  const addExpense = async (expense) => {
    try {
      const response = await api.post('/api/expenses', expense);
      setExpenses((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  const handleEdit = async (updatedExpense) => {
    try {
      const response = await api.put(`/api/expenses/${updatedExpense.id}`, updatedExpense);
      const savedExpense = response.data;
  
      setExpenses(prevExpenses =>
        prevExpenses.map(exp =>
          exp.id === savedExpense.id ? savedExpense : exp
        )
      );
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };
  

  
  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('✅ Login Successfully');
  };

  if (loading) {
    return <LinearProgress sx={{ marginTop: '20px' }} />;
  }

  return (
    <>
      <AppBar position="static" color="warning">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BudgetBloom Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <SavingsGoalForm onSetGoal={setGoal} />
              <GoalProgress
                totalSpent={expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)}
                goal={goal}
                monthlyIncome={monthlyIncome}
              />
              <AddExpenseForm onAdd={addExpense} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <ExpenseList expenses={expenses} onDelete={handleDeleteExpense}  onEdit={handleEdit} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <InsightsChart expenses={expenses} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
