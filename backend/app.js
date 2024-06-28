const express = require('express');
const sequelize = require('./database/config');
const cors = require('cors');
const { Question, Option } = require('./database/models');
const Result = require('./database/models/Result');
const Form = require('./database/models/Form');
const evaluateResult = require('./services/evaluateResult');


const app = express();
app.use(cors());
app.use(express.json());


sequelize.sync({ force: true }).then(async () => {
  const questionsData = [
    {
      question: 'İşletmenizin çalışan sayısı hangi aralıktadır?',
      options: ['0-50', '51-200', '201+'],
    },
    {
      question: 'Hangi sektörde faaliyet gösteriyorsunuz?',
      options: ['Üretim', 'Perakende', 'Hizmet', 'Diğer'],
    },
    {
      question: 'Dijital Dönüşüm sürecinizde en çok karşılaştığınız ihtiyaç hangisidir?',
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

  await Result.bulkCreate([
    {
      title: 'İşini Dijitalde Büyüt',
      subtitle: 'Bulut Çözümü',
      content: 'Sanal Veri Merkezi\nGüvenlik Çözümü\n5651 Loglama\nFirewall (Güvenlik Duvarı Servisleri)\nDDOS',
    },
    {
      title: 'Yeni Dijital Dönüşüm Çözümü',
      subtitle: 'İş Akışı Yönetimi',
      content: 'Proje Yönetimi\nSüreç Otomasyonu\nE-doküman Yönetimi\nMobil Uygulama'
    },
    {
      title: 'Genel Çözüm',
      subtitle: 'Genel Çözüm Önerileri',
      content: 'Web Destek\nCanlı Destek\nMüşteri Hizmetleri'
    }
  ]);

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

app.get('/api/result', async (req, res) => {
  try {
    const result = await Result.findOne();

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);

  } catch (error) {

    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/submit-form', async (req, res) => {
  try {

    res.header("Access-Control-Allow-Origin", "*");
    const { name, surname, email, telno, company, numOfEmployees, companyActivityPeriod, companySector } = req.body;
    const formSubmission = await Form.create({ name, surname, email, telno, company, numOfEmployees, companyActivityPeriod, companySector });
    res.status(201).json({ success: true, formSubmission });

  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/questions/:questionId', async (req, res) => {

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

});


app.post('/api/evaluate', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const selectedOptions = req.body.selectedOptions;
    const result = await evaluateResult(selectedOptions);
    res.json(result);

  } catch (error) {
    console.error('Error evaluating result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => console.log('Server listening on port 3001'));
