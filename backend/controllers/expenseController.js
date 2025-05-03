const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !description || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const expense = await Expense.create({
      amount,
      category,
      description,
      date,
      userId: req.user.id, // user injected from auth middleware
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Error adding expense' });
  }
};

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {

  console.log("req.user.id"+req.user.id);
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']], // Optional: Sort by most recent first
    });


    console.log("expenses"+expenses)
    res.json(expenses);
  } catch (error) {
    console.error('Fetch expenses error:', error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the expense by id and userId to ensure ownership
    const expense = await Expense.findOne({ 
      where: { 
        id: id, // Use 'id' instead of '_id' for Sequelize
        userId: req.user.id 
      } 
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Use destroy method to delete the expense
    await expense.destroy();

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Error deleting expense' });
  }
};


// Update an existing expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !description || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Ensure the expense belongs to the current user
    const expense = await Expense.findOne({
      where: {
        id: id,
        userId: req.user.id
      }
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update the fields
    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    expense.date = date;

    await expense.save();

    res.json(expense);
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Error updating expense' });
  }
};
