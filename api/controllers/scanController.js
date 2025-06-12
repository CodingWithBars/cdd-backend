const Scan = require('../models/Scan');
const { v4: uuidv4 } = require('uuid');

exports.submitScan = async (req, res) => {
  try {
    const userID = req.user.id;
    const { name, geoLocation, prediction, confidence } = req.body;

    const scan = await Scan.create({
      scanID: uuidv4(),
      userID,
      name,
      geoLocation,
      prediction,
      confidence,
    });

    res.status(201).json({ message: 'Scan recorded', scan });
  } catch (err) {
    res.status(500).json({ error: 'Scan submission failed', details: err.message });
  }
};
