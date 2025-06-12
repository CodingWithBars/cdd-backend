const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const geoSchema = {
  municipality: { type: String, required: true },
  barangay: { type: String, required: true },
  street: { type: String, required: true },
};

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
