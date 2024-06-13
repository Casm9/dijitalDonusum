const Question = require('./Question');
const Option = require('./Option');

Question.hasMany(Option, { as: 'options', foreignKey: 'question_id' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = { Question, Option };