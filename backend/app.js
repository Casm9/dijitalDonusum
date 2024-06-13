const express = require('express');
const sequelize = require('./database/config');
const { Question, Option } = require('./database/models');

const app = express();


sequelize.sync({ force: true }).then(async () => {
  const questionsData = [
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
  ];

  for (const questionData of questionsData) {
    const { options, ...questionDetails } = questionData;
    const question = await Question.create(questionDetails);
    await Option.bulkCreate(
      options.map(option_text => ({ option_text, question_id: question.id }))
    );
  }

  console.log('Database seeded!');

});

app.get('/api/questions', async (req, res) => {
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
});

app.listen(3001, () => console.log('Server listening on port 3001'));
