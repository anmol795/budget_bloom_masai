const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');  // Sequelize setup
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const savingsGoalRoutes = require('./routes/savingsGoalRoutes'); // Adjust the path as necessary

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
// Use the savings goal routes
app.use('/api/savings-goals', savingsGoalRoutes)
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
