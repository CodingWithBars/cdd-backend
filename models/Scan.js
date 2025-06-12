const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  image_url: { type: String }, // new field for image
  result: {
    type: String,
    enum: ['Salmo', 'Newcastle', 'Cocci', 'Healthy', 'Unknown'],
    required: true,
  },
  scanned_at: { type: Date, default: Date.now }, // renamed from createdAt
  location_name: { type: String, required: true }, // new field for location string
  severity: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'None'],
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
