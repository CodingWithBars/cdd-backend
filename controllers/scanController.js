const Scan = require('../models/Scan');

exports.submitScan = async (req, res) => {
  try {
    const {
      scan_id,          // ✅ Include scan_id
      userID,
      image_url,
      result,
      confidence,
      severity,
      location_name,
      scanned_at,
      probabilities,
    } = req.body;

    const scan = await Scan.create({
      scan_id,          // ✅ Store scan_id
      userID,
      image_url,
      result,
      confidence,
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
