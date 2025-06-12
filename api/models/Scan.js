const mongoose = require('mongoose');

const geoSchema = {
  municipality: { type: String, required: true },
  barangay: { type: String, required: true },
  street: { type: String, required: true },
};

const scanSchema = new mongoose.Schema({
  scanID: { type: String, required: true, unique: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  geoLocation: geoSchema,
  prediction: { type: String, required: true },
  confidence: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scan', scanSchema);
