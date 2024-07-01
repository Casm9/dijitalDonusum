const Result = require('../database/models/Result');

exports.getResult = async (req, res) => {
  try {
    const result = await Result.findOne();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
    
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};