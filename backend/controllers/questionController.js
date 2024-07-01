const Question = require('../database/models/Question');
const Option = require('../database/models/Option');

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{
        model: Option,
        as: 'options'
      }]
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.json(questions);

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const questionId = parseInt(req.params.questionId);
    const { selected } = req.body;
    const updatedQuestion = await Question.update(
      { selected },
      { where: { id: questionId } }
    );

    if (updatedQuestion[0] === 1) {
      res.status(200).json({ message: 'Selected value updated successfully' });
    } else {
      res.status(400).json({ error: 'Failed to update selected value' });
    }

  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
