const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');

// GET: All scan history (optionally filtered by userID)
router.get('/', async (req, res) => {
  try {
    const { userID } = req.query; // Optional: ?userID=xxxx

    const filter = userID ? { userID } : {};

    const history = await Scan.find(filter)
      .populate('userID', 'name email geoLocation') // populate user info
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching scan history:', error);
    res.status(500).json({ error: 'Failed to fetch scan history' });
  }
});

// POST: Add a new scan record
router.post('/', async (req, res) => {
  try {
    const { scanID, userID, name, geoLocation, prediction, confidence } = req.body;

    const newScan = new Scan({
      scanID,
      userID,
      name,
      geoLocation,
      prediction,
      confidence,
    });

    await newScan.save();

    res.status(201).json({ message: 'Scan saved successfully', scan: newScan });
  } catch (error) {
    console.error('Error saving scan:', error);
    res.status(400).json({ error: 'Failed to save scan history' });
  }
});

module.exports = router;
