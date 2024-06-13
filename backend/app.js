const express = require('express');
const sequelize = require('./database/config');
const Question = require('./database/models/Question');

const app = express();


sequelize.sync({ force: true }).then(async () => {
  await Question.bulkCreate([
    {
      question: 'İşletmenizin çalışan sayısı hangi aralıktadır?',
      answer: 0,
      options: ['0-50', '51-200', '201+'],
    },
    {
      question: 'Hangi sektörde faaliyet gösteriyorsunuz?',
      answer: 2,
      options: ['Üretim', 'Perakende', 'Hizmet', 'Diğer'],
    },
    {
      question: 'Dijital Dönüşüm sürecinizde en çok karşılaştığınız ihtiyaç hangisidir?',
      answer: 1,
      options: ['Danışman', 'Eğitim', 'Finansman'],
    },
  ]);
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.findAll();
    const formattedQuestions = questions.map(question => ({
        ...question.toJSON(),
        options: question.options.split(',')
      }));
    res.header("Access-Control-Allow-Origin", "*");
    res.json(formattedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => console.log('Server listening on port 3001'));