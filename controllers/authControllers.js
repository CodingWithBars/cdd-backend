const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, geoLocation } = req.body;

    // Check if email is already in use
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use.' });

    // Create user (ensure password is hashed in your User model pre-save hook)
    const user = await User.create({ name, email, password, geoLocation });

    // Create JWT token
    const token = createToken(user._id);

    // Return user info (exclude password)
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

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = createToken(user._id);

    // Return user info (exclude password)
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

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, geoLocation, password } = req.body;

    // Optional: Check if the user is updating email and if that email is already taken by another user
    if (email) {
      const emailUsed = await User.findOne({ email, _id: { $ne: userId } });
      if (emailUsed) {
        return res.status(400).json({ message: 'Email already in use by another account.' });
      }
    }

    // Prepare update fields (only update provided fields)
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (geoLocation) updateFields.geoLocation = geoLocation;

    // If password provided, hash it before updating (assuming User model has method to hash password on save)
    if (password) {
      updateFields.password = password; // hashed in pre-save hook
    }

    // Find user and update
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, updateFields);
    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        userID: user._id,
        name: user.name,
        email: user.email,
        geoLocation: user.geoLocation,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
};
