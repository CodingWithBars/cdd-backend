const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  image_url: { type: String }, // new field for image
  result: {
    type: String,
    enum: ['Salmo', 'Newcastle', 'Cocci', 'Healthy', 'NonFecal'],
    required: true,
  },
  confidence: {
    type: Number,
    required: true,    // or false if you want optional
    min: 0,
    max: 1,
  },
  scanned_at: { type: Date, default: Date.now }, // renamed from createdAt
  location_name: { type: String, required: true }, // new field for location string
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
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional for public scans
});

module.exports = mongoose.model('Scan', scanSchema);
