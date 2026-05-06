const mongoose = require('mongoose');

const donationMatchSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  donorPhone: { type: String, required: true },
  donorEmail: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  matchedOrg: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    type: { type: String, required: true },
  },
  status: { type: String, default: 'matched' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DonationMatch', donationMatchSchema);