// controllers/scanController.js
const Scan = require('../models/Scan');

exports.submitScan = async (req, res) => {
  try {
    const {
      userID,
      image_url,
      result,
      severity,
      location_name,
      scanned_at,
      probabilities,
    } = req.body;

    const scan = await Scan.create({
      userID,
      image_url,
      result,
      severity,
      location_name,
      scanned_at,
      probabilities,
    });

    res.status(201).json({ message: 'Scan saved', scan });
  } catch (err) {
    res.status(500).json({ error: 'Scan submission failed', details: err.message });
  }
};
