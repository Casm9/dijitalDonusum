const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/questions', questionController.getAllQuestions);
router.put('/questions/:questionId', questionController.updateQuestion);

module.exports = router;