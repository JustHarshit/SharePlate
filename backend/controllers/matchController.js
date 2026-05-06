const DonationMatch = require('../models/DonationMatch');

const lucknowSeed = [
  { name: 'Helping Hands NGO', address: 'Gomti Nagar, Lucknow', phoneNumber: '9001000001', type: 'ngo' },
  { name: 'Smile Givers Foundation', address: 'Aliganj, Lucknow', phoneNumber: '9001000002', type: 'ngo' },
  { name: 'Green Leaf Community Kitchen', address: 'Indira Nagar, Lucknow', phoneNumber: '9001000003', type: 'receiver' },
  { name: 'Sahara Care Center', address: 'Hazratganj, Lucknow', phoneNumber: '9001000004', type: 'ngo' },
];

const normalize = (s = '') => s.toLowerCase();

exports.matchDonation = async (req, res) => {
  try {
    const { name, phone, email, amount, description, place, location } = req.body;

    if (!name || !phone || !email || !amount || !description || !place || !location) {
      return res.status(400).json({ message: 'All fields including location are required' });
    }

    const placeText = normalize(place);
    let matchedOrg =
      lucknowSeed.find((item) => placeText.includes(normalize(item.address.split(',')[0])) || placeText.includes('lucknow')) ||
      lucknowSeed[0];

    const saved = await DonationMatch.create({
      donorName: name,
      donorPhone: phone,
      donorEmail: email,
      foodType: description,
      quantity: Number(amount),
      description,
      place,
      location,
      matchedOrg,
    });

    return res.status(200).json({
      message: 'Match found successfully',
      matchId: saved._id,
      matchedOrg,
      donation: saved,
    });
  } catch (err) {
    console.error('matchDonation error:', err);
    return res.status(500).json({ message: 'Server error while matching donation' });
  }
};

exports.getSeedMatches = (req, res) => {
  res.json({ data: lucknowSeed });
};