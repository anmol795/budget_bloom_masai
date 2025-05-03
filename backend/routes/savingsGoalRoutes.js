const express = require('express');
const {
  addSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal
} = require('../controllers/savingsGoalController'); // Adjust the path as necessary
const { authenticate } = require('../middleware/auth'); // Assuming you have an authentication middleware

const router = express.Router();

// Route to add a new savings goal
router.post('/', authenticate, addSavingsGoal);

// Route to get all savings goals for a user
router.get('/', authenticate, getSavingsGoals);

// Route to update a savings goal by ID
router.put('/:id', authenticate, updateSavingsGoal);

// Route to delete a savings goal by ID
router.delete('/:id', authenticate, deleteSavingsGoal);

module.exports = router;
