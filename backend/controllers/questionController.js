const Question = require('../database/models/Question');
const Option = require('../database/models/Option');
const Response = require('../database/models/Response');

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
  const { id, selected, email } = req.body;

  try {
    const question = await Question.findOne({
        where: { id },
        include: {
            model: Response,
            as: 'responses',
            where: { email },
            required: false
        }
    });

    let response = question.responses.length ? question.responses[0] : null;

    if (!response) {
        response = await Response.create({
            email,
            selected,
            QuestionId: id
        });

    } else {
        response.selected = selected;
        await response.save();
    }

    res.json({ message: 'Question updated successfully' });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
};
