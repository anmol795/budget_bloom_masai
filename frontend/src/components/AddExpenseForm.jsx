import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { FaMoneyBillAlt, FaCalendarAlt, FaTags } from 'react-icons/fa'; // Import icons

function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ amount: '', category: '', description: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Add Expense</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <FaMoneyBillAlt style={{ marginRight: 8 }} />, // Amount icon
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <FaTags style={{ marginRight: 8 }} />, // Category icon
            }}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description (optional)"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: <FaTags style={{ marginRight: 8 }} />, // Description icon
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <FaCalendarAlt style={{ marginRight: 8 }} />, // Calendar icon
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Expense
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddExpenseForm;
