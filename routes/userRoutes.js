const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Adjust path if needed

// Middleware to verify token (if you have JWT auth)
const authMiddleware = require('../middleware/authMiddleware'); // optional

// GET user info by ID
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
