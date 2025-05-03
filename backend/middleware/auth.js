const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const errorMessage = 'No token provided or invalid format';
    console.error(errorMessage);  // Log the error message
    return res.status(401).json({ message: errorMessage });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      const errorMessage = 'User not found';
      console.error(errorMessage);  // Log the error message
      return res.status(401).json({ message: errorMessage });
    }

    req.user = user;
    next();
  } catch (error) {
    // Log the error details (JWT verification or any other issues)
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
