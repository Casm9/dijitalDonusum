const express = require('express');
const router = express.Router();
const evaluateController = require('../controllers/evaluateController');

router.post('/evaluate', evaluateController.evaluateResults);

module.exports = router;