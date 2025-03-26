const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
