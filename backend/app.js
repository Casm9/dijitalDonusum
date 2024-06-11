const express = require('express');

const app = express();

const questions = [
    {
        question: 'İşletmenizin çalışan sayısı hangi aralıktadır?',
        answer: true,
        options: [
            '0-50',
            '51-200',
            '201+'
        ],
        selected: null
    },
    {
        question: 'Hangi sektörde faaliyet gösteriyorsunuz?',
        answer: true,
        options: [
            'Üretim',
            'Perakende',
            'Hizmet',
            'Diğer'
        ],
        selected: null
    },
    {
        question: 'Dijital Dönüşüm sürecinizde en çok karşılaştığınız ihtiyaç hangisidir?',
        answer: true,
        options: [
            'Danışman',
            'Eğitim',
            'Finansman'
        ],
        selected: null
    }
];

app.get('/api/questions', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(questions);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
