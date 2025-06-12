const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const geoSchema = new mongoose.Schema({
  municipality: { type: String, required: false }, // Optional, since you may or may not reverse geocode
  barangay: { type: String, required: false },
  street: { type: String, required: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  geoLocation: geoSchema,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
