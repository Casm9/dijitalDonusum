const Question = require('../database/models/Question');
const Option = require('../database/models/Option');
const Result = require('../database/models/Result');

const seedDatabase = async () => {
  try {
    const questionsCount = await Question.count();
    if (questionsCount === 0) {
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
          description: 'Dijital süreçlerinizi ve dönüşümünüzü birlikte planlamak,\nuygulamak ve daha da geliştirmek için hazırız! Detaylı\nbilgi almak, dijital dönüşüm hakkında merak ettikleriniz\niçin bizimle temasa geçin!',
          content: 'Sanal Veri Merkezi\nGüvenlik Çözümü\n5651 Loglama\nFirewall (Güvenlik Duvarı Servisleri)\nDDOS',
        },
        {
          title: 'Yeni Dijital Dönüşüm Çözümü',
          subtitle: 'İş Akışı Yönetimi',
          description: 'Dijital süreçlerinizi ve dönüşümünüzü birlikte planlamak,\nuygulamak ve daha da geliştirmek için hazırız! Detaylı\nbilgi almak, dijital dönüşüm hakkında merak ettikleriniz\niçin bizimle temasa geçin!',
          content: 'Proje Yönetimi\nSüreç Otomasyonu\nE-doküman Yönetimi\nMobil Uygulama'
        },
        {
          title: 'Genel Çözüm',
          subtitle: 'Genel Çözüm Önerileri Alt Başlık',
          description: 'Dijital süreçlerinizi ve dönüşümünüzü birlikte planlamak,\nuygulamak ve daha da geliştirmek için hazırız! Detaylı\nbilgi almak, dijital dönüşüm hakkında merak ettikleriniz\niçin bizimle temasa geçin!',
          content: 'Web Destek\nCanlı Destek\nMüşteri Hizmetleri'
        }
      ]);
  
      console.log('Database seeded!');
    }

  } catch (error) {
    console.error('Error seeding database: ', error);
  }

};

module.exports = seedDatabase;
