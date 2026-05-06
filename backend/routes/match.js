const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/donation', matchController.matchDonation);
router.get('/seed', matchController.getSeedMatches);

module.exports = router;