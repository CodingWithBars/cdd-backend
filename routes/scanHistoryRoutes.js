const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');

// PUBLIC: Get all scan history (no auth required)
router.get('/', async (req, res) => {
  try {
    const history = await Scan.find()
      .populate('userID', 'name email geoLocation') // optionally include user info
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching scan history:', error);
    res.status(500).json({ error: 'Failed to fetch scan history' });
  }
});

module.exports = router;
