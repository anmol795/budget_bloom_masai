const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser  = await User.findOne({ where: { email } });
    if (existingUser ) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ message: 'User  not found' });
    }

    // Compare the hashed password with the plain text password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('✅ Login successful:', email);

    res.json({ token, email: user.email, id: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};