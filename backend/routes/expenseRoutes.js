const express = require('express');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController'); // Add updateExpense here
const router = express.Router();

// Authentication middleware
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, addExpense);
router.get('/', authenticate, getExpenses);
router.delete('/:id', authenticate, deleteExpense);
router.put('/:id', authenticate, updateExpense); // Update the route to use updateExpense

module.exports = router;
