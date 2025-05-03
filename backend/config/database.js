require('dotenv').config();  // Ensure environment variables are loaded
const { Sequelize } = require('sequelize');

// Check if all necessary environment variables are set
if (!process.env.MYSQL_DB || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_HOST || !process.env.MYSQL_PORT) {
  console.error('❌ Missing environment variables for MySQL connection!');
  process.exit(1);  // Exit the app if any environment variable is missing
}

// Create Sequelize instance with proper environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DB,         // database name
  process.env.MYSQL_USER,       // username
  process.env.MYSQL_PASSWORD,   // password
  {
    host: process.env.MYSQL_HOST,    // MySQL host (usually 127.0.0.1 or localhost)
    port: parseInt(process.env.MYSQL_PORT || '3306'), // Default MySQL port 3306, fallback to 3306
    dialect: 'mysql',               // MySQL dialect for Sequelize
    logging: false,                 // Set to true for query logging (for debugging)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected!');
  })
  .catch((error) => {
    console.error('❌ MySQL connection error:', error);
  });

module.exports = sequelize;
