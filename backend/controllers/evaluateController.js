const evaluateResults = require('../services/evaluateResults');

exports.evaluateResults = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const selectedOptions = req.body.selectedOptions;
    const result = await evaluateResults(selectedOptions);
    res.json(result);
    
  } catch (error) {
    console.error('Error evaluating result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};