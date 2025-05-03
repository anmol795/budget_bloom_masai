const SavingsGoal = require('../models/SavingsGoal');

// Add a new savings goal
exports.addSavingsGoal = async (req, res) => {
  const { targetAmount, currentAmount, goalName, targetDate } = req.body;
  try {
    const savingsGoal = await SavingsGoal.create({
      targetAmount,
      currentAmount,
      goalName,
      targetDate,
      userId: req.user.id, // Attach the logged-in user's ID
    });
    res.status(201).json(savingsGoal);
  } catch (error) {
    console.error('Error adding savings goal:', error); // Log the error details
    res.status(500).json({ message: 'Error adding savings goal' });
  }
};

// Get all savings goals for a user
exports.getSavingsGoals = async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.findAll({ where: { userId: req.user.id } });
    res.json(savingsGoals);
  } catch (error) {
    console.error('Error fetching savings goals:', error); // Log the error details
    res.status(500).json({ message: 'Error fetching savings goals' });
  }
};

// Update a savings goal
exports.updateSavingsGoal = async (req, res) => {
  const { id } = req.params;
  const { targetAmount, currentAmount, goalName, targetDate } = req.body;
  try {
    const savingsGoal = await SavingsGoal.findByPk(id);
    if (!savingsGoal) return res.status(404).json({ message: 'Savings goal not found' });

    savingsGoal.targetAmount = targetAmount;
    savingsGoal.currentAmount = currentAmount;
    savingsGoal.goalName = goalName;
    savingsGoal.targetDate = targetDate;

    await savingsGoal.save();
    res.json(savingsGoal);
  } catch (error) {
    console.error('Error updating savings goal:', error); // Log the error details
    res.status(500).json({ message: 'Error updating savings goal' });
  }
};

// Delete a savings goal
exports.deleteSavingsGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const savingsGoal = await SavingsGoal.findByPk(id);
    if (!savingsGoal) return res.status(404).json({ message: 'Savings goal not found' });

    await savingsGoal.destroy();
    res.status(200).json({ message: 'Savings goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting savings goal:', error); // Log the error details
    res.status(500).json({ message: 'Error deleting savings goal' });
  }
};
