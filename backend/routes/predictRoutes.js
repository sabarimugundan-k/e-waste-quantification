const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');

router.post('/predict', predictController.predictEwaste);
router.get('/predictions', predictController.getPredictions);

module.exports = router;
