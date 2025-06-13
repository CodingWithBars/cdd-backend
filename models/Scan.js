const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  scan_id: {
    type: String,
    required: true,
    unique: true,
  },
  image_url: { type: String },
  result: {
    type: String,
    enum: ['Salmo', 'Newcastle', 'Cocci', 'Healthy', 'NonFecal'],
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  scanned_at: { type: Date, default: Date.now },
  location_name: { type: String, required: true },
  severity: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true,
  },
  probabilities: {
    type: Map,
    of: Number,
    default: {},
  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

module.exports = mongoose.model('Scan', scanSchema);
