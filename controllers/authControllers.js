const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, geoLocation } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use.' });

    const user = await User.create({ name, email, password, geoLocation });

    const token = createToken(user._id);
    res.status(201).json({
      user: {
        userID: user._id,
        name: user.name,
        email: user.email,
        geoLocation: user.geoLocation,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.json({
      user: {
        userID: user._id,
        name: user.name,
        email: user.email,
        geoLocation: user.geoLocation,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
